function buscar() {
    var filtro = $("#buscar").val().toUpperCase();

    $("#tabla td").each(function () {
        var textoEnTd = $(this).text().toUpperCase();
        if (textoEnTd.indexOf(filtro) >= 0) {
            $(this).addClass("existe");
        } else {
            $(this).removeClass("existe");
        }
    });

    $("#tabla tbody tr").each(function () {
        if ($(this).children(".existe").length > 0) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
}

jQuery(document).ready(function ($) {
    $("#usuario_id").select2({
        closeOnSelect: true,
    });
});

/* VALIDACION DE QUE TODOS LOS CAMPOS ESTEN LLENOS Y ARROJA EL MENSAJE DE GUARDADO */
document.getElementById("guardar_mant").addEventListener("click", function () {
    let nombre_funci = $("#usuario_id").val();
    let name_equi = $("#nombre_equipo").val();
    let fecha_mant_est = $("#fecha_mant_est").val();
    let fecha_entrega = $("#fecha_entrega").val();
    let fecha_retiro = $("#fecha_retiro").val();
    let observaciones = $("#observaciones").val();
    let firma = $("#filer_input2").val();

    if (
        nombre_funci === "" ||
        name_equi === "" ||
        observaciones === "" ||
        fecha_mant_est === "" ||
        fecha_entrega === "" ||
        fecha_retiro === "" ||
        firma === ""
    ) {
    } else {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Guardado Exitosamente!",
            showConfirmButton: false,
            timer: 1500,
        });
    }
});

$("#tabla").DataTable({
    responsive: true,
    autowidth: false,
    language: {
        lengthMenu:
            "Mostrar " +
            '<select class= "form-control"> <option Value="10">10</option> <option Value="20">20</option> <option Value="-1">Todos</option> </select>' +
            " registros por pagina",
        zeroRecords: "No se encuentra registros",
        info: "Mostrando la pagina _PAGE_ de _PAGES_",
        infoEmpty: "No hay registros disponibles",
        infoFiltered: "(Filtrado de _MAX_ registros totales)",
        search: "Buscar:",
        paginate: {
            next: "Siguiente",
            previous: "Anterior",
        },
    },
    
});
