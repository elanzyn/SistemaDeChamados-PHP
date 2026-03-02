import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

// Página de gerenciamento de categorias (apenas ADMIN)
export default function Index({ categories }) {
    const { auth } = usePage().props;
    const [editingId, setEditingId] = useState(null);

    // Formulário para criar nova categoria
    const { data: createData, setData: setCreateData, post, processing: creating, errors: createErrors, reset } = useForm({
        name: '',
        description: '',
    });

    // Formulário para editar categoria existente
    const { data: editData, setData: setEditData, put, processing: updating, errors: editErrors } = useForm({
        name: '',
        description: '',
    });

    // Formulário para excluir categoria
    const { delete: destroy, processing: deleting } = useForm();

    // Criar nova categoria
    const handleCreate = (e) => {
        e.preventDefault();
        post(route('categories.store'), {
            onSuccess: () => {
                reset();
            }
        });
    };

    // Inicia edição de uma categoria
    const startEdit = (category) => {
        setEditingId(category.id);
        setEditData({
            name: category.name,
            description: category.description || '',
        });
    };

    // Cancela edição
    const cancelEdit = () => {
        setEditingId(null);
        setEditData({ name: '', description: '' });
    };

    // Salva alterações da categoria
    const handleUpdate = (e, id) => {
        e.preventDefault();
        put(route('categories.update', id), {
            onSuccess: () => {
                setEditingId(null);
            }
        });
    };

    // Exclui uma categoria
    const handleDelete = (id, name) => {
        if (confirm(`Tem certeza que deseja excluir a categoria "${name}"?\n\nSó é possível excluir se não houver chamados associados.`)) {
            destroy(route('categories.destroy', id));
        }
    };

    // Verifica se é admin
    if (auth.user.role !== 'ADMIN') {
        return (
            <AuthenticatedLayout>
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-red-800 dark:text-red-400 mb-2">
                                🚫 Acesso Negado
                            </h3>
                            <p className="text-red-700 dark:text-red-300">
                                Apenas administradores podem gerenciar categorias.
                            </p>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Gerenciar Categorias
                </h2>
            }
        >
            <Head title="Gerenciar Categorias" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    {/* Formulário de Criação */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                ➕ Nova Categoria
                            </h3>
                            
                            <form onSubmit={handleCreate} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    
                                    {/* Nome */}
                                    <div>
                                        <InputLabel htmlFor="create_name" value="Nome *" />
                                        <TextInput
                                            id="create_name"
                                            type="text"
                                            value={createData.name}
                                            onChange={(e) => setCreateData('name', e.target.value)}
                                            className="mt-1 block w-full"
                                            placeholder="Ex: Hardware, Software, Rede"
                                        />
                                        <InputError message={createErrors.name} className="mt-2" />
                                    </div>

                                    {/* Descrição */}
                                    <div>
                                        <InputLabel htmlFor="create_description" value="Descrição (Opcional)" />
                                        <TextInput
                                            id="create_description"
                                            type="text"
                                            value={createData.description}
                                            onChange={(e) => setCreateData('description', e.target.value)}
                                            className="mt-1 block w-full"
                                            placeholder="Breve descrição da categoria"
                                        />
                                        <InputError message={createErrors.description} className="mt-2" />
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <PrimaryButton disabled={creating}>
                                        {creating ? 'Criando...' : 'Criar Categoria'}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Lista de Categorias */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                📋 Categorias Existentes ({categories.length})
                            </h3>

                            {categories.length === 0 ? (
                                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                    Nenhuma categoria cadastrada ainda.
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {categories.map((category) => (
                                        <div
                                            key={category.id}
                                            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                                        >
                                            {editingId === category.id ? (
                                                // Modo de Edição
                                                <form onSubmit={(e) => handleUpdate(e, category.id)} className="space-y-3">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                        <div>
                                                            <InputLabel htmlFor={`edit_name_${category.id}`} value="Nome *" />
                                                            <TextInput
                                                                id={`edit_name_${category.id}`}
                                                                type="text"
                                                                value={editData.name}
                                                                onChange={(e) => setEditData('name', e.target.value)}
                                                                className="mt-1 block w-full"
                                                            />
                                                            <InputError message={editErrors.name} className="mt-2" />
                                                        </div>

                                                        <div>
                                                            <InputLabel htmlFor={`edit_description_${category.id}`} value="Descrição" />
                                                            <TextInput
                                                                id={`edit_description_${category.id}`}
                                                                type="text"
                                                                value={editData.description}
                                                                onChange={(e) => setEditData('description', e.target.value)}
                                                                className="mt-1 block w-full"
                                                            />
                                                            <InputError message={editErrors.description} className="mt-2" />
                                                        </div>
                                                    </div>

                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={cancelEdit}
                                                            disabled={updating}
                                                            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md text-sm font-semibold hover:bg-gray-400 dark:hover:bg-gray-500 disabled:opacity-50"
                                                        >
                                                            Cancelar
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            disabled={updating}
                                                            className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50"
                                                        >
                                                            {updating ? 'Salvando...' : 'Salvar'}
                                                        </button>
                                                    </div>
                                                </form>
                                            ) : (
                                                // Modo de Visualização
                                                <div className="flex items-center justify-between">
                                                    <div className="flex-1">
                                                        <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                                                            {category.name}
                                                        </h4>
                                                        {category.description && (
                                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                                {category.description}
                                                            </p>
                                                        )}
                                                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                                                            {category.tickets_count || 0} chamado(s) associado(s)
                                                        </p>
                                                    </div>

                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => startEdit(category)}
                                                            className="px-3 py-2 bg-gray-700 dark:bg-gray-600 text-white rounded-md text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-500"
                                                        >
                                                            ✏️ Editar
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(category.id, category.name)}
                                                            disabled={deleting}
                                                            className="px-3 py-2 bg-red-600 text-white rounded-md text-sm font-semibold hover:bg-red-700 disabled:opacity-50"
                                                        >
                                                            🗑️ Excluir
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Aviso sobre exclusão */}
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                        <h4 className="text-sm font-semibold text-yellow-800 dark:text-yellow-400 mb-2">
                            ⚠️ Atenção ao excluir categorias:
                        </h4>
                        <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                            <li>• Apenas categorias sem chamados associados podem ser excluídas</li>
                            <li>• Para excluir uma categoria em uso, primeiro reatribua seus chamados</li>
                            <li>• Nomes de categorias devem ser únicos</li>
                        </ul>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
