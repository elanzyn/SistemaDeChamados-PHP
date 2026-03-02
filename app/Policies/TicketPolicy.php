<?php

namespace App\Policies;

use App\Models\Ticket;
use App\Models\User;
use App\Enums\UserRole;
use Illuminate\Auth\Access\Response;

class TicketPolicy
{
    // Todos podem ver a lista de chamados
    public function viewAny(User $user): bool
    {
        return true;
    }

    // Define quem pode ver um chamado específico
    public function view(User $user, Ticket $ticket): bool
    {
        return $user->role === UserRole::ADMIN 
            || $user->role === UserRole::TECH 
            || $ticket->user_id === $user->id;
    }

    // Todos podem criar chamados
    public function create(User $user): bool
    {
        return true;
    }

    // Define quem pode editar um chamado
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

    // Só admin pode restaurar chamados excluídos
    public function restore(User $user, Ticket $ticket): bool
    {
        return $user->role === UserRole::ADMIN;
    }

    // Só admin pode excluir permanentemente
    public function forceDelete(User $user, Ticket $ticket): bool
    {
        return $user->role === UserRole::ADMIN;
    }
}
