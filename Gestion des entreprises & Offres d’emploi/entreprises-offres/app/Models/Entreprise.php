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

    protected $fillable = [
        'nom',
        'description',
        'secteur',
        'adresse',
        'site_web',
        'recruteur_id'
    ];
    

    public function offres()
    {
        return $this->hasMany(Offre::class);
    }
    public function recruteur() {
        return $this->belongsTo(User::class, 'recruteur_id');
    }
    
    
}

