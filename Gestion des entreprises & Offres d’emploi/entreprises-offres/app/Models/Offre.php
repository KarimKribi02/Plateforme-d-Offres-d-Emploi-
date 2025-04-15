<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

// app/Models/Offre.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Offre extends Model
{
    use HasFactory;

    protected $fillable = [
        'entreprise_id',
        'titre',
        'description',
        'type_contrat',
        'localisation',
        'secteur',
        'date_limite',
    ];

    public function entreprise()
    {
        return $this->belongsTo(Entreprise::class);
    }
}

