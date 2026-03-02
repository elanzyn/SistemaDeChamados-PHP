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
         Schema::create('status_histories', function (Blueprint $table) {
             $table->id();
             $table->enum('old_status', ['OPEN', 'PROGRESS', 'CLOSED']);
             $table->enum('new_status', ['OPEN', 'PROGRESS', 'CLOSED']);
             $table->foreignId('user_id')->constrained('users');
             $table->foreignId('ticket_id')->constrained('tickets');
             $table->timestamps();
         });
     }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('status_histories');
    }
};
