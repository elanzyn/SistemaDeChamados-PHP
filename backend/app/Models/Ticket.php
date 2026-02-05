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

    // Chamado pertence ao usuário que o criou
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Chamado pode ser atribuído a um técnico responsável
    public function technician(): BelongsTo
    {
        return $this->belongsTo(User::class, 'tech_id');
    }

    // Chamado pertence a uma categoria específica
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    // Chamado pode ter múltiplos comentários associados
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }
}