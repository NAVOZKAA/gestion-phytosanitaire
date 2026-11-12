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
    Schema::create('alertes', function (Blueprint $table) {
        $table->id();

        $table->string('titre');
        $table->text('message');
        $table->string('type');
        $table->date('date_alerte');
        $table->boolean('lue')->default(false);

        $table->foreignId('application_traitement_id')
              ->nullable()
              ->constrained('application_traitements')
              ->nullOnDelete();

        $table->foreignId('utilisateur_id')
              ->nullable()
              ->constrained('users')
              ->nullOnDelete();

        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('alertes');
    }
};
