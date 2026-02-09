<?php

namespace App\Enums;

class TicketStatus
{
    // Status possíveis do chamado
    const OPEN = 'OPEN';
    const PROGRESS = 'PROGRESS';
    const CLOSED = 'CLOSED';

    // Lista todos os status
    public static function all(): array
    {
        return [
            self::OPEN,
            self::PROGRESS,
            self::CLOSED,
        ];
    }

    // Nomes dos status em português
    public static function labels(): array
    {
        return [
            self::OPEN => 'Aberto',
            self::PROGRESS => 'Em Andamento',
            self::CLOSED => 'Fechado',
        ];
    }
}
