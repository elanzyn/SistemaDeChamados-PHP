<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTicketRequest extends FormRequest
{
    // Qualquer usuário autenticado pode criar chamados
    public function authorize(): bool
    {
        return true;
    }

    // Regras de validação para criar chamado
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:5000',
            'priority' => 'required|in:low,medium,high,critical',
            'category_id' => 'required|exists:categories,id',
        ];
    }

    // Mensagens de erro em português
    public function messages(): array
    {
        return [
            'title.required' => 'O título do chamado é obrigatório',
            'title.max' => 'O título não pode ter mais de 255 caracteres',
            'description.required' => 'A descrição do chamado é obrigatória',
            'description.max' => 'A descrição não pode ter mais de 5000 caracteres',
            'priority.required' => 'A prioridade é obrigatória',
            'priority.in' => 'Prioridade inválida. Valores aceitos: low, medium, high, critical',
            'category_id.required' => 'A categoria é obrigatória',
            'category_id.exists' => 'Categoria selecionada não existe',
        ];
    }
}
