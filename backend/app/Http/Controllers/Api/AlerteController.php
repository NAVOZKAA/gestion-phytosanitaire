<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Alerte;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class AlerteController extends Controller
{
     public function index(): JsonResponse
    {
        $alertes = Alerte::with([
            'applicationTraitement',
            'utilisateur'
        ])->latest()->get();

        return response()->json($alertes);
    }

     public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'titre' => 'required|string|max:255',
            'message' => 'required|string',
            'type' => 'required|in:Manuelle,Automatique',
            'date_alerte' => 'required|date',
            'lue' => 'sometimes|boolean',
            'application_traitement_id' => 'nullable|exists:application_traitements,id',
            'utilisateur_id' => 'nullable|exists:users,id',
        ]);

        $alerte = Alerte::create($validated);

        return response()->json($alerte, 201);
    }

     public function show(string $id): JsonResponse
    {
        $alerte = Alerte::with([
            'applicationTraitement',
            'utilisateur'
        ])->findOrFail($id);

        return response()->json($alerte);
    }

     public function update(Request $request, string $id): JsonResponse
    {
        $alerte = Alerte::findOrFail($id);

        $validated = $request->validate([
            'titre' => 'required|string|max:255',
            'message' => 'required|string',
            'type' => 'required|in:Manuelle,Automatique',
            'date_alerte' => 'required|date',
            'lue' => 'sometimes|boolean',
            'application_traitement_id' => 'nullable|exists:application_traitements,id',
            'utilisateur_id' => 'nullable|exists:users,id',
        ]);

        $alerte->update($validated);

        return response()->json($alerte);
    }

     public function destroy(string $id): JsonResponse
    {
        $alerte = Alerte::findOrFail($id);
        $alerte->delete();

        return response()->json([
            'message' => 'Alerte supprimée avec succès'
        ]);
    }

     public function markAsRead(string $id): JsonResponse
    {
        $alerte = Alerte::findOrFail($id);

        $alerte->update([
            'lue' => true
        ]);

        return response()->json($alerte);
    }
}
