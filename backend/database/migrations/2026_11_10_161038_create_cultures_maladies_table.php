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
    Schema::create('cultures_maladies', function (Blueprint $table) {
        $table->id();

        $table->foreignId('culture_id')
            ->constrained()
            ->cascadeOnDelete();

        $table->foreignId('maladie_id')
            ->constrained()
            ->cascadeOnDelete();

        $table->timestamps();

        $table->unique(['culture_id', 'maladie_id']);
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cultures_maladies');
    }
};
