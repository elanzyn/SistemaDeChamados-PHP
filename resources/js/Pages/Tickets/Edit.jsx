import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

// Formulário para editar um chamado existente
export default function Edit({ ticket, categories }) {
    const { auth } = usePage().props;
    
    const { data, setData, put, processing, errors } = useForm({
        title: ticket.title || '',
        description: ticket.description || '',
        priority: ticket.priority || 'MEDIUM',
        status: ticket.status || 'OPEN',
        category_id: ticket.category_id || '',
        tech_id: ticket.tech_id || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('tickets.update', ticket.id));
    };

    // Verifica se o usuário pode editar status e técnico
    const canEditAdvanced = auth.user.role === 'ADMIN' || auth.user.role === 'TECH';

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Editar Chamado #{ticket.id}
                    </h2>
                    <Link
                        href={route('tickets.show', ticket.id)}
                        className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    >
                        ← Voltar
                    </Link>
                </div>
            }
        >
            <Head title={`Editar Chamado #${ticket.id}`} />

            <div className="py-6">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                
                                {/* Título */}
                                <div>
                                    <InputLabel htmlFor="title" value="Título" />
                                    <TextInput
                                        id="title"
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="mt-1 block w-full"
                                        autoFocus
                                    />
                                    <InputError message={errors.title} className="mt-2" />
                                </div>

                                {/* Descrição */}
                                <div>
                                    <InputLabel htmlFor="description" value="Descrição" />
                                    <textarea
                                        id="description"
                                        rows="6"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                    />
                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                {/* Prioridade e Categoria */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    
                                    {/* Prioridade */}
                                    <div>
                                        <InputLabel htmlFor="priority" value="Prioridade" />
                                        <select
                                            id="priority"
                                            value={data.priority}
                                            onChange={(e) => setData('priority', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                        >
                                            <option value="LOW">Baixa</option>
                                            <option value="MEDIUM">Média</option>
                                            <option value="HIGH">Alta</option>
                                            <option value="CRITICAL">Crítica</option>
                                        </select>
                                        <InputError message={errors.priority} className="mt-2" />
                                    </div>

                                    {/* Categoria */}
                                    <div>
                                        <InputLabel htmlFor="category_id" value="Categoria" />
                                        <select
                                            id="category_id"
                                            value={data.category_id}
                                            onChange={(e) => setData('category_id', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                        >
                                            <option value="">Selecione uma categoria</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError message={errors.category_id} className="mt-2" />
                                    </div>
                                </div>

                                {/* Status (só para ADMIN e TECH) */}
                                {canEditAdvanced && (
                                    <div>
                                        <InputLabel htmlFor="status" value="Status" />
                                        <select
                                            id="status"
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                        >
                                            <option value="OPEN">Aberto</option>
                                            <option value="PROGRESS">Em Andamento</option>
                                            <option value="CLOSED">Fechado</option>
                                        </select>
                                        <InputError message={errors.status} className="mt-2" />
                                    </div>
                                )}

                                {/* Informações do Ticket */}
                                <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-4">
                                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        ℹ️ Informações do Chamado:
                                    </h4>
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div>
                                            <span className="text-gray-500 dark:text-gray-400">Criado por:</span>
                                            <p className="text-gray-900 dark:text-white font-medium">
                                                {ticket.user?.name || 'Desconhecido'}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-gray-500 dark:text-gray-400">Data de criação:</span>
                                            <p className="text-gray-900 dark:text-white font-medium">
                                                {new Date(ticket.created_at).toLocaleDateString('pt-BR')}
                                            </p>
                                        </div>
                                        {ticket.technician && (
                                            <div className="col-span-2">
                                                <span className="text-gray-500 dark:text-gray-400">Técnico responsável:</span>
                                                <p className="text-gray-900 dark:text-white font-medium">
                                                    {ticket.technician.name}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Botões */}
                                <div className="flex justify-end gap-3">
                                    <Link
                                        href={route('tickets.show', ticket.id)}
                                        className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-500 rounded-md font-semibold text-xs text-gray-700 dark:text-gray-300 uppercase tracking-widest shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-25 transition ease-in-out duration-150"
                                    >
                                        Cancelar
                                    </Link>
                                    <PrimaryButton disabled={processing}>
                                        {processing ? 'Salvando...' : 'Salvar Alterações'}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
