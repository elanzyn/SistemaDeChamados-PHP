<?php

namespace App\Enums;

class TicketPriority
{
    // Níveis de prioridade do chamado
    const LOW = 'LOW';
    const MEDIUM = 'MEDIUM';
    const HIGH = 'HIGH';
    const CRITICAL = 'CRITICAL';

    // Lista todas as prioridades
    public static function all(): array
    {
        return [
            self::LOW,
            self::MEDIUM,
            self::HIGH,
            self::CRITICAL,
        ];
    }

    // Nomes das prioridades em português
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
