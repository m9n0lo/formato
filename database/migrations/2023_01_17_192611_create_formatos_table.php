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
    public function up()
    {
        Schema::create('formatos', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedBigInteger('usuario_id')->nullable();
            $table->string('nombre_equipo');
            $table->date('fecha_mant_est');
            $table->date('fecha_retiro');
            $table->date('fecha_entrega');
            $table->string('observaciones');
            $table->string('firma');
            $table->timestamps();
            $table->foreign('usuario_id')->references('id')->on('usuarios');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('formatos');
    }
};
