<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Cria categorias de exemplo para o sistema
        \App\Models\Category::create(['name'=>'Suporte','description'=>'Suporte geral']);
        \App\Models\Category::create(['name'=>'Infraestrutura','description'=>'Problemas de rede e servidores']);
        \App\Models\Category::create(['name'=>'Sistemas','description'=>'Sistemas internos e softwares']);
        \App\Models\Category::create(['name'=>'Hardware','description'=>'Equipamentos e dispositivos']);
    }
}
