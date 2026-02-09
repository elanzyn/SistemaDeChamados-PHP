import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import DangerButton from './DangerButton';

// Componente para exibir e gerenciar comentários de um ticket
export default function CommentSection({ ticket, auth }) {
    const [editingComment, setEditingComment] = useState(null);
    const [editText, setEditText] = useState('');

    // Form para criar novo comentário
    const { data, setData, post, processing, reset, errors } = useForm({
        text: '',
    });

    // Form para editar comentário
    const { data: editData, setData: setEditData, put, processing: editProcessing } = useForm({
        text: '',
    });

    // Form para deletar comentário
    const { delete: destroy, processing: deleteProcessing } = useForm();

    // Envia novo comentário
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('comments.store', ticket.id), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    // Inicia edição de comentário
    const startEdit = (comment) => {
        setEditingComment(comment.id);
        setEditText(comment.text);
        setEditData('text', comment.text);
    };

    // Cancela edição
    const cancelEdit = () => {
        setEditingComment(null);
        setEditText('');
    };

    // Salva edição
    const saveEdit = (commentId) => {
        put(route('comments.update', commentId), {
            preserveScroll: true,
            onSuccess: () => {
                setEditingComment(null);
                setEditText('');
            },
        });
    };

    // Deleta comentário
    const handleDelete = (commentId) => {
        if (confirm('Tem certeza que deseja excluir este comentário?')) {
            destroy(route('comments.destroy', commentId), {
                preserveScroll: true,
            });
        }
    };

    return (
        <div className="space-y-6">
            {/* Formulário para novo comentário */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Adicionar Comentário
                    </label>
                    <textarea
                        id="comment"
                        rows="4"
                        value={data.text}
                        onChange={(e) => setData('text', e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                        placeholder="Escreva seu comentário aqui..."
                    />
                    {errors.text && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.text}</p>
                    )}
                </div>
                <div className="flex justify-end">
                    <PrimaryButton disabled={processing || !data.text.trim()}>
                        {processing ? 'Enviando...' : 'Comentar'}
                    </PrimaryButton>
                </div>
            </form>

            {/* Lista de comentários */}
            <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Comentários ({ticket.comments?.length || 0})
                </h4>

                {ticket.comments && ticket.comments.length > 0 ? (
                    <div className="space-y-4">
                        {ticket.comments.map((comment) => (
                            <div
                                key={comment.id}
                                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
                            >
                                {/* Header do comentário */}
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            {comment.user?.name || 'Usuário'}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            {new Date(comment.created_at).toLocaleString('pt-BR')}
                                            {comment.updated_at !== comment.created_at && ' (editado)'}
                                        </p>
                                    </div>

                                    {/* Botões de ação (só para o autor ou admin) */}
                                    {(auth.user.id === comment.user_id || auth.user.role === 'ADMIN') && (
                                        <div className="flex gap-2">
                                            {auth.user.id === comment.user_id && editingComment !== comment.id && (
                                                <button
                                                    onClick={() => startEdit(comment)}
                                                    className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                                >
                                                    Editar
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDelete(comment.id)}
                                                disabled={deleteProcessing}
                                                className="text-xs text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                                            >
                                                Excluir
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Conteúdo do comentário */}
                                {editingComment === comment.id ? (
                                    // Modo de edição
                                    <div className="space-y-2">
                                        <textarea
                                            rows="3"
                                            value={editData.text}
                                            onChange={(e) => setEditData('text', e.target.value)}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white sm:text-sm"
                                        />
                                        <div className="flex gap-2 justify-end">
                                            <SecondaryButton onClick={cancelEdit}>
                                                Cancelar
                                            </SecondaryButton>
                                            <PrimaryButton
                                                onClick={() => saveEdit(comment.id)}
                                                disabled={editProcessing || !editData.text.trim()}
                                            >
                                                Salvar
                                            </PrimaryButton>
                                        </div>
                                    </div>
                                ) : (
                                    // Modo de visualização
                                    <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                        {comment.text}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p className="text-gray-500 dark:text-gray-400">
                            Nenhum comentário ainda. Seja o primeiro a comentar!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
