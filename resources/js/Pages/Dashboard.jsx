import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import jsPDF from 'jspdf';
import StatCard from '@/Components/StatCard';
import StatusBadge from '@/Components/StatusBadge';
import PriorityBadge from '@/Components/PriorityBadge';
import StatusPieChart from '@/Components/StatusPieChart';
import PriorityBarChart from '@/Components/PriorityBarChart';
import CategoryBarChart from '@/Components/CategoryBarChart';

export default function Dashboard({ tickets, categories, metrics, userRole }) {
    // Diagnóstico: loga dados recebidos
    if (typeof window !== 'undefined') {
        console.log('DASHBOARD PROPS:', { tickets, categories, metrics, userRole });
    }

    // Corrige tickets para array se vier paginado
    const ticketList = Array.isArray(tickets) ? tickets : (tickets && tickets.data ? tickets.data : []);
    // Protege métricas
    const safeMetrics = metrics || { total: 0, open: 0, in_progress: 0, closed: 0, by_priority: { low: 0, medium: 0, high: 0, critical: 0 }, by_category: [], recent_activity: [] };

    // Função para gerar o PDF do relatório do dashboard
    const gerarRelatorioPDF = () => {
        // Cria uma nova instância do jsPDF
        const doc = new jsPDF();

        // Título do relatório
        doc.setFontSize(18);
        doc.text('Relatório do Dashboard', 14, 18);

        // Dados principais
        doc.setFontSize(12);
        doc.text('Total de Chamados: ' + safeMetrics.total, 14, 30);
        doc.text('Abertos: ' + safeMetrics.open, 14, 38);
        doc.text('Em Andamento: ' + safeMetrics.in_progress, 14, 46);
        doc.text('Fechados: ' + safeMetrics.closed, 14, 54);

        // Por prioridade
        doc.text('Por Prioridade:', 14, 66);
        doc.text('Baixa: ' + safeMetrics.by_priority.low, 20, 74);
        doc.text('Média: ' + safeMetrics.by_priority.medium, 20, 82);
        doc.text('Alta: ' + safeMetrics.by_priority.high, 20, 90);
        doc.text('Crítica: ' + safeMetrics.by_priority.critical, 20, 98);

        // Top 5 categorias
        doc.text('Top 5 Categorias:', 14, 110);
        (safeMetrics.by_category || []).slice(0, 5).forEach((cat, idx) => {
            doc.text(`${idx + 1}. ${cat.name}: ${cat.count}`, 20, 118 + idx * 8);
        });

        // Salva o PDF
        doc.save('relatorio-dashboard.pdf');
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Meus Chamados - Sistema de Chamados
                    </h2>
                    <div className="flex gap-2">
                        {/* Botão para baixar o relatório em PDF */}
                        <button
                            onClick={gerarRelatorioPDF}
                            className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                        >
                            Baixar Relatório (PDF)
                        </button>
                        <Link
                            href={route('tickets.create')}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                        >
                            + Novo Chamado
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Meus Chamados" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    {/* Cards de Estatísticas */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        <StatCard
                            title="Total de Chamados"
                            value={safeMetrics.total}
                            icon="📊"
                            color="blue"
                        />
                        <StatCard
                            title="Abertos"
                            value={safeMetrics.open}
                            icon="🔵"
                            color="blue"
                        />
                        <StatCard
                            title="Em Andamento"
                            value={safeMetrics.in_progress}
                            icon="⚡"
                            color="yellow"
                        />
                        <StatCard
                            title="Fechados"
                            value={safeMetrics.closed}
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
                <p className="text-3xl font-bold text-gray-700 dark:text-gray-300">
                    {safeMetrics.by_priority.low}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Baixa</p>
            </div>
            <div className="text-center">
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {safeMetrics.by_priority.medium}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Média</p>
            </div>
            <div className="text-center">
                <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                    {safeMetrics.by_priority.high}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Alta</p>
            </div>
            <div className="text-center">
                <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                    {safeMetrics.by_priority.critical}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Crítica</p>
            </div>
        </div>
        <PriorityBarChart metrics={safeMetrics} />
    </div>
</div>

{/* Gráficos em Grid */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {/* Chamados Recentes */}
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg mt-8">
        <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Chamados Recentes
            </h3>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {safeMetrics.recent_activity && safeMetrics.recent_activity.length > 0 ? (
                    safeMetrics.recent_activity.map((ticket) => (
                        <li key={ticket.id} className="py-3 flex items-center justify-between">
                            <div>
                                <span className="font-semibold text-gray-800 dark:text-gray-200">#{ticket.id}</span>
                                <span className="ml-2 text-gray-700 dark:text-gray-300">{ticket.title}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <StatusBadge status={ticket.status} />
                                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">{new Date(ticket.created_at).toLocaleString('pt-BR')}</span>
                                <Link href={route('tickets.show', ticket.id)} className="ml-4 text-blue-600 hover:underline dark:text-blue-400">Ver</Link>
                            </div>
                        </li>
                    ))
                ) : (
                    <li className="py-3 text-gray-500 dark:text-gray-400">Nenhum chamado recente.</li>
                )}
            </ul>
        </div>
    </div>
    {/* Gráfico de Status */}
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
        <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Distribuição por Status
            </h3>
            <StatusPieChart metrics={safeMetrics} />
        </div>
    </div>
    {/* Gráfico de Categorias */}
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
        <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Top 5 Categorias
            </h3>
            <CategoryBarChart categories={safeMetrics.by_category} />
        </div>
    </div>
</div>




                </div>
            </div>
        </AuthenticatedLayout>
    );
}