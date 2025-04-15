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
    Schema::create('entreprises', function (Blueprint $table) {
        $table->id();
        $table->string('nom');
        $table->text('description')->nullable();
        $table->string('secteur')->nullable();
        $table->string('adresse')->nullable();
        $table->string('site_web')->nullable();
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
