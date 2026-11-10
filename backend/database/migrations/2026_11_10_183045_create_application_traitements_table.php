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
    Schema::create('application_traitements', function (Blueprint $table) {
        $table->id();

        $table->foreignId('culture_id')->constrained()->cascadeOnDelete();
        $table->foreignId('maladie_id')->constrained()->cascadeOnDelete();
        $table->foreignId('traitement_id')->constrained()->cascadeOnDelete();

        $table->foreignId('utilisateur_id')
              ->constrained('users')
              ->cascadeOnDelete();

        $table->date('date_application');
        $table->date('date_suivi')->nullable();
        $table->text('observations')->nullable();
        $table->string('resultat')->nullable();

        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('application_traitements');
    }
};
