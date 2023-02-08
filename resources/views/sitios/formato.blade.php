<!DOCTYPE html>
<meta name="csrf-token" content="{{ csrf_token() }}" />
<html lang="en">

<head>

    @include('sitios.includes.header')
</head>

<body>

    <div class="card">
        <div class="card-body">
            <div class="card-title">
                <div class="row titulo title-background"><span>Formato Mantenimiento</span></div>
            </div>
            <form method="POST" action="{{ route('formato.insertar') }}" enctype="multipart/form-data"
                class="form-floating">
                @csrf
                <div class="row">


                    <div class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-3">
                        <!-- Name input -->
                        <div class="form-floating">
                            <select class="js-example-basic-single" class="form-control" name="usuario_id"
                                id="usuario_id" required>
                                <option value="" disabled selected>-- Seleccione un Funcionario--</option>
                                @foreach ($userss as $us)
                                    <option value="{{ $us->id }}">{{ $us->nombre_funcionario }}</option>
                                @endforeach
                            </select>

                        </div>
                    </div>

                    <div class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-3">
                        <!-- Email input -->
                        <div class="form-floating">
                            <input type="text" name="nombre_equipo" id="nombre_equipo" class="form-control"
                                required />
                            <label for="floatingInput">Nombre Equipo</label>
                        </div>
                    </div>

                    <div class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-3">
                        <!-- Email input -->
                        <div class="form-floating">
                            <input type="datetime" name="fecha_mant_est" class="form-control" id="fecha_mant_est"
                                required />
                            <label for="floatingInput">Fecha Mantenimiento Estipulada</label>
                        </div>
                    </div>

                    <div class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-3">
                        <!-- Name input -->
                        <div class="form-floating">
                            <input type="datetime" name="fecha_retiro" class="form-control" id="fecha_retiro"
                                required />
                            <label for="floatingInput">Fecha Retiro</label>
                        </div>
                    </div>

                    <div class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-3">
                        <!-- Name input -->
                        <div class="form-floating">
                            <input type="datetime" name="fecha_entrega" class="form-control" id="fecha_entrega"
                                required />
                            <label for="floatingInput">Fecha Entrega</label>
                        </div>
                    </div>

                    <div class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-3">
                        <!-- Email input -->
                        <div class="form-floating">
                            <input type="text" name="observaciones" id="observaciones" class="form-control"
                                required />
                            <label for="floatingInput">Observaciones</label>
                        </div>

                    </div>
                    {{-- <button type="submit" >prueba</button> --}}
                    <div class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-4 mt-3">
                        <div class="input-group">
                            <span class="input-group-text">Firmar a continuación:</span>
                            <div class="form-control Neon Neon-theme-dragdropbox">
                                <div class="Neon-input-dragDrop">
                                    <input name="firma" id="filer_input2" class="form-control" type="file"
                                        accept="image/jpeg,image/png" required>

                                    <div class="Neon-input-inner">
                                        <div class="Neon-input-icon"><i class="fa fa-file-image-o"></i></div>
                                        <div class="Neon-input-text">
                                            <h3>Seleccione la firma</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12" align="center">

                        <button target="ventanaSecundaria" class="btn btn-success" id="ventana1"
                            onclick="ventanaSecundaria('{{ route('firma') }}')">Agregar Firma</button>
                        <input type="submit" class="btn btn-success" value="Agregar" id="guardar_mant">

                        <script>
                            function ventanaSecundaria(URL) {
                                window.open(URL, "ventana1", "width=500,height=250,scrollbars=NO")
                            }
                        </script>
                    </div>
                </div>

            </form>
            <br>
            <div class="row">

                <table id="tabla" class="table table-striped" style="width:100%" data-sort="table">
                    <thead>
                        <tr>

                            {{--  <th>id</th> --}}
                            <th>Nombre Funcionario</th>
                            <th>Nombre Equipo</th>
                            <th>Fecha Mantenimiento</th>
                            <th>Fecha Retiro</th>
                            <th>Fecha Entrega</th>
                            <th>Observaciones</th>
                            <th>Firma</th>
                            <th>Acciones</th>

                        </tr>
                    </thead>

                    {{--  <tbody>
                        @foreach ($for as $f)
                            <tr>
                                <td>{{ $f->usuarios->nombre_funcionario }}</td>
                                <td>{{ $f->nombre_equipo }}</td>
                                <td>{{ $f->fecha_mant_est }}</td>
                                <td>{{ $f->fecha_retiro }}</td>
                                <td>{{ $f->fecha_entrega }}</td>
                                <td>{{ $f->observaciones }}</td>
                                <td><img src="{{asset('sitio/imagenes/firmas/'.$f->firma)}}"  height="80" width="90" alt="">
        
                            </tr>
                        @endforeach
        
                    </tbody> --}}
                    <script>
                        let dataformato = "{{ route('formato.data') }}";
                        let prueba = "{{ route('formato.update') }}";
                        
                    </script>

                </table>
            </div>
        </div>

        <div class="modal fade" id="formModal" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <form method="post" id="sample_form" class="form-horizontal">
                        <div class="modal-header">
                            <h5 class="modal-title" id="ModalLabel">Add New Record</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <span id="form_result"></span>
                            
                            <div class="form-group">
                                <label>Nombre Equipo: </label>
                                <input type="text" name="nombre_equipo_m" id="nombre_equipo_m" class="form-control" />
                            </div>
                            <div class="form-group">
                                <label>Fecha Mantenimiento Estipulada : </label>
                                <input type="date" name="fecha_mant_est_m" id="fecha_mant_est_m" class="form-control" />
                            </div>
                            <div class="form-group">
                                <label>Fecha Retiro : </label>
                                <input type="date" name="fecha_retiro_m" id="fecha_retiro_m" class="form-control" />
                            </div>
                            <div class="form-group editpass">
                                <label>Fecha Entrega: </label>
                                <input type="date" name="fecha_entrega_m" id="fecha_entrega_m" class="form-control" />
                            </div>
                            <div class="form-group editpass">
                                <label>Observaciones: </label>
                                <input type="textarea" name="observaciones_m" id="observaciones_m" class="form-control" />
                            </div>
                            <input type="hidden" name="action" id="action" value="Add" />
                            <input type="hidden" name="hidden_id" id="hidden_id" />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <input type="submit" name="action_button" id="action_button" value="Add"
                                class="btn btn-info" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>


</body>
<footer>
    @include('sitios.includes.footer')

</footer>

</html>
