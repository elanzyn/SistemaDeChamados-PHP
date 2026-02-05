<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Comment extends Model
{
    protected $fillable = ['text', 'user_id', 'ticket_id'];

    // Comentário pertence a um usuário
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Comentário pertence a um chamado
    public function ticket(): BelongsTo
    {
        return $this->belongsTo(Ticket::class);
    }
}
