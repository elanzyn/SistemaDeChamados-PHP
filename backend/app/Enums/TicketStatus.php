<?php

namespace App\Enums;

class TicketStatus
{
    // Status possíveis de um chamado
    const OPEN = 'OPEN';
    const PROGRESS = 'PROGRESS';
    const CLOSED = 'CLOSED';

    // Retorna todos os status disponíveis
    public static function all(): array
    {
        return [
            self::OPEN,
            self::PROGRESS,
            self::CLOSED,
        ];
    }

    // Retorna os rótulos em português para cada status
    public static function labels(): array
    {
        return [
            self::OPEN => 'Aberto',
            self::PROGRESS => 'Em Andamento',
            self::CLOSED => 'Fechado',
        ];
    }
}
