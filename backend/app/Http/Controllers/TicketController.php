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
    // Mostra a lista de chamados no dashboard
    public function index() 
    {
        $user = auth()->user();
        
        // Busca chamados com relacionamentos
        $ticketsQuery = Ticket::with(['category', 'user', 'technician']);
        
        // Filtra baseado no role do usuário
        if ($user->role === 'USER') {
            $ticketsQuery->where('user_id', $user->id);
        } elseif ($user->role === 'TECH') {
            $ticketsQuery->where(function($q) use ($user) {
                $q->where('tech_id', $user->id)
                  ->orWhere('user_id', $user->id);
            });
        }
        
        $tickets = $ticketsQuery->latest()->paginate(15);
        $categories = Category::all();
        
        // Calcula métricas do dashboard
        $metrics = [
            'total' => Ticket::count(),
            'open' => Ticket::where('status', TicketStatus::OPEN)->count(),
            'in_progress' => Ticket::where('status', TicketStatus::PROGRESS)->count(),
            'closed' => Ticket::where('status', TicketStatus::CLOSED)->count(),
            'by_priority' => [
                'low' => Ticket::where('priority', 'LOW')->count(),
                'medium' => Ticket::where('priority', 'MEDIUM')->count(),
                'high' => Ticket::where('priority', 'HIGH')->count(),
                'critical' => Ticket::where('priority', 'CRITICAL')->count(),
            ],
            'by_category' => Category::withCount('tickets')->get()->map(function($cat) {
                return [
                    'name' => $cat->name,
                    'count' => $cat->tickets_count
                ];
            }),
            'recent_activity' => Ticket::latest()->take(5)->get(['id', 'title', 'status', 'created_at']),
        ];

        return Inertia::render('Dashboard', [
            'tickets' => $tickets,
            'categories' => $categories,
            'metrics' => $metrics,
            'userRole' => $user->role,
        ]);
    }

    // Mostra os detalhes de um chamado específico
    public function show(Ticket $ticket)
    {
        $this->authorize('view', $ticket);
        
        $ticket->load(['category', 'user', 'technician', 'comments.user']);
        
        return Inertia::render('Tickets/Show', [
            'ticket' => $ticket
        ]);
    }

    // Cria um novo chamado
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

    // Mostra o formulário para editar um chamado
    public function edit(Ticket $ticket)
    {
        $this->authorize('update', $ticket);
        
        $ticket->load(['category', 'user']);
        $categories = Category::all();
        
        return Inertia::render('Tickets/Edit', [
            'ticket' => $ticket,
            'categories' => $categories
        ]);
    }

    // Atualiza um chamado existente
    public function update(Request $request, Ticket $ticket)
    {
        $this->authorize('update', $ticket);
        
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:5000',
            'priority' => 'required|in:LOW,MEDIUM,HIGH,CRITICAL',
            'status' => 'required|in:OPEN,PROGRESS,CLOSED',
            'category_id' => 'required|exists:categories,id',
        ]);

        try {
            $ticket->update($validated);
            
            return redirect()->route('dashboard')->with('success', 'Chamado atualizado com sucesso!');
        } catch (\Exception $e) {
            return redirect()->back()->withInput()->withErrors(['error' => 'Erro ao atualizar chamado.']);
        }
    }

    // Exclui um chamado
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

    // Atribui um técnico ao chamado
    public function assignTechnician(Request $request, Ticket $ticket)
    {
        $user = auth()->user();
        
        // Apenas admin e técnicos podem atribuir
        if (!in_array($user->role, ['ADMIN', 'TECH'])) {
            return redirect()->back()->withErrors(['error' => 'Você não tem permissão para atribuir técnicos.']);
        }
        
        $validated = $request->validate([
            'tech_id' => 'required|exists:users,id',
        ]);

        try {
            $ticket->update(['tech_id' => $validated['tech_id']]);
            
            return redirect()->back()->with('success', 'Técnico atribuído com sucesso!');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Erro ao atribuir técnico.']);
        }
    }

    // Atualiza o status do chamado
    public function updateStatus(Request $request, Ticket $ticket)
    {
        $this->authorize('update', $ticket);
        
        $validated = $request->validate([
            'status' => 'required|in:OPEN,PROGRESS,CLOSED',
        ]);

        try {
            $ticket->update(['status' => $validated['status']]);
            
            return redirect()->back()->with('success', 'Status atualizado com sucesso!');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Erro ao atualizar status.']);
        }
    }
}