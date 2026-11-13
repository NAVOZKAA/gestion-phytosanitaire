<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CultureController;
use App\Http\Controllers\Api\MaladieController;
use App\Http\Controllers\Api\TraitementController;
use App\Http\Controllers\Api\ApplicationTraitementController;
use App\Http\Controllers\Api\AlerteController;

// Cultures
Route::apiResource('cultures', CultureController::class);
// Maladies
Route::apiResource('maladies', MaladieController::class);

// Traitements
Route::apiResource('traitements', TraitementController::class);

// Applications des traitements
Route::apiResource('applications', ApplicationTraitementController::class);

// Alertes
Route::apiResource('alertes', AlerteController::class);

// Mark alert as read
Route::patch('/alertes/{id}/read', [AlerteController::class, 'markAsRead']);
