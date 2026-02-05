<?php

namespace App\Enums;

class TicketPriority
{
    // Níveis de prioridade de um chamado
    const LOW = 'LOW';
    const MEDIUM = 'MEDIUM';
    const HIGH = 'HIGH';
    const CRITICAL = 'CRITICAL';

    // Retorna todas as prioridades disponíveis
    public static function all(): array
    {
        return [
            self::LOW,
            self::MEDIUM,
            self::HIGH,
            self::CRITICAL,
        ];
    }

    // Retorna os rótulos em português para cada prioridade
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
