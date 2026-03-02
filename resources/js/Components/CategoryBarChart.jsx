import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Gráfico de barras horizontais para categorias
export default function CategoryBarChart({ categories }) {
    // Se não houver categorias
    if (!categories || categories.length === 0) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500 dark:text-gray-400">
                    Nenhuma categoria disponível
                </p>
            </div>
        );
    }

    // Prepara dados e ordena por quantidade
    const data = categories
        .map(cat => ({
            name: cat.name,
            value: cat.count
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5); // Mostra apenas top 5

    // Cores para as barras
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

    // Customiza o tooltip
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {payload[0].payload.name}
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
            <BarChart data={data} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-600" />
                <XAxis 
                    type="number" 
                    className="text-sm"
                    tick={{ fill: 'currentColor' }}
                />
                <YAxis 
                    type="category" 
                    dataKey="name" 
                    width={120}
                    className="text-sm"
                    tick={{ fill: 'currentColor' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}
