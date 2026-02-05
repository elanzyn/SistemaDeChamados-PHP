<?php

namespace App\Policies;

use App\Models\Ticket;
use App\Models\User;
use App\Enums\UserRole;
use Illuminate\Auth\Access\Response;

class TicketPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Ticket $ticket): bool
    {
        return $user->role === UserRole::ADMIN 
            || $user->role === UserRole::TECH 
            || $ticket->user_id === $user->id;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, Ticket $ticket): bool
    {
        return $user->role === UserRole::ADMIN 
            || $user->role === UserRole::TECH 
            || $ticket->user_id === $user->id;
    }

    public function delete(User $user, Ticket $ticket): bool
    {
        return $user->role === UserRole::ADMIN 
            || $ticket->user_id === $user->id;
    }

    public function restore(User $user, Ticket $ticket): bool
    {
        return $user->role === UserRole::ADMIN;
    }

    public function forceDelete(User $user, Ticket $ticket): bool
    {
        return $user->role === UserRole::ADMIN;
    }
}
