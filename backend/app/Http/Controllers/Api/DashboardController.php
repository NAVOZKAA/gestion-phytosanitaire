<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Alerte;
use App\Models\ApplicationTraitement;
use App\Models\Culture;
use App\Models\Maladie;
use App\Models\Traitement;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'total_cultures' => Culture::count(),
            'total_maladies' => Maladie::count(),
            'total_traitements' => Traitement::count(),
            'total_applications' => ApplicationTraitement::count(),
            'total_alertes' => Alerte::count(),
            'recent_applications' => ApplicationTraitement::with([
                'culture',
                'maladie',
                'traitement',
            ])->orderByDesc('date_application')->orderByDesc('id')->limit(5)->get(),
            'recent_alertes' => Alerte::orderByDesc('date_alerte')
                ->orderByDesc('id')
                ->limit(5)
                ->get(),
        ]);
    }
}
