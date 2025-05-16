<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

// app/Models/Entreprise.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Entreprise extends Model
{
    use HasFactory;

   // Dans le modèle Entreprise.php
protected $fillable = [
    'nom',
    'description',
    'secteur',
    'adresse',
    'site_web',
    'recruteur_id' // S'assurer que ce champ est inclus
];

    public function offres()
    {
        return $this->hasMany(Offre::class);
    }
   
    
}

