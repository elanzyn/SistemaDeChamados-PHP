import React, { useState } from 'react';
import { useForm, Head } from '@inertiajs/react';
import { useForm, Head, router } from '@inertiajs/react'; // Adicione o 'router' aqui

export default function Dashboard({ tickets, categories }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, post, processing, reset } = useForm({
        title: '',
        category_id: '',
        priority: 'MEDIUM', // Exatamente como na Migration
        description: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/tickets', {
            onSuccess: () => {
                setIsModalOpen(false);
                reset();
            },
            onError: (err) => {
                console.error("Erro ao salvar:", err);
            }
        });
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white p-8">
            <Head title="Painel de Suporte" />
            
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-blue-400">HelpDesk TI</h1>
                        <p className="text-slate-400">Olá, Administrador</p>
                    </div>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
                    >
                        + Novo Chamado
                    </button>
                </div>

                {/* Cards de Status */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                        <p className="text-slate-400 text-sm">Total de Chamados</p>
                        <p className="text-3xl font-bold">{tickets.length}</p>
                    </div>
                    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                        <p className="text-slate-400 text-sm">Abertos</p>
                        <p className="text-3xl font-bold text-green-400">
                            {tickets.filter(t => t.status === 'OPEN').length}
                        </p>
                    </div>
                    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                        <p className="text-slate-400 text-sm">Em Progresso</p>
                        <p className="text-3xl font-bold text-yellow-400">
                            {tickets.filter(t => t.status === 'PROGRESS').length}
                        </p>
                    </div>
                </div>

                {/* Tabela de Chamados */}
                <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-slate-800 text-slate-300">
                            <tr>
                                <th className="p-4">Título</th>
                                <th className="p-4">Categoria</th>
                                <th className="p-4">Prioridade</th>
                                <th className="p-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {tickets.map((ticket) => (
                                <tr key={ticket.id} className="hover:bg-slate-800/50 transition">
                                    <td className="p-4 font-medium">{ticket.title}</td>
                                    <td className="p-4 text-slate-400">{ticket.category?.name}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                                            ticket.priority === 'HIGH' ? 'bg-red-900 text-red-200' : 
                                            ticket.priority === 'MEDIUM' ? 'bg-yellow-900 text-yellow-200' : 'bg-blue-900 text-blue-200'
                                        }`}>
                                            {ticket.priority === 'HIGH' ? 'ALTO' : ticket.priority === 'MEDIUM' ? 'MÉDIO' : 'BAIXO'}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className="flex items-center gap-2">
                                            <span className={`w-2 h-2 rounded-full ${ticket.status === 'OPEN' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                                            {ticket.status === 'OPEN' ? 'Aberto' : 'Em Atendimento'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal de Novo Chamado */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
                    <div className="bg-slate-900 border border-slate-700 p-8 rounded-2xl max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-6">Novo Chamado Técnico</h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm mb-1 text-slate-400">Título do Problema</label>
                                <input 
                                    type="text" 
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm mb-1 text-slate-400">Categoria</label>
                                <select 
                                    value={data.category_id}
                                    onChange={e => setData('category_id', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white outline-none"
                                    required
                                >
                                    <option value="">Selecione...</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm mb-1 text-slate-400">Prioridade</label>
                                <div className="flex gap-4">
                                    {[
                                        { val: 'LOW', label: 'BAIXO' },
                                        { val: 'MEDIUM', label: 'MÉDIO' },
                                        { val: 'HIGH', label: 'ALTO' }
                                    ].map(p => (
                                        <label key={p.val} className="flex items-center gap-2 cursor-pointer">
                                            <input 
                                                type="radio" 
                                                name="priority" 
                                                value={p.val}
                                                checked={data.priority === p.val}
                                                onChange={e => setData('priority', e.target.value)}
                                                className="text-blue-600"
                                            />
                                            <span className="text-xs">{p.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm mb-1 text-slate-400">Descrição</label>
                                <textarea 
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white h-24 outline-none"
                                    required
                                ></textarea>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button 
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-2 border border-slate-700 rounded-lg hover:bg-slate-800 transition"
                                >
                                    Cancelar
                                </button>
                                <button 
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 font-bold transition disabled:opacity-50"
                                >
                                    {processing ? 'Salvando...' : 'Criar Chamado'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}