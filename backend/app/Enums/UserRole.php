<?php

namespace App\Enums;

class UserRole
{
    // Papéis de usuário no sistema
    const ADMIN = 'ADMIN';
    const TECH = 'TECH';
    const USER = 'USER';

    // Retorna todos os papéis disponíveis
    public static function all(): array
    {
        return [
            self::ADMIN,
            self::TECH,
            self::USER,
        ];
    }

    // Retorna os rótulos em português para cada papel
    public static function labels(): array
    {
        return [
            self::ADMIN => 'Administrador',
            self::TECH => 'Técnico',
            self::USER => 'Usuário',
        ];
    }
}
