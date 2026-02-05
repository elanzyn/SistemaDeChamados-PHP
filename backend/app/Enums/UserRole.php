<?php

namespace App\Enums;

class UserRole
{
    const ADMIN = 'ADMIN';
    const TECH = 'TECH';
    const USER = 'USER';

    public static function all(): array
    {
        return [
            self::ADMIN,
            self::TECH,
            self::USER,
        ];
    }

    public static function labels(): array
    {
        return [
            self::ADMIN => 'Administrador',
            self::TECH => 'Técnico',
            self::USER => 'Usuário',
        ];
    }
}
