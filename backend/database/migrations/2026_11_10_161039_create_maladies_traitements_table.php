<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('maladies_traitements', function (Blueprint $table) {
        $table->id();

        $table->foreignId('maladie_id')
            ->constrained()
            ->cascadeOnDelete();

        $table->foreignId('traitement_id')
            ->constrained()
            ->cascadeOnDelete();

        $table->timestamps();

        $table->unique(['maladie_id', 'traitement_id']);
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('maladies_traitements');
    }
};
