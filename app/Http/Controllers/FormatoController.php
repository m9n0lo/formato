<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Formato;
use DB;

class FormatoController extends Controller
{

    public function index(){
        $format['titulo'] = 'Inicio | Formato Mantenimiento';
        $format['formato'] = Formato::all();
    
        return view('sitios.formato', $format);
    }
    public function firma(){
        $format['titulo'] = 'Inicio | Firma';
        
    
        return view('sitios..includes.firma', $format);
    }

    public function GuardarFormato(Request $request){
        /* $file1 = request()->file('firma');
        $firma = $file1->getClientOriginalName(); */
        
           
            /* Formato::create($request->all()); */
             Formato::insert(
            [
                'nombre_funcionario'=>     $request->nombre_funcionario,
                'nombre_equipo' =>         $request->nombre_equipo,
                'fecha_mant_est'=>         date("Y-m-d H:i:s",strtotime($request->fecha_mant_est)),
                'fecha_retiro'=>           date("Y-m-d H:i:s",strtotime($request->fecha_retiro)),
                'fecha_entrega'=>          date("Y-m-d H:i:s",strtotime($request->fecha_entrega)),
                'observaciones'=>          $request->observaciones,
                'firma' =>                 2,
                'created_at' =>            date("Y-m-d H:i:s"),
                'updated_at' =>            date("Y-m-d H:i:s")

               
            ]
            ); 
            /* if($request->hasFile('imagen1')){
                $file1->move(public_path().'/sitio/imagenes/firmas/', $firma);
            } */

        

    return  redirect()->route('index')
                     ->with('mensaje','¡Formato agregado correctamente!');
    }
    
}
