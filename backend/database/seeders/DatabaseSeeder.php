<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Ticket;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Cria usuários de teste para o sistema
        $admin = User::create([
            'name' => 'Administrador do Sistema',
            'email' => 'admin@sistema.com.br',
            'password' => Hash::make('password'),
            'role' => 'ADMIN',
            'department' => 'TI Central',
        ]);

        $tecnico = User::create([
            'name' => 'Técnico Suporte',
            'email' => 'tecnico@sistema.com.br',
            'password' => Hash::make('password'),
            'role' => 'TECH',
            'department' => 'Suporte Nível 1',
        ]);

        $usuario = User::create([
            'name' => 'João Silva',
            'email' => 'joao@cliente.com.br',
            'password' => Hash::make('password'),
            'role' => 'USER',
            'department' => 'Financeiro',
        ]);

        // Cria categorias para classificação dos chamados
        $catHardware = Category::create(['name' => 'Hardware', 'description' => 'Problemas com máquinas e periféricos']);
        $catSoftware = Category::create(['name' => 'Software/Sistemas', 'description' => 'Erros em programas ou acesso ao ERP']);
        $catRede = Category::create(['name' => 'Redes e Internet', 'description' => 'Problemas de conexão e Wi-Fi']);

        // Cria chamados de exemplo para demonstração do sistema
        Ticket::create([
            'title' => 'Impressora não imprime no Financeiro',
            'description' => 'A impressora HP do setor parou de responder após queda de energia.',
            'priority' => 'MEDIUM',
            'status' => 'OPEN',
            'user_id' => $usuario->id,
            'category_id' => $catHardware->id,
        ]);

        Ticket::create([
            'title' => 'Erro ao acessar o ERP - Módulo Contábil',
            'description' => 'Aparece mensagem de erro 500 ao tentar gerar relatórios mensais.',
            'priority' => 'HIGH',
            'status' => 'PROGRESS',
            'user_id' => $usuario->id,
            'tech_id' => $tecnico->id,
            'category_id' => $catSoftware->id,
        ]);

        Ticket::create([
            'title' => 'Cabo de rede danificado na recepção',
            'description' => 'O cabo de rede parece estar com o conector quebrado.',
            'priority' => 'LOW',
            'status' => 'OPEN',
            'user_id' => $usuario->id,
            'category_id' => $catRede->id,
        ]);
    }
}
