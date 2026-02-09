// Componente de card para exibir métricas
export default function StatCard({ title, value, icon, color = "blue" }) {
    const colorClasses = {
        blue: "bg-blue-500",
        green: "bg-green-500",
        yellow: "bg-yellow-500",
        red: "bg-red-500",
        purple: "bg-purple-500",
        gray: "bg-gray-500",
    };

    return (
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6">
                <div className="flex items-center">
                    <div className={`flex-shrink-0 rounded-md p-3 ${colorClasses[color]}`}>
                        <span className="text-white text-2xl">{icon}</span>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                        <dl>
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                {title}
                            </dt>
                            <dd className="flex items-baseline">
                                <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    {value}
                                </div>
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
}
