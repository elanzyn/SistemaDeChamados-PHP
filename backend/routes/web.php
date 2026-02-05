<?php
use App\Http\Controllers\TicketController;
use Illuminate\Support\Facades\Route;

// Exibe o dashboard principal com a listagem de chamados
Route::get('/', [TicketController::class, 'index'])->name('dashboard');

// Define rotas RESTful para gerenciamento de chamados
Route::resource('tickets', TicketController::class);
