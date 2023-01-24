<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\Formato;
use App\Models\Usuario;
use DB;


class FormatoController extends Controller
{

    public function index(){
       /*  $format['titulo'] = 'Inicio | Formato Mantenimiento';
        $format['usuarios'] = Formato::with('usuarios')->get();
        $format['formato'] = Formato::all();

    
        return view('sitios.formato', $format); */
        $userss = Usuario::select('id','nombre_funcionario')->get();
        //$formatos = Formato::with('usuarios')->get();
        $for = Formato::all();
        return view ('sitios.formato', compact('for','userss'));
    }

    public function firma(){
        $format['titulo'] = 'Inicio | Firma';

        return view('sitios.includes.firma', $format);
    }

    // Funcion que trae los datos para guardar el formato
    public function create(){
        $users = Usuario::select('area','nombre_funcionario')->groupBy('area','nombre_funcionario')->get();

       /*  return response()->json(
            array('success'=>true,
                'users'=>$users,
            ), 200); */
        return view('sitios.includes.prueba',compact('users'));
    }

    public function GuardarFormato(Request $request){

        $file1 = request()->file('firma');
        $firma = $file1->getClientOriginalName(); 
        
             Formato::insert(
            [
                'usuario_id'=>             $request->usuario_id,
                'nombre_equipo' =>         $request->nombre_equipo,
                'fecha_mant_est'=>         date("Y-m-d H:i:s",strtotime($request->fecha_mant_est)),
                'fecha_retiro'=>           date("Y-m-d H:i:s",strtotime($request->fecha_retiro)),
                'fecha_entrega'=>          date("Y-m-d H:i:s",strtotime($request->fecha_entrega)),
                'observaciones'=>          $request->observaciones,
                'firma' =>                 $firma,
                'created_at' =>            date("Y-m-d H:i:s"),
                'updated_at' =>            date("Y-m-d H:i:s")

               
            ]
            );
           

            if($request->hasFile('firma')){
                $file1->move(public_path().'/sitio/imagenes/firmas/', $firma);
            }


    return  redirect()->route('index')
                     ->with('mensaje','¡Formato agregado correctamente!');
                     
    }
    
   /*  public function datatable(){
        $data = Formato::all();
        return datatables()->collection(Formato::all())->toJson();

    } */
}
