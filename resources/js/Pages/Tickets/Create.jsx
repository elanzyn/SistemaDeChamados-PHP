import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

// Formulário para criar novo chamado
export default function Create({ categories }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        priority: 'MEDIUM',
        category_id: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('tickets.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Novo Chamado
                    </h2>
                    <Link
                        href={route('dashboard')}
                        className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    >
                        ← Voltar
                    </Link>
                </div>
            }
        >
            <Head title="Novo Chamado" />

            <div className="py-6">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                
                                {/* Título */}
                                <div>
                                    <InputLabel htmlFor="title" value="Título" className="text-white" />
                                    <TextInput
                                        id="title"
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="mt-1 block w-full"
                                        placeholder="Descreva brevemente o problema"
                                        autoFocus
                                    />
                                    <InputError message={errors.title} className="mt-2" />
                                </div>

                                {/* Descrição */}
                                <div>
                                    <InputLabel htmlFor="description" value="Descrição" className="text-white" />
                                    <textarea
                                        id="description"
                                        rows="6"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                        placeholder="Descreva o problema detalhadamente..."
                                    />
                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                {/* Prioridade e Categoria em Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    
                                    {/* Prioridade */}
                                    <div>
                                        <InputLabel htmlFor="priority" value="Prioridade" className="text-white" />
                                        <select
                                            id="priority"
                                            value={data.priority}
                                            onChange={(e) => setData('priority', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                        >
                                            <option value="LOW">Baixa</option>
                                            <option value="MEDIUM">Média</option>
                                            <option value="HIGH">Alta</option>
                                            <option value="CRITICAL">Crítica</option>
                                        </select>
                                        <InputError message={errors.priority} className="mt-2" />
                                    </div>

                                    {/* Categoria */}
                                    <div>
                                        <InputLabel htmlFor="category_id" value="Categoria" className="text-white" />
                                        <select
                                            id="category_id"
                                            value={data.category_id}
                                            onChange={(e) => setData('category_id', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                                        >
                                            <option value="">Selecione uma categoria</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError message={errors.category_id} className="mt-2" />
                                    </div>
                                </div>

                                {/* Informações de Ajuda */}
                                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-4">
                                    <h4 className="text-sm font-medium text-blue-800 dark:text-blue-400 mb-2">
                                        💡 Dicas para abrir um chamado:
                                    </h4>
                                    <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                                        <li>• Seja claro e objetivo no título</li>
                                        <li>• Descreva o problema com detalhes</li>
                                        <li>• Escolha a prioridade adequada</li>
                                        <li>• Selecione a categoria correta</li>
                                    </ul>
                                </div>

                                {/* Botões */}
                                <div className="flex justify-end gap-3">
                                    <Link
                                        href={route('dashboard')}
                                        className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-500 rounded-md font-semibold text-xs text-gray-700 dark:text-gray-300 uppercase tracking-widest shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-25 transition ease-in-out duration-150"
                                    >
                                        Cancelar
                                    </Link>
                                    <PrimaryButton disabled={processing}>
                                        {processing ? 'Criando...' : 'Criar Chamado'}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
