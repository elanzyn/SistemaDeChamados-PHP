import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${
                active
                    ? 'border-blue-400 bg-blue-900/30 text-blue-300 focus:border-blue-600 focus:bg-blue-900/40 focus:text-blue-200'
                    : 'border-transparent text-blue-200 hover:border-blue-500 hover:bg-slate-800/50 hover:text-blue-100 focus:border-blue-500 focus:bg-slate-800/50 focus:text-blue-100'
            } text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}
