<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    protected $fillable = ['name', 'description'];

    // Uma categoria pode ter múltiplos chamados associados
    public function tickets(): HasMany
    {
        return $this->hasMany(Ticket::class);
    }
}