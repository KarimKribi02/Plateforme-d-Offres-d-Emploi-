<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
   // database/migrations/xxxx_xx_xx_create_entreprises_table.php
public function up()
{
    // Dans la migration pour créer la table entreprises
Schema::create('entreprises', function (Blueprint $table) {
    $table->id();
    $table->string('nom');
    $table->text('description');
    $table->string('secteur');
    $table->string('adresse');
    $table->string('site_web')->nullable();
    $table->string('recruteur_id'); // Colonne simple de type string, sans contrainte de clé étrangère
    $table->timestamps();
});
}


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('entreprises');
    }
};
