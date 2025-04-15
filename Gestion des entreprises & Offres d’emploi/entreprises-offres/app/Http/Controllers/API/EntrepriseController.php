<?php

// app/Http/Controllers/API/EntrepriseController.php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Entreprise;
use Illuminate\Http\Request;

class EntrepriseController extends Controller
{
    public function index()
    {
        return Entreprise::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string',
            'description' => 'nullable|string',
            'secteur' => 'nullable|string',
            'adresse' => 'nullable|string',
            'site_web' => 'nullable|url',
        ]);

        $entreprise = Entreprise::create($validated);
        return response()->json($entreprise, 201);
    }

    public function show($id)
    {
        $entreprise = Entreprise::findOrFail($id);
        return response()->json($entreprise);
    }

    public function update(Request $request, $id)
    {
        $entreprise = Entreprise::findOrFail($id);

        $entreprise->update($request->only([
            'nom', 'description', 'secteur', 'adresse', 'site_web'
        ]));

        return response()->json($entreprise);
    }

    public function destroy($id)
    {
        $entreprise = Entreprise::findOrFail($id);
        $entreprise->delete();

        return response()->json(['message' => 'Entreprise supprimée']);
    }
}
