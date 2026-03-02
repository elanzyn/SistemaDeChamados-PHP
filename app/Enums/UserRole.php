<?php

namespace App\Enums;

class UserRole
{
    // Tipos de usuário no sistema
    const ADMIN = 'ADMIN';
    const TECH = 'TECH';
    const USER = 'USER';

    // Lista todos os tipos
    public static function all(): array
    {
        return [
            self::ADMIN,
            self::TECH,
            self::USER,
        ];
    }

    // Nomes dos tipos em português
    public static function labels(): array
    {
        return [
            self::ADMIN => 'Administrador',
            self::TECH => 'Técnico',
            self::USER => 'Usuário',
        ];
    }
}
