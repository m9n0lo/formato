<!DOCTYPE html>
<html lang="en">

<head>

    {{-- Importar librerias fontawesome --}}
    <script src="https://kit.fontawesome.com/6ee38c464a.js" crossorigin="anonymous"></script>

    {{-- Importar librerias Jquery --}}
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>
    <link rel="stylesheet" href="//code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">

    {{-- Importar styles y funcionamiento del Select2 --}}
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>

    {{-- Importar sweetalert2 --}}
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>


    {{-- Importar Libreria Datatables --}}
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.13.1/css/jquery.dataTables.css">
    <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.13.1/js/jquery.dataTables.js"></script>

    {{-- Importar Styles Datatables --}}
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.2.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.1/css/dataTables.bootstrap5.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.4.0/css/responsive.bootstrap5.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.11.5/css/jquery.dataTables.min.css">

    <link rel="stylesheet" href="https://cdn.datatables.net/buttons/2.3.2/css/buttons.dataTables.min.css">
    <link rel="stylesheet" href="{{ asset('sitio/contextmenu/dist/jquery.contextMenu.min.css') }}">
    

    {{-- Importar Js Datatables --}}
    <script src="https://cdn.datatables.net/1.13.1/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.1/js/dataTables.bootstrap5.min.js"></script>
    <script src="https://cdn.datatables.net/responsive/2.4.0/js/dataTables.responsive.min.js"></script>
    <script src="https://cdn.datatables.net/responsive/2.4.0/js/responsive.bootstrap5.min.js"></script>
    <script src="https://cdn.datatables.net/select/1.5.0/js/dataTables.select.min.js"></script>

    <script src="https://cdn.datatables.net/buttons/2.3.2/js/dataTables.buttons.min.js"></script>

    <script src="{{ asset('sitio/js/globa.js') }}"></script>
    {{-- <script src="{{ asset('sitio/contextmenu/dist/jquery.contextMenu.js') }}"></script>
    <script src="{{ asset('sitio/contextmenu/dist/jquery.ui.position.min.js') }}"></script> --}}

    <title>Inicio | Formato Mantenimiento</title>
    <link rel="shortcut icon" href="{{ asset('sitio/imagenes/logo.jpg') }}">
</head>

<body>
    <div class="container-fluid">
        <div class="form-outline">
            <img src="{{ asset('sitio/imagenes/logo.jpg') }}">
            <br>
        </div>
    </div>

</body>

</html>
