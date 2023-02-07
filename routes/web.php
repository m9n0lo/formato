<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FormatoController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [FormatoController::class, 'index'])->name('index');

Route::get('/firma', [FormatoController::class, 'firma'])->name('firma');

Route::post('/formato/crear', [FormatoController::class, 'GuardarFormato'])->name('formato.insertar');

route::get('/formato/prueba', [FormatoController::class, 'create'])->name('formato.listar');

route::get('/formato/datatable', [FormatoController::class, 'datatable'])->name('formato.data');

route::get('/formato/editar/{id}/', [FormatoController::class, 'EditFormat']);

route::post('/formato/update', [FormatoController::class, 'UpdateFormat'])->name('formato.update');
