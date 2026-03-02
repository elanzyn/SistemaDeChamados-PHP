<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
     {
         Schema::create('tickets', function (Blueprint $table) {
             $table->id();
             $table->string('title');
             $table->text('description');
             $table->enum('priority', ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'])->default('LOW');
             $table->enum('status', ['OPEN', 'PROGRESS', 'CLOSED'])->default('OPEN');
             $table->foreignId('user_id')->constrained('users');
             $table->foreignId('tech_id')->nullable()->constrained('users');
             $table->foreignId('category_id')->constrained('categories');
             $table->timestamps();
         });
     }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
