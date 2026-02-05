<?php

namespace App\Enums;

class TicketPriority
{
    const LOW = 'LOW';
    const MEDIUM = 'MEDIUM';
    const HIGH = 'HIGH';
    const CRITICAL = 'CRITICAL';

    public static function all(): array
    {
        return [
            self::LOW,
            self::MEDIUM,
            self::HIGH,
            self::CRITICAL,
        ];
    }

    public static function labels(): array
    {
        return [
            self::LOW => 'Baixa',
            self::MEDIUM => 'Média',
            self::HIGH => 'Alta',
            self::CRITICAL => 'Crítica',
        ];
    }
}
