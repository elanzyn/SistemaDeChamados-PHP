<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    // Campos que podem ser preenchidos em massa
    protected $fillable = ['name', 'description'];

    // Relacionamento: Uma categoria possui muitos chamados
    public function tickets(): HasMany
    {
        return $this->hasMany(Ticket::class);
    }
}