<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    use HasFactory;
    protected $primaryKey = 'id';
    protected $fillable = [
        'empresa',
        'nombre_funcionario',
        'area',
        
    ];

    public function formato(){
        $this->hasMany(Formato::class);
    }
}
