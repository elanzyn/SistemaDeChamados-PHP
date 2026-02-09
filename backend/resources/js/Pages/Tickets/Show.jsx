import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import StatusBadge from '@/Components/StatusBadge';
import PriorityBadge from '@/Components/PriorityBadge';
import CommentSection from '@/Components/CommentSection';

export default function Show({ ticket }) {
    const { auth } = usePage().props;
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        if (confirm('Tem certeza que deseja excluir este chamado?')) {
            destroy(route('tickets.destroy', ticket.id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Chamado #{ticket.id}
                    </h2>
                    <Link
                        href={route('dashboard')}
                        className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    >
                        ← Voltar
                    </Link>
                </div>
            }
        >
            <Head title={`Chamado #${ticket.id}`} />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    {/* Informações Principais */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                        {ticket.title}
                                    </h3>
                                    <div className="flex gap-2 mb-4">
                                        <StatusBadge status={ticket.status} />
                                        <PriorityBadge priority={ticket.priority} />
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Link
                                        href={route('tickets.edit', ticket.id)}
                                        className="inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white transition ease-in-out duration-150"
                                    >
                                        Editar
                                    </Link>
                                    <button
                                        onClick={handleDelete}
                                        disabled={processing}
                                        className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 transition ease-in-out duration-150"
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Categoria
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                                            {ticket.category?.name || 'Sem categoria'}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Criado por
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                                            {ticket.user?.name || 'Desconhecido'}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Técnico Responsável
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                                            {ticket.technician?.name || 'Não atribuído'}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Data de Criação
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                                            {new Date(ticket.created_at).toLocaleString('pt-BR')}
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>

                    {/* Descrição */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Descrição
                            </h4>
                            <div className="prose dark:prose-invert max-w-none">
                                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                    {ticket.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Comentários */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <CommentSection ticket={ticket} auth={auth} />
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
