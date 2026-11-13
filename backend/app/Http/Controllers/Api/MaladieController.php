<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Maladie;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class MaladieController extends Controller
{
    
    public function index(): JsonResponse
    {
        return response()->json(Maladie::all());
    }

     
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'nullable|string',
            'symptomes' => 'nullable|string',
        ]);

        $maladie = Maladie::create($validated);

        return response()->json($maladie, 201);
    }

     public function show(string $id): JsonResponse
    {
        $maladie = Maladie::findOrFail($id);

        return response()->json($maladie);
    }

     public function update(Request $request, string $id): JsonResponse
    {
        $maladie = Maladie::findOrFail($id);

        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'nullable|string',
            'symptomes' => 'nullable|string',
        ]);

        $maladie->update($validated);

        return response()->json($maladie);
    }

     public function destroy(string $id): JsonResponse
    {
        $maladie = Maladie::findOrFail($id);

        $maladie->delete();

        return response()->json([
            'message' => 'Maladie supprimée avec succès'
        ]);
    }
}
