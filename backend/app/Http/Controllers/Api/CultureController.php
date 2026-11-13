<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Culture;
use Illuminate\Http\JsonResponse;
class CultureController extends Controller
{
     
    public function index(): JsonResponse
{
    $cultures = Culture::all();

    return response()->json($cultures);
}

    
   public function store(Request $request): JsonResponse
{
    $validated = $request->validate([
        'nom' => 'required|string|max:255',
        'type' => 'required|string|max:255',
        'superficie' => 'required|numeric|gt:0',
    ]);

    $culture = Culture::create($validated);

    return response()->json($culture, 201);
}
 
   public function show(string $id): JsonResponse
{
    $culture = Culture::findOrFail($id);

    return response()->json($culture);
}

        public function update(Request $request, string $id): JsonResponse
{
    $culture = Culture::findOrFail($id);

    $validated = $request->validate([
        'nom' => 'required|string|max:255',
        'type' => 'required|string|max:255',
        'superficie' => 'required|numeric|gt:0',
    ]);

    $culture->update($validated);

    return response()->json($culture);
}

       public function destroy(string $id): JsonResponse
{
    $culture = Culture::findOrFail($id);

    $culture->delete();

    return response()->json([
        'message' => 'Culture supprimée avec succès'
    ]);
}
}
