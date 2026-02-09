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

    // Retorna o usuário que criou o chamado
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Retorna o técnico responsável pelo chamado
    public function technician(): BelongsTo
    {
        return $this->belongsTo(User::class, 'tech_id');
    }

    // Retorna a categoria do chamado
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    // Retorna os comentários do chamado
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }
}