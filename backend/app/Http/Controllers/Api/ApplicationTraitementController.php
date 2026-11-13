<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ApplicationTraitement;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ApplicationTraitementController extends Controller
{
    
    public function index(): JsonResponse
    {
        $applications = ApplicationTraitement::with([
            'culture',
            'maladie',
            'traitement',
            'utilisateur'
        ])->get();

        return response()->json($applications);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'culture_id' => 'required|exists:cultures,id',
            'maladie_id' => 'required|exists:maladies,id',
            'traitement_id' => 'required|exists:traitements,id',
            'utilisateur_id' => 'required|exists:users,id',
            'date_application' => 'required|date',
            'date_suivi' => 'nullable|date|after_or_equal:date_application',
            'observations' => 'nullable|string',
            'resultat' => 'nullable|string|max:255',
        ]);

        $application = ApplicationTraitement::create($validated);

        return response()->json(
            $application->load(['culture', 'maladie', 'traitement', 'utilisateur']),
            201
        );
    }

    public function show(string $id): JsonResponse
    {
        $application = ApplicationTraitement::with([
            'culture',
            'maladie',
            'traitement',
            'utilisateur'
        ])->findOrFail($id);

        return response()->json($application);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $application = ApplicationTraitement::findOrFail($id);

        $validated = $request->validate([
            'culture_id' => 'required|exists:cultures,id',
            'maladie_id' => 'required|exists:maladies,id',
            'traitement_id' => 'required|exists:traitements,id',
            'utilisateur_id' => 'required|exists:users,id',
            'date_application' => 'required|date',
            'date_suivi' => 'nullable|date|after_or_equal:date_application',
            'observations' => 'nullable|string',
            'resultat' => 'nullable|string|max:255',
        ]);

        $application->update($validated);

        return response()->json(
            $application->load(['culture', 'maladie', 'traitement', 'utilisateur'])
        );
    }

    public function destroy(string $id): JsonResponse
    {
        $application = ApplicationTraitement::findOrFail($id);
        $application->delete();

        return response()->json([
            'message' => 'Application supprimée avec succès'
        ]);
    }
}
