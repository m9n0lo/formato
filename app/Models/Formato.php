<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Formato extends Model
{
    use HasFactory;
    protected $primaryKey = 'id';
    protected $fillable = [
        'usuario_id', 
        'nombre_equipo',
        'fecha_mant_est',
        'fecha_retiro',
        'fecha_entrega',
        'observaciones',
        'firma'
    ];

    public function usuarios(){
        return $this->belongsTo(Usuario::class,'usuario_id');
      }

    
}
