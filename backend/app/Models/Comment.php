<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Comment extends Model
{
    protected $fillable = ['text', 'user_id', 'ticket_id'];

    // Retorna o usuário que fez o comentário
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Retorna o chamado do comentário
    public function ticket(): BelongsTo
    {
        return $this->belongsTo(Ticket::class);
    }
}
