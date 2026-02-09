<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    // Lista todas as categorias
    public function index()
    {
        $categories = Category::withCount('tickets')->latest()->paginate(15);
        
        return Inertia::render('Categories/Index', [
            'categories' => $categories
        ]);
    }

    // Cria uma nova categoria
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name',
            'description' => 'nullable|string|max:1000',
        ], [
            'name.required' => 'O nome da categoria é obrigatório',
            'name.unique' => 'Já existe uma categoria com este nome',
            'name.max' => 'O nome não pode ter mais de 255 caracteres',
            'description.max' => 'A descrição não pode ter mais de 1000 caracteres',
        ]);

        try {
            Category::create($validated);
            
            return redirect()->back()->with('success', 'Categoria criada com sucesso!');
        } catch (\Exception $e) {
            return redirect()->back()->withInput()->withErrors(['error' => 'Erro ao criar categoria.']);
        }
    }

    // Atualiza uma categoria existente
    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,' . $category->id,
            'description' => 'nullable|string|max:1000',
        ], [
            'name.required' => 'O nome da categoria é obrigatório',
            'name.unique' => 'Já existe uma categoria com este nome',
            'name.max' => 'O nome não pode ter mais de 255 caracteres',
            'description.max' => 'A descrição não pode ter mais de 1000 caracteres',
        ]);

        try {
            $category->update($validated);
            
            return redirect()->back()->with('success', 'Categoria atualizada com sucesso!');
        } catch (\Exception $e) {
            return redirect()->back()->withInput()->withErrors(['error' => 'Erro ao atualizar categoria.']);
        }
    }

    // Exclui uma categoria
    public function destroy(Category $category)
    {
        // Verifica se há chamados usando esta categoria
        if ($category->tickets()->count() > 0) {
            return redirect()->back()->withErrors(['error' => 'Não é possível excluir esta categoria pois ela possui chamados associados.']);
        }

        try {
            $category->delete();
            
            return redirect()->back()->with('success', 'Categoria excluída com sucesso!');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Erro ao excluir categoria.']);
        }
    }
}
