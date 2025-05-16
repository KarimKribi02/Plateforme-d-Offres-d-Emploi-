<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\EntrepriseController;
use App\Http\Controllers\API\OffreController;

Route::apiResource('entreprises', EntrepriseController::class);
Route::apiResource('offres', OffreController::class);

// Route::middleware('verify.jwt')->group(function () {
//     Route::post('/entreprises', [EntrepriseController::class, 'store']);
//     // autres routes sécurisées
// });
