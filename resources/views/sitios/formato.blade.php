<!DOCTYPE html>
<html lang="en">

<head>
    @include('sweetalert::alert')
    @include('sitios.includes.header')
</head>

<body>
    <div class="container-fluid" style="flex-wrap: wrap; display: flexbox">
        <form method="POST" action="{{ route('formato.insertar') }}">
            @csrf
            <div class="row">
                <div class="col">
                    <!-- Name input -->
                    <div class="form-outline">
                        <label class="form-label">Nombre Funcionario</label>
                        <input type="text" name="nombre_funcionario" id="nombre_funcionario" class="form-control"
                            required />

                    </div>
                </div>

                <div class="col">
                    <!-- Email input -->
                    <div class="form-outline">
                        <label class="form-label">Nombre Equipo</label>
                        <input type="text" name="nombre_equipo" id="nombre_equipo" class="form-control" required />

                    </div>
                </div>
                <div class="col">
                    <!-- Email input -->
                    <div class="form-outline">
                        <label class="form-label">Fecha Mantenimiento Estipulada</label>
                        <input type="datetime" name="fecha_mant_est" class="form-control" id="fecha_mant_est"
                            required />

                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <!-- Name input -->
                    <div class="form-outline">
                        <label class="form-label">Fecha Retiro</label>
                        <input type="datetime" name="fecha_retiro"class="form-control" id="fecha_retiro" required />

                    </div>
                </div>
                <div class="col">
                    <!-- Name input -->
                    <div class="form-outline">
                        <label class="form-label">Fecha Entrega</label>
                        <input type="datetime" name="fecha_entrega" class="form-control" id="fecha_entrega" required />

                    </div>
                </div>
                <div class="col">
                    <!-- Email input -->
                    <div class="form-outline">
                        <label class="form-label">Observaciones</label>

                        <input type="text" name="observaciones" id="observaciones" class="form-control" required />

                    </div>
                </div>
                {{-- <button type="submit" >prueba</button> --}}
                <div class="col">

                    <div class="form-outline">
                        <label class="form-label">Firmar a continuación:</label>
                        <img src="" alt="Firma del usuario" id="firma">
                        {{-- <canvas id="draw-canvas" width="400" height="90">
                            No tienes un buen navegador.
                        </canvas> --}}
                    </div>
                </div>
            </div>
            <br>
            <div class="col">
                <div class="form-outline">
                    <button target="ventanaSecundaria" class="btn btn-success" id="ventana1" onclick="ventanaSecundaria('{{ route('firma') }}')">Agregar Firma</button>
                    <input type="submit" class="btn btn-success" value="Agregar" id="guardar_mant">

                    <script> 
                        function ventanaSecundaria (URL){ 
                           window.open(URL,"ventana1","width=400,height=200,scrollbars=NO") 
                        } 
                        </script>
                </div>
            </div>
        </form>
    </div>

    <br>
    <br>
    <div class="container">

        <table id="example" class="table table-striped" style="width:100%">
            <thead>
                <tr>

                    <th>Nombre Funcionario</th>
                    <th>Nombre Equipo</th>
                    <th>Fecha Mantenimiento</th>
                    <th>Fecha Retiro</th>
                    <th>Fecha Entrega</th>
                    <th>Observaciones</th>
                    <th>Firma</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($formato as $f)
                    <tr>
                        <td>{{ $f->nombre_funcionario }}</td>
                        <td>{{ $f->nombre_equipo }}</td>
                        <td>{{ $f->fecha_mant_est }}</td>
                        <td>{{ $f->fecha_retiro }}</td>
                        <td>{{ $f->fecha_entrega }}</td>
                        <td>{{ $f->observaciones }}</td>
                        <td>{{ $f->firma }}</td>

                    </tr>
                @endforeach

            </tbody>
        </table>
    </div>


</body>

@include('sitios.includes.footer')



</html>
