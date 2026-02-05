<?php

namespace App\Enums;

class TicketStatus
{
    const OPEN = 'OPEN';
    const PROGRESS = 'PROGRESS';
    const CLOSED = 'CLOSED';

    public static function all(): array
    {
        return [
            self::OPEN,
            self::PROGRESS,
            self::CLOSED,
        ];
    }

    public static function labels(): array
    {
        return [
            self::OPEN => 'Aberto',
            self::PROGRESS => 'Em Andamento',
            self::CLOSED => 'Fechado',
        ];
    }
}
