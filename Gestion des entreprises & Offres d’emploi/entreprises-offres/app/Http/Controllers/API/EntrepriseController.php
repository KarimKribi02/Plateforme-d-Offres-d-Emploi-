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
    $validatedData = $request->validate([
        'nom' => 'required|string|max:255',
        'description' => 'required|string',
        'secteur' => 'required|string',
        'adresse' => 'required|string',
        'site_web' => 'nullable|url',
        'recruteur_id' => 'required|string', // On garde ce champ mais sans vérifier son existence
    ]);

    // Créer l'entreprise sans vérifier l'existence du recruteur
    $entreprise = Entreprise::create($validatedData);

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
