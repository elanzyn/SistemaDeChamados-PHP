<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\Category;
use App\Http\Requests\StoreTicketRequest;
use App\Enums\TicketStatus;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TicketController extends Controller
{
    // Exibe a listagem de todos os chamados com suas respectivas categorias
    public function index() 
    {
        $tickets = Ticket::with('category', 'user')->latest()->paginate(15);
        $categories = Category::all();

        return Inertia::render('Dashboard', [
            'tickets' => $tickets,
            'categories' => $categories
        ]);
    }

    public function store(StoreTicketRequest $request)
    {
        try {
            $priority = strtoupper($request->priority); 

            Ticket::create([
                'title'       => $request->title,
                'description' => $request->description,
                'priority'    => $priority,
                'category_id' => $request->category_id,
                'user_id'     => auth()->id(),
                'status'      => TicketStatus::OPEN,
            ]);

            return redirect()->route('dashboard')->with('success', 'Chamado criado com sucesso!');
        } catch (\Exception $e) {
            return redirect()->back()->withInput()->withErrors(['error' => 'Erro ao criar chamado. Tente novamente.']);
        }
    }

    public function destroy(Ticket $ticket)
    {
        $this->authorize('delete', $ticket);
        
        try {
            $ticket->delete();
            return redirect()->back()->with('success', 'Chamado excluído com sucesso!');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Erro ao excluir chamado.']);
        }
    }
}