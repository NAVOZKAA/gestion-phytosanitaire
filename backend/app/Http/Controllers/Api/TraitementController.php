<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Traitement;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TraitementController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Traitement::all());
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'nullable|string',
            'produit' => 'required|string|max:255',
            'dosage' => 'required|string|max:255',
        ]);

        $traitement = Traitement::create($validated);

        return response()->json($traitement, 201);
    }

    public function show(string $id): JsonResponse
    {
        return response()->json(Traitement::findOrFail($id));
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $traitement = Traitement::findOrFail($id);

        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'nullable|string',
            'produit' => 'required|string|max:255',
            'dosage' => 'required|string|max:255',
        ]);

        $traitement->update($validated);

        return response()->json($traitement);
    }

    public function destroy(string $id): JsonResponse
    {
        $traitement = Traitement::findOrFail($id);
        $traitement->delete();

        return response()->json([
            'message' => 'Traitement supprimé avec succès'
        ]);
    }
}
