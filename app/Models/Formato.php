<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Formato extends Model
{
    use HasFactory;
    protected $primaryKey = 'id';
    protected $fillable = [
        'nombre_funcionario', 
        'nombre_equipo',
        'fecha_mant_est',
        'fecha_retiro',
        'fecha_entrega',
        'observaciones',
        'firma'
    ];
    
}
