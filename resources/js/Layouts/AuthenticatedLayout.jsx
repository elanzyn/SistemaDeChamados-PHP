import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Lista de itens do menu lateral
    const menuItems = [
        { name: 'Dashboard', icon: '🏠', route: 'dashboard' },
        { name: 'Abrir Chamado', icon: '📝', route: 'tickets.create' },
        { name: 'Meus Chamados', icon: '📋', route: 'tickets.index' },
        { name: 'Perfil', icon: '👤', route: 'profile.edit' },
        { name: 'Usuários', icon: '👥', route: 'users.index', admin: true },
        // { name: 'Relatórios', icon: '📊', route: 'reports.index', admin: true },
        { name: 'Sair', icon: '🚪', route: 'logout', logout: true },
    ];

    // Abre o sidebar quando o mouse entra
    const handleSidebarEnter = () => setSidebarOpen(true);
    // Fecha o sidebar quando o mouse sai
    const handleSidebarLeave = () => setSidebarOpen(false);

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-blue-950 to-black">
            {/* Sidebar moderno */}
            <aside
                className={`
                    group fixed z-20 left-0 top-0 h-full
                    ${sidebarOpen ? 'w-56' : 'w-20'}
                    bg-gradient-to-b from-slate-800 via-blue-900 to-slate-900
                    shadow-xl transition-all duration-300 ease-in-out
                    flex flex-col items-center py-6
                    border-r border-blue-900/40
                `}
                onMouseEnter={handleSidebarEnter}
                onMouseLeave={handleSidebarLeave}
            >
                {/* Logo do sistema */}
                <div className="mb-8 flex items-center justify-center w-full">
                    <Link href="/">
                        {/* Ícone de suporte como logo */}
                        <span className="text-3xl text-blue-400 drop-shadow-lg">🎧</span>
                        {sidebarOpen && (
                            <span className="ml-3 text-xl font-bold text-blue-100 tracking-wide transition-opacity duration-200">ChamadosDeTI</span>
                        )}
                    </Link>
                </div>
                {/* Itens do menu */}
                <nav className="flex-1 w-full">
                    <ul className="space-y-2">
                        {menuItems.map((item, idx) => {
                            if (item.admin && user.role !== 'ADMIN') return null;
                            if (item.logout) {
                                return (
                                    <li key={idx}>
                                        <li key={idx}>
    <Link
        href={route('logout')}
        method="post"
        as="button"
        className={`flex items-center w-full px-4 py-3 rounded-lg text-blue-200 hover:bg-blue-800/60 hover:text-white transition-colors duration-200 ${sidebarOpen ? 'justify-start' : 'justify-center'}`}
    >
            <span className="text-xl mr-0.5">{item.icon}</span>
        {sidebarOpen && <span className="ml-3">{item.name}</span>}
    </Link>
</li>
                                    </li>
                                );
                            }
                            return (
                                <li key={idx}>
                                    <Link
                                        href={route(item.route)}
                                        className={`
                                            flex items-center w-full px-4 py-3 rounded-lg
                                            text-blue-200 hover:bg-blue-800/60 hover:text-white
                                            transition-colors duration-200
                                            ${sidebarOpen ? 'justify-start' : 'justify-center'}
                                        `}
                                    >
                                        <span className="text-xl mr-0.5">{item.icon}</span>
                                        {sidebarOpen && <span className="ml-3">{item.name}</span>}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
                {/* Usuário logado */}
                <div className={`mt-auto w-full px-4 pb-4 ${sidebarOpen ? '' : 'flex justify-center'}`}>
                    <div className={`rounded-lg bg-slate-800/60 p-3 flex items-center gap-2 shadow ${sidebarOpen ? 'w-full' : ''}`}>
                        <span className="text-blue-300 text-lg">👤</span>
                        {sidebarOpen && (
                            <div>
                                <div className="text-blue-100 text-sm font-semibold">{user.name}</div>
                                <div className="text-blue-400 text-xs">{user.email}</div>
                                <div className="mt-1">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.role === 'ADMIN' ? 'bg-red-600 text-white' : user.role === 'TECH' ? 'bg-yellow-500 text-white' : 'bg-blue-700 text-blue-100'}`}>
                                        {user.role === 'ADMIN' ? 'Administrador' : user.role === 'TECH' ? 'Técnico' : 'Usuário'}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </aside>
            {/* Conteúdo principal */}
            <div className="flex-1 ml-20 transition-all duration-300" style={{ marginLeft: sidebarOpen ? 224 : 80 }}>
                {header && (
                    <header className="bg-slate-900/60 backdrop-blur-sm shadow-lg border-b border-blue-900/30 px-8 py-6">
                        {header}
                    </header>
                )}
                <main className="p-8">{children}</main>
            </div>
        </div>
    );
}

