import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

// Página de gerenciamento de usuários (apenas ADMIN)
export default function Index({ users }) {
    const { auth } = usePage().props;
    const [editingId, setEditingId] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [changingPasswordId, setChangingPasswordId] = useState(null);

    // Formulário para criar novo usuário
    const { data: createData, setData: setCreateData, post, processing: creating, errors: createErrors, reset: resetCreate } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'USER',
        department: '',
    });

    // Formulário para editar usuário existente
    const { data: editData, setData: setEditData, put, processing: updating, errors: editErrors } = useForm({
        name: '',
        email: '',
        role: 'USER',
        department: '',
        active: true,
    });

    // Formulário para alterar senha
    const { data: passwordData, setData: setPasswordData, put: putPassword, processing: updatingPassword, errors: passwordErrors, reset: resetPassword } = useForm({
        password: '',
        password_confirmation: '',
    });

    // Formulário para excluir usuário
    const { delete: destroy, processing: deleting } = useForm();

    // Formulário para ativar/desativar usuário
    const { post: togglePost, processing: toggling } = useForm();

    // Criar novo usuário
    const handleCreate = (e) => {
        e.preventDefault();
        post(route('users.store'), {
            onSuccess: () => {
                resetCreate();
                setShowCreateForm(false);
            }
        });
    };

    // Inicia edição de um usuário
    const startEdit = (user) => {
        setEditingId(user.id);
        setEditData({
            name: user.name,
            email: user.email,
            role: user.role,
            department: user.department || '',
            active: user.active,
        });
    };

    // Cancela edição
    const cancelEdit = () => {
        setEditingId(null);
        setEditData({ name: '', email: '', role: 'USER', department: '', active: true });
    };

    // Salva alterações do usuário
    const handleUpdate = (e, id) => {
        e.preventDefault();
        put(route('users.update', id), {
            onSuccess: () => {
                setEditingId(null);
            }
        });
    };

    // Inicia alteração de senha
    const startPasswordChange = (userId) => {
        setChangingPasswordId(userId);
        resetPassword();
    };

    // Cancela alteração de senha
    const cancelPasswordChange = () => {
        setChangingPasswordId(null);
        resetPassword();
    };

    // Atualiza senha
    const handlePasswordUpdate = (e, userId) => {
        e.preventDefault();
        putPassword(route('users.password', userId), {
            onSuccess: () => {
                setChangingPasswordId(null);
                resetPassword();
            }
        });
    };

    // Exclui um usuário
    const handleDelete = (id, name) => {
        if (confirm(`Tem certeza que deseja excluir o usuário "${name}"?\n\nEsta ação não pode ser desfeita.`)) {
            destroy(route('users.destroy', id));
        }
    };

    // Ativa/desativa um usuário
    const handleToggleActive = (id, name, currentStatus) => {
        const action = currentStatus ? 'desativar' : 'ativar';
        if (confirm(`Tem certeza que deseja ${action} o usuário "${name}"?`)) {
            togglePost(route('users.toggle', id));
        }
    };

    // Badge de role
    const RoleBadge = ({ role }) => {
        const colors = {
            ADMIN: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
            TECH: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
            USER: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
        };
        
        const labels = {
            ADMIN: 'Administrador',
            TECH: 'Técnico',
            USER: 'Usuário',
        };

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[role]}`}>
                {labels[role]}
            </span>
        );
    };

    // Verifica se é admin
    if (auth.user.role !== 'ADMIN') {
        return (
            <AuthenticatedLayout>
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-red-800 dark:text-red-400 mb-2">
                                🚫 Acesso Negado
                            </h3>
                            <p className="text-red-700 dark:text-red-300">
                                Apenas administradores podem gerenciar usuários.
                            </p>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Gerenciar Usuários
                    </h2>
                    <button
                        onClick={() => setShowCreateForm(!showCreateForm)}
                        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                    >
                        {showCreateForm ? '✖ Cancelar' : '➕ Novo Usuário'}
                    </button>
                </div>
            }
        >
            <Head title="Gerenciar Usuários" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    {/* Formulário de Criação */}
                    {showCreateForm && (
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    ➕ Novo Usuário
                                </h3>
                                
                                <form onSubmit={handleCreate} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        
                                        {/* Nome */}
                                        <div>
                                            <InputLabel htmlFor="create_name" value="Nome Completo *" />
                                            <TextInput
                                                id="create_name"
                                                type="text"
                                                value={createData.name}
                                                onChange={(e) => setCreateData('name', e.target.value)}
                                                className="mt-1 block w-full"
                                                placeholder="João Silva"
                                            />
                                            <InputError message={createErrors.name} className="mt-2" />
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <InputLabel htmlFor="create_email" value="Email *" />
                                            <TextInput
                                                id="create_email"
                                                type="email"
                                                value={createData.email}
                                                onChange={(e) => setCreateData('email', e.target.value)}
                                                className="mt-1 block w-full"
                                                placeholder="joao@empresa.com"
                                            />
                                            <InputError message={createErrors.email} className="mt-2" />
                                        </div>

                                        {/* Senha */}
                                        <div>
                                            <InputLabel htmlFor="create_password" value="Senha *" />
                                            <TextInput
                                                id="create_password"
                                                type="password"
                                                value={createData.password}
                                                onChange={(e) => setCreateData('password', e.target.value)}
                                                className="mt-1 block w-full"
                                                placeholder="Mínimo 8 caracteres"
                                            />
                                            <InputError message={createErrors.password} className="mt-2" />
                                        </div>

                                        {/* Confirmar Senha */}
                                        <div>
                                            <InputLabel htmlFor="create_password_confirmation" value="Confirmar Senha *" />
                                            <TextInput
                                                id="create_password_confirmation"
                                                type="password"
                                                value={createData.password_confirmation}
                                                onChange={(e) => setCreateData('password_confirmation', e.target.value)}
                                                className="mt-1 block w-full"
                                                placeholder="Digite a senha novamente"
                                            />
                                            <InputError message={createErrors.password_confirmation} className="mt-2" />
                                        </div>

                                        {/* Perfil */}
                                        <div>
                                            <InputLabel htmlFor="create_role" value="Perfil *" />
                                            <select
                                                id="create_role"
                                                value={createData.role}
                                                onChange={(e) => setCreateData('role', e.target.value)}
                                                className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                            >
                                                <option value="USER">Usuário</option>
                                                <option value="TECH">Técnico</option>
                                                <option value="ADMIN">Administrador</option>
                                            </select>
                                            <InputError message={createErrors.role} className="mt-2" />
                                        </div>

                                        {/* Departamento */}
                                        <div>
                                            <InputLabel htmlFor="create_department" value="Departamento (Opcional)" />
                                            <TextInput
                                                id="create_department"
                                                type="text"
                                                value={createData.department}
                                                onChange={(e) => setCreateData('department', e.target.value)}
                                                className="mt-1 block w-full"
                                                placeholder="Ex: TI, Financeiro, RH"
                                            />
                                            <InputError message={createErrors.department} className="mt-2" />
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setShowCreateForm(false)}
                                            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md text-sm font-semibold hover:bg-gray-400 dark:hover:bg-gray-500"
                                        >
                                            Cancelar
                                        </button>
                                        <PrimaryButton disabled={creating}>
                                            {creating ? 'Criando...' : 'Criar Usuário'}
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Lista de Usuários */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                👥 Usuários Cadastrados ({users.length})
                            </h3>

                            <div className="space-y-3">
                                {users.map((user) => (
                                    <div
                                        key={user.id}
                                        className={`border rounded-lg p-4 ${
                                            user.active 
                                                ? 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700' 
                                                : 'border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/10'
                                        } transition`}
                                    >
                                        {editingId === user.id ? (
                                            // Modo de Edição
                                            <form onSubmit={(e) => handleUpdate(e, user.id)} className="space-y-3">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    <div>
                                                        <InputLabel htmlFor={`edit_name_${user.id}`} value="Nome *" />
                                                        <TextInput
                                                            id={`edit_name_${user.id}`}
                                                            type="text"
                                                            value={editData.name}
                                                            onChange={(e) => setEditData('name', e.target.value)}
                                                            className="mt-1 block w-full"
                                                        />
                                                        <InputError message={editErrors.name} className="mt-2" />
                                                    </div>

                                                    <div>
                                                        <InputLabel htmlFor={`edit_email_${user.id}`} value="Email *" />
                                                        <TextInput
                                                            id={`edit_email_${user.id}`}
                                                            type="email"
                                                            value={editData.email}
                                                            onChange={(e) => setEditData('email', e.target.value)}
                                                            className="mt-1 block w-full"
                                                        />
                                                        <InputError message={editErrors.email} className="mt-2" />
                                                    </div>

                                                    <div>
                                                        <InputLabel htmlFor={`edit_role_${user.id}`} value="Perfil *" />
                                                        <select
                                                            id={`edit_role_${user.id}`}
                                                            value={editData.role}
                                                            onChange={(e) => setEditData('role', e.target.value)}
                                                            className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                                        >
                                                            <option value="USER">Usuário</option>
                                                            <option value="TECH">Técnico</option>
                                                            <option value="ADMIN">Administrador</option>
                                                        </select>
                                                        <InputError message={editErrors.role} className="mt-2" />
                                                    </div>

                                                    <div>
                                                        <InputLabel htmlFor={`edit_department_${user.id}`} value="Departamento" />
                                                        <TextInput
                                                            id={`edit_department_${user.id}`}
                                                            type="text"
                                                            value={editData.department}
                                                            onChange={(e) => setEditData('department', e.target.value)}
                                                            className="mt-1 block w-full"
                                                        />
                                                        <InputError message={editErrors.department} className="mt-2" />
                                                    </div>
                                                </div>

                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={cancelEdit}
                                                        disabled={updating}
                                                        className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md text-sm font-semibold hover:bg-gray-400 dark:hover:bg-gray-500 disabled:opacity-50"
                                                    >
                                                        Cancelar
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        disabled={updating}
                                                        className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50"
                                                    >
                                                        {updating ? 'Salvando...' : 'Salvar'}
                                                    </button>
                                                </div>
                                            </form>
                                        ) : changingPasswordId === user.id ? (
                                            // Modo de Alteração de Senha
                                            <form onSubmit={(e) => handlePasswordUpdate(e, user.id)} className="space-y-3">
                                                <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                                                    🔑 Alterar Senha de {user.name}
                                                </h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    <div>
                                                        <InputLabel htmlFor={`password_${user.id}`} value="Nova Senha *" />
                                                        <TextInput
                                                            id={`password_${user.id}`}
                                                            type="password"
                                                            value={passwordData.password}
                                                            onChange={(e) => setPasswordData('password', e.target.value)}
                                                            className="mt-1 block w-full"
                                                            placeholder="Mínimo 8 caracteres"
                                                        />
                                                        <InputError message={passwordErrors.password} className="mt-2" />
                                                    </div>

                                                    <div>
                                                        <InputLabel htmlFor={`password_confirmation_${user.id}`} value="Confirmar Senha *" />
                                                        <TextInput
                                                            id={`password_confirmation_${user.id}`}
                                                            type="password"
                                                            value={passwordData.password_confirmation}
                                                            onChange={(e) => setPasswordData('password_confirmation', e.target.value)}
                                                            className="mt-1 block w-full"
                                                            placeholder="Digite a senha novamente"
                                                        />
                                                        <InputError message={passwordErrors.password_confirmation} className="mt-2" />
                                                    </div>
                                                </div>

                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={cancelPasswordChange}
                                                        disabled={updatingPassword}
                                                        className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md text-sm font-semibold hover:bg-gray-400 dark:hover:bg-gray-500 disabled:opacity-50"
                                                    >
                                                        Cancelar
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        disabled={updatingPassword}
                                                        className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50"
                                                    >
                                                        {updatingPassword ? 'Salvando...' : 'Alterar Senha'}
                                                    </button>
                                                </div>
                                            </form>
                                        ) : (
                                            // Modo de Visualização
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                                                            {user.name}
                                                        </h4>
                                                        <RoleBadge role={user.role} />
                                                        {!user.active && (
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                                                                Inativo
                                                            </span>
                                                        )}
                                                        {user.id === auth.user.id && (
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                                                Você
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        📧 {user.email}
                                                    </p>
                                                    {user.department && (
                                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                            🏢 {user.department}
                                                        </p>
                                                    )}
                                                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                                                        {user.tickets_count || 0} chamado(s) criado(s) • {user.assigned_tickets_count || 0} atribuído(s)
                                                    </p>
                                                </div>

                                                <div className="flex gap-2 flex-wrap justify-end">
                                                    <button
                                                        onClick={() => startEdit(user)}
                                                        className="px-3 py-2 bg-gray-700 dark:bg-gray-600 text-white rounded-md text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-500"
                                                    >
                                                        ✏️ Editar
                                                    </button>
                                                    <button
                                                        onClick={() => startPasswordChange(user.id)}
                                                        className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700"
                                                    >
                                                        🔑 Senha
                                                    </button>
                                                    {user.id !== auth.user.id && (
                                                        <>
                                                            <button
                                                                onClick={() => handleToggleActive(user.id, user.name, user.active)}
                                                                disabled={toggling}
                                                                className={`px-3 py-2 rounded-md text-sm font-semibold ${
                                                                    user.active 
                                                                        ? 'bg-yellow-600 text-white hover:bg-yellow-700' 
                                                                        : 'bg-green-600 text-white hover:bg-green-700'
                                                                } disabled:opacity-50`}
                                                            >
                                                                {user.active ? '🔒 Desativar' : '✅ Ativar'}
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(user.id, user.name)}
                                                                disabled={deleting}
                                                                className="px-3 py-2 bg-red-600 text-white rounded-md text-sm font-semibold hover:bg-red-700 disabled:opacity-50"
                                                            >
                                                                🗑️ Excluir
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Avisos */}
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                        <h4 className="text-sm font-semibold text-yellow-800 dark:text-yellow-400 mb-2">
                            ⚠️ Atenção ao gerenciar usuários:
                        </h4>
                        <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                            <li>• Você não pode excluir ou desativar sua própria conta</li>
                            <li>• Usuários com chamados criados ou atribuídos não podem ser excluídos</li>
                            <li>• Usuários inativos não conseguem fazer login no sistema</li>
                            <li>• A senha padrão deve ter no mínimo 8 caracteres</li>
                        </ul>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
