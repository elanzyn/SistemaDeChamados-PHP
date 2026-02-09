// Badge para mostrar prioridade dos chamados
export default function PriorityBadge({ priority }) {
    const priorityConfig = {
        LOW: {
            label: 'Baixa',
            color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
        },
        MEDIUM: {
            label: 'Média',
            color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
        },
        HIGH: {
            label: 'Alta',
            color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
        },
        CRITICAL: {
            label: 'Crítica',
            color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
        }
    };

    const config = priorityConfig[priority] || priorityConfig.MEDIUM;

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
            {config.label}
        </span>
    );
}
