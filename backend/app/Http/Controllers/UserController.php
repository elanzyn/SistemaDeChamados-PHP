<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class UserController extends Controller
{
    // Lista todos os usuários
    public function index()
    {
        $users = User::withCount(['tickets', 'assignedTickets'])
            ->orderBy('name')
            ->get();
        
        return Inertia::render('Users/Index', [
            'users' => $users
        ]);
    }

    // Cria um novo usuário
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'required|in:ADMIN,TECH,USER',
            'department' => 'nullable|string|max:255',
        ], [
            'name.required' => 'O nome é obrigatório',
            'email.required' => 'O email é obrigatório',
            'email.unique' => 'Este email já está cadastrado',
            'password.required' => 'A senha é obrigatória',
            'password.confirmed' => 'As senhas não coincidem',
            'role.required' => 'O perfil é obrigatório',
            'role.in' => 'Perfil inválido',
        ]);

        try {
            User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'role' => $validated['role'],
                'department' => $validated['department'] ?? null,
                'active' => true,
            ]);
            
            return redirect()->back()->with('success', 'Usuário criado com sucesso!');
        } catch (\Exception $e) {
            return redirect()->back()->withInput()->withErrors(['error' => 'Erro ao criar usuário.']);
        }
    }

    // Atualiza um usuário existente
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'role' => 'required|in:ADMIN,TECH,USER',
            'department' => 'nullable|string|max:255',
            'active' => 'boolean',
        ], [
            'name.required' => 'O nome é obrigatório',
            'email.required' => 'O email é obrigatório',
            'email.unique' => 'Este email já está cadastrado',
            'role.required' => 'O perfil é obrigatório',
            'role.in' => 'Perfil inválido',
        ]);

        try {
            $user->update($validated);
            
            return redirect()->back()->with('success', 'Usuário atualizado com sucesso!');
        } catch (\Exception $e) {
            return redirect()->back()->withInput()->withErrors(['error' => 'Erro ao atualizar usuário.']);
        }
    }

    // Atualiza a senha de um usuário
    public function updatePassword(Request $request, User $user)
    {
        $validated = $request->validate([
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ], [
            'password.required' => 'A senha é obrigatória',
            'password.confirmed' => 'As senhas não coincidem',
        ]);

        try {
            $user->update([
                'password' => Hash::make($validated['password']),
            ]);
            
            return redirect()->back()->with('success', 'Senha atualizada com sucesso!');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Erro ao atualizar senha.']);
        }
    }

    // Exclui um usuário
    public function destroy(User $user)
    {
        // Não permite excluir o próprio usuário
        if ($user->id === auth()->id()) {
            return redirect()->back()->withErrors(['error' => 'Você não pode excluir sua própria conta.']);
        }

        // Verifica se há chamados criados por este usuário
        if ($user->tickets()->count() > 0) {
            return redirect()->back()->withErrors(['error' => 'Não é possível excluir este usuário pois ele possui chamados criados.']);
        }

        // Verifica se há chamados atribuídos a este usuário
        if ($user->assignedTickets()->count() > 0) {
            return redirect()->back()->withErrors(['error' => 'Não é possível excluir este usuário pois ele possui chamados atribuídos.']);
        }

        try {
            $user->delete();
            
            return redirect()->back()->with('success', 'Usuário excluído com sucesso!');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Erro ao excluir usuário.']);
        }
    }

    // Ativa ou desativa um usuário
    public function toggleActive(User $user)
    {
        // Não permite desativar o próprio usuário
        if ($user->id === auth()->id()) {
            return redirect()->back()->withErrors(['error' => 'Você não pode desativar sua própria conta.']);
        }

        try {
            $user->update([
                'active' => !$user->active,
            ]);
            
            $status = $user->active ? 'ativado' : 'desativado';
            return redirect()->back()->with('success', "Usuário {$status} com sucesso!");
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Erro ao alterar status do usuário.']);
        }
    }
}
