// Badge para mostrar status dos chamados
export default function StatusBadge({ status }) {
    const statusConfig = {
        OPEN: {
            label: 'Aberto',
            color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
        },
        PROGRESS: {
            label: 'Em Andamento',
            color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
        },
        CLOSED: {
            label: 'Fechado',
            color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
        }
    };

    const config = statusConfig[status] || statusConfig.OPEN;

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
            {config.label}
        </span>
    );
}
