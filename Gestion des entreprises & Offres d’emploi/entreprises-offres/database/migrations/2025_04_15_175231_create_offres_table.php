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
   // database/migrations/xxxx_xx_xx_create_offres_table.php
public function up()
{
    Schema::create('offres', function (Blueprint $table) {
        $table->id();
        $table->foreignId('entreprise_id')->constrained()->onDelete('cascade');
        $table->string('titre');
        $table->text('description');
        $table->string('type_contrat'); // CDI, CDD, stage...
        $table->string('localisation');
        $table->string('secteur');
        $table->timestamp('date_limite')->nullable();
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
        Schema::dropIfExists('offres');
    }
};
