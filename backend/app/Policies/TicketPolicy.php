<?php

namespace App\Policies;

use App\Models\Ticket;
use App\Models\User;
use App\Enums\UserRole;
use Illuminate\Auth\Access\Response;

class TicketPolicy
{
    // Permite que todos os usuários vejam a listagem de chamados
    public function viewAny(User $user): bool
    {
        return true;
    }

    // Define quem pode visualizar um chamado específico
    public function view(User $user, Ticket $ticket): bool
    {
        return $user->role === UserRole::ADMIN 
            || $user->role === UserRole::TECH 
            || $ticket->user_id === $user->id;
    }

    // Permite que todos os usuários criem chamados
    public function create(User $user): bool
    {
        return true;
    }

    // Define quem pode atualizar um chamado
    public function update(User $user, Ticket $ticket): bool
    {
        return $user->role === UserRole::ADMIN 
            || $user->role === UserRole::TECH 
            || $ticket->user_id === $user->id;
    }

    // Define quem pode excluir um chamado
    public function delete(User $user, Ticket $ticket): bool
    {
        return $user->role === UserRole::ADMIN 
            || $ticket->user_id === $user->id;
    }

    // Apenas administradores podem restaurar chamados excluídos
    public function restore(User $user, Ticket $ticket): bool
    {
        return $user->role === UserRole::ADMIN;
    }

    // Apenas administradores podem excluir permanentemente
    public function forceDelete(User $user, Ticket $ticket): bool
    {
        return $user->role === UserRole::ADMIN;
    }
}
