<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TicketController extends Controller
{
    // Método que você já tem para carregar a tela
    public function index() 
    {
        $tickets = Ticket::with('category', 'user')->latest()->get();
        $categories = Category::all();

        return Inertia::render('Dashboard', [
            'tickets' => $tickets,
            'categories' => $categories
        ]);
    }
    public function store(Request $request)
{
    // 1. Forçamos a conversão para maiúsculo para bater com a Migration
    $priority = strtoupper($request->priority); 

    // 2. Criamos o ticket tratando os dados
    \App\Models\Ticket::create([
        'title'       => $request->title,
        'description' => $request->description,
        'priority'    => $priority, // Aqui vai 'HIGH', 'MEDIUM', etc.
        'category_id' => $request->category_id,
        'user_id'     => auth()->id() ?? 3, // Usa o ID logado ou o 3 de teste
        'status'      => 'OPEN',
    ]);

    
    return redirect()->route('dashboard');
}

public function destroy(\App\Models\Ticket $ticket)
{
    $ticket->delete();
    return redirect()->back(); // Recarrega a página com a lista atualizada
}
}