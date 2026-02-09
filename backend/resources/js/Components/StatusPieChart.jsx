import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// Gráfico de pizza para mostrar distribuição de tickets por status
export default function StatusPieChart({ metrics }) {
    // Prepara os dados para o gráfico
    const data = [
        { name: 'Abertos', value: metrics.open, color: '#3B82F6' },
        { name: 'Em Andamento', value: metrics.in_progress, color: '#EAB308' },
        { name: 'Fechados', value: metrics.closed, color: '#10B981' },
    ].filter(item => item.value > 0); // Remove itens com valor 0

    // Se não houver dados
    if (data.length === 0 || metrics.total === 0) {
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
                        {payload[0].name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        {payload[0].value} tickets ({((payload[0].value / metrics.total) * 100).toFixed(1)}%)
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
}
