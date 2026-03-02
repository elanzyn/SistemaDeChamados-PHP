import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';

// Gráfico de barras para mostrar tickets por prioridade
export default function PriorityBarChart({ metrics }) {
    // Prepara os dados para o gráfico
    const data = [
        { name: 'Baixa', value: metrics.by_priority.low, color: '#6B7280' },
        { name: 'Média', value: metrics.by_priority.medium, color: '#3B82F6' },
        { name: 'Alta', value: metrics.by_priority.high, color: '#F97316' },
        { name: 'Crítica', value: metrics.by_priority.critical, color: '#EF4444' },
    ];

    // Verifica se há dados
    const hasData = data.some(item => item.value > 0);

    if (!hasData) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500 dark:text-gray-400">
                    Nenhum dado disponível
                </p>
            </div>
        );
    }

    // Customiza o tooltip
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Prioridade: {payload[0].payload.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        {payload[0].value} tickets
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-600" />
                <XAxis 
                    dataKey="name" 
                    className="text-sm"
                    tick={{ fill: 'currentColor' }}
                />
                <YAxis 
                    className="text-sm"
                    tick={{ fill: 'currentColor' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}
