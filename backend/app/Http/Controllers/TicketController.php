<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TicketController extends Controller
{
    // Exibe a listagem de todos os chamados com suas respectivas categorias
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
    // Normaliza a prioridade para maiúsculo conforme definido na migration
    $priority = strtoupper($request->priority); 

    // Cria o chamado com os dados fornecidos
    \App\Models\Ticket::create([
        'title'       => $request->title,
        'description' => $request->description,
        'priority'    => $priority,
        'category_id' => $request->category_id,
        'user_id'     => auth()->id() ?? 3,
        'status'      => 'OPEN',
    ]);

    
    return redirect()->route('dashboard');
}

public function destroy(\App\Models\Ticket $ticket)
{
    $ticket->delete();
    return redirect()->back();
}
}