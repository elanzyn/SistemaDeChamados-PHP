import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import StatCard from '@/Components/StatCard';
import StatusBadge from '@/Components/StatusBadge';
import PriorityBadge from '@/Components/PriorityBadge';

export default function Dashboard({ tickets, categories, metrics, userRole }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Dashboard - Sistema de Chamados
                    </h2>
                    <Link
                        href={route('tickets.create')}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                    >
                        + Novo Chamado
                    </Link>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    {/* Cards de Estatísticas */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        <StatCard
                            title="Total de Chamados"
                            value={metrics.total}
                            icon="📊"
                            color="blue"
                        />
                        <StatCard
                            title="Abertos"
                            value={metrics.open}
                            icon="🔵"
                            color="blue"
                        />
                        <StatCard
                            title="Em Andamento"
                            value={metrics.in_progress}
                            icon="⚡"
                            color="yellow"
                        />
                        <StatCard
                            title="Fechados"
                            value={metrics.closed}
                            icon="✅"
                            color="green"
                        />
                    </div>

                    {/* Estatísticas por Prioridade */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Chamados por Prioridade
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-gray-700 dark:text-gray-300">
                                        {metrics.by_priority.low}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Baixa</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                                        {metrics.by_priority.medium}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Média</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                                        {metrics.by_priority.high}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Alta</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                                        {metrics.by_priority.critical}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Crítica</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chamados por Categoria */}
                    {metrics.by_category && metrics.by_category.length > 0 && (
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Chamados por Categoria
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {metrics.by_category.map((category, index) => (
                                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                {category.name}
                                            </span>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                                {category.count}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tabela de Chamados Recentes */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Chamados Recentes
                                </h3>
                                <Link
                                    href={route('tickets.index')}
                                    className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                >
                                    Ver todos →
                                </Link>
                            </div>

                            {tickets.data && tickets.data.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead className="bg-gray-50 dark:bg-gray-700">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                    ID
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                    Título
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                    Categoria
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                    Prioridade
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                    Criado por
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                    Ações
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                            {tickets.data.map((ticket) => (
                                                <tr key={ticket.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                                        #{ticket.id}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                                                        <div className="max-w-xs truncate">{ticket.title}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                        {ticket.category?.name || 'Sem categoria'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <StatusBadge status={ticket.status} />
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <PriorityBadge priority={ticket.priority} />
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                        {ticket.user?.name || 'Desconhecido'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <Link
                                                            href={route('tickets.show', ticket.id)}
                                                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                                        >
                                                            Ver
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Nenhum chamado encontrado. Crie seu primeiro chamado!
                                    </p>
                                </div>
                            )}

                            {/* Paginação */}
                            {tickets.links && tickets.links.length > 3 && (
                                <div className="mt-4 flex justify-center">
                                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                        {tickets.links.map((link, index) => (
                                            <Link
                                                key={index}
                                                href={link.url || '#'}
                                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                    link.active
                                                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                                                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700'
                                                } ${!link.url ? 'cursor-not-allowed opacity-50' : ''}`}
                                                preserveScroll
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </nav>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}

