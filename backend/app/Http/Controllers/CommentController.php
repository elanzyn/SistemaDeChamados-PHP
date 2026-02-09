<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Ticket;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    // Lista os comentários de um chamado
    public function index(Ticket $ticket)
    {
        $comments = $ticket->comments()
            ->with('user')
            ->latest()
            ->get();

        return response()->json($comments);
    }

    // Adiciona um comentário ao chamado
    public function store(Request $request, Ticket $ticket)
    {
        $validated = $request->validate([
            'text' => 'required|string|max:2000',
        ], [
            'text.required' => 'O comentário não pode estar vazio',
            'text.max' => 'O comentário não pode ter mais de 2000 caracteres',
        ]);

        try {
            $comment = $ticket->comments()->create([
                'text' => $validated['text'],
                'user_id' => auth()->id(),
            ]);

            $comment->load('user');

            return redirect()->back()->with('success', 'Comentário adicionado com sucesso!');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Erro ao adicionar comentário.']);
        }
    }

    // Atualiza um comentário
    public function update(Request $request, Comment $comment)
    {
        // Só o autor pode editar
        if ($comment->user_id !== auth()->id()) {
            return redirect()->back()->withErrors(['error' => 'Você não pode editar este comentário.']);
        }

        $validated = $request->validate([
            'text' => 'required|string|max:2000',
        ]);

        try {
            $comment->update($validated);
            
            return redirect()->back()->with('success', 'Comentário atualizado com sucesso!');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Erro ao atualizar comentário.']);
        }
    }

    // Exclui um comentário
    public function destroy(Comment $comment)
    {
        // Só o autor ou admin pode excluir
        if ($comment->user_id !== auth()->id() && auth()->user()->role !== 'ADMIN') {
            return redirect()->back()->withErrors(['error' => 'Você não pode excluir este comentário.']);
        }

        try {
            $comment->delete();
            
            return redirect()->back()->with('success', 'Comentário excluído com sucesso!');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Erro ao excluir comentário.']);
        }
    }
}
