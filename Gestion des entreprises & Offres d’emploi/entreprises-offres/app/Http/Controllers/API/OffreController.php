<?php

// app/Http/Controllers/API/OffreController.php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Offre;
use Illuminate\Http\Request;

class OffreController extends Controller
{
    public function index(Request $request)
    {
        // Recherche par filtres
        $query = Offre::query();

        if ($request->has('secteur')) {
            $query->where('secteur', 'like', '%' . $request->secteur . '%');
        }
        if ($request->has('type_contrat')) {
            $query->where('type_contrat', $request->type_contrat);
        }
        if ($request->has('localisation')) {
            $query->where('localisation', 'like', '%' . $request->localisation . '%');
        }
        if ($request->has('motcle')) {
            $query->where('titre', 'like', '%' . $request->motcle . '%');
        }

        return $query->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'entreprise_id' => 'required|exists:entreprises,id',
            'titre' => 'required|string',
            'description' => 'required|string',
            'type_contrat' => 'required|string',
            'localisation' => 'required|string',
            'secteur' => 'required|string',
            'date_limite' => 'nullable|date',
        ]);

        $offre = Offre::create($validated);
        return response()->json($offre, 201);
    }

    public function show($id)
    {
        $offre = Offre::findOrFail($id);
        return response()->json($offre);
    }

    public function update(Request $request, $id)
    {
        $offre = Offre::findOrFail($id);

        $offre->update($request->only([
            'titre', 'description', 'type_contrat', 'localisation', 'secteur', 'date_limite'
        ]));

        return response()->json($offre);
    }

    public function destroy($id)
    {
        $offre = Offre::findOrFail($id);
        $offre->delete();

        return response()->json(['message' => 'Offre supprimée']);
    }
}
