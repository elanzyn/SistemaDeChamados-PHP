<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Ticket extends Model
{
    protected $fillable = [
        'title', 
        'description', 
        'priority', 
        'status', 
        'user_id', 
        'tech_id', 
        'category_id'
    ];

    // Relacionamento: O chamado pertence a um usuário (quem abriu)
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Relacionamento: O chamado pertence a um técnico (quem atende)
    public function technician(): BelongsTo
    {
        return $this->belongsTo(User::class, 'tech_id');
    }

    // Relacionamento: O chamado pertence a uma categoria
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    // Relacionamento: O chamado pode ter vários comentários
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }
}