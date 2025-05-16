<?php

// database/migrations/xxxx_xx_xx_add_recruteur_id_to_entreprises_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::table('entreprises', function (Blueprint $table) {
            $table->unsignedBigInteger('recruteur_id')->nullable();
        });
    }

    public function down(): void {
        Schema::table('entreprises', function (Blueprint $table) {
            $table->dropColumn('recruteur_id');
        });
    }
};
