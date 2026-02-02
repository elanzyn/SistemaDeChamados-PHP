<?php
use App\Http\Controllers\TicketController;
use Illuminate\Support\Facades\Route;

// Rota principal
Route::get('/', [TicketController::class, 'index'])->name('dashboard');

// Rota para salvar (POST) e demais recursos
Route::resource('tickets', TicketController::class);

Route::delete('/tickets/{ticket}', [App\Http\Controllers\TicketController.class, 'destroy'])->name('tickets.destroy');