<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Formato;
use App\Models\Usuario;
use DB;

class FormatoController extends Controller
{
    public function index()
    {
        $userss = Usuario::select('id', 'nombre_funcionario')->get();
        $for = Formato::all();

        return view('sitios.formato', compact('for', 'userss'));
    }

    public function firma()
    {
        $format['titulo'] = 'Inicio | Firma';

        return view('sitios.includes.firma', $format);
    }

    // Funcion que trae los datos para guardar el formato
    //SELECT area ,nombre_funcionario FROM usuarios GROUP BY area, nombre_funcionario ORDER BY area ASC ;
 /*     public function create()
    {
        $users = Usuario::select('area', 'nombre_funcionario')
            ->groupBy('area', 'nombre_funcionario')
            ->get();
        
      
    } */


    // funcion que insertar los datos obtenidos en los campos a la BD.
    public function GuardarFormato(Request $request)
    {
        $file1 = request()->file('firma');
        $firma = $file1->getClientOriginalName();

        Formato::insert([
            'usuario_id' => $request->usuario_id,
            'nombre_equipo' => $request->nombre_equipo,
            'fecha_mant_est' => date('Y-m-d H:i:s', strtotime($request->fecha_mant_est)),
            'fecha_retiro' => date('Y-m-d H:i:s', strtotime($request->fecha_retiro)),
            'fecha_entrega' => date('Y-m-d H:i:s', strtotime($request->fecha_entrega)),
            'observaciones' => $request->observaciones,
            'firma' => $firma,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);

        if ($request->hasFile('firma')) {
            $file1->move(public_path() . '/sitio/imagenes/firmas/', $firma);
        }

        return redirect()
            ->route('index')
            ->with('mensaje', '¡Formato agregado correctamente!');
    }

    // funcion que trae los datos de la BD y lo convierte a tipo JSON para mostrarlos en el datatables.
    // Consulta SQL que se utilizo
    /* SELECT nombre_funcionario, nombre_equipo,fecha_mant_est,fecha_retiro,fecha_entrega,observaciones,firma FROM formatos f JOIN usuarios u ON u.id=f.usuario_id ; */
    public function datatable()
    {
        /* $data = DB::table('formatos')
                    ->join('usuarios','formatos.usuario_id','=','usuarios.id')
                    ->select('usuarios.nombre_funcionario', 'formatos.nombre_equipo','formatos.fecha_mant_est','formatos.fecha_retiro','formatos.fecha_entrega','formatos.observaciones','formatos.firma')
                    ->get(); */
        $data = Formato::with('usuarios')->get();
        return datatables()
            ->collection(Formato::with('usuarios')->get())
            ->toJson();
    }

    public function EditFormat($id)
    {
        if (request()->ajax()) {
            $data = Formato::find($id);
            
            return response()->json(['result' => $data]);
        }
    }

    public function UpdateFormat(Request $request)
    {
        /*  $rules = [
            'fecha_mant_est_m' => 'required',
            'fecha_retiro_m' => 'required',
            'fecha_entrega_m' => 'required',
            'observaciones_m' => 'required',
        ];

        $error = Validator::make($request->all(), $rules);

        if ($error->fails()) {
            return response()->json(['errors' => $error->errors()->all()]);
        } */

        $form_data = [

            'nombre_equipo' => $request->nombre_equipo_m,
            'fecha_mant_est' => date('Y-m-d H:i:s', strtotime($request->fecha_mant_est_m)),
            'fecha_retiro' => date('Y-m-d H:i:s', strtotime($request->fecha_retiro_m)),
            'fecha_entrega' => date('Y-m-d H:i:s', strtotime($request->fecha_entrega_m)),
            'observaciones' => $request->observaciones_m,
        ];
        
        
        Formato::whereId($request->hidden_id)->update($form_data);
        /* return $form_data; */
        return response()->json(['success' => 'Formato actualizado correctamente!!']);
    }
}
