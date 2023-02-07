const item = [];

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

/* let dataformato = "{{route('formato.data')}}"; */

$(document).ready(function () {
    startDataTable({
        idTable: "tabla",
        dataSource: dataformato,
        responsive: true,
        scrollX: false,
        autoWidth: false,

        columns: [
            /* { data: "id" }, */
            { data: "usuarios.nombre_funcionario" },
            { data: "nombre_equipo" },
            { data: "fecha_mant_est" },
            { data: "fecha_retiro" },
            { data: "fecha_entrega" },
            { data: "observaciones" },
            {
                data: "firma",
                render: function (firma) {
                    if (!firma) {
                        return "N/A";
                    } else {
                        var img = firma.split("/");

                        return (
                            '<img src="./sitio/imagenes/firmas/' +
                            img +
                            '" height="70px" width="90px" />'
                        );
                    }
                },
            },

            {
                data: null,
                name: "action",
                render: function (data, type, full, meta) {
                    item[data.id] = data;
                    return (
                        /* '<button type="button" name="edit" id="'+ data.id +'" class="edit btn btn-primary btn-sm"> <i class="bi bi-pencil-square"></i>Edit</button>' */
                        "<button type='submit' id='" +
                        data.id +
                        "' class='form btn btn-primary btn-xs edit ' name='Edit'  > <i class='fa-regular fa-pen-to-square'></i></button>"
                    );
                    /* onclick='editDetail_config(this.id)' */
                },
            },
        ],
        orderCol: 1,
        orderType: "asc",
        /*  rowCallback: function (row, data, index) {}, */
    });
});

/* function editDetail_config(data) {
    console.log("prueba" + data);

    var id = item[data];
    console.log(id);
    console.log("hola");
} */

$("#create_record").click(function () {
    $(".modal-title").text("Add New Record");
    $("#action_button").val("Add");
    $("#action").val("Add");
    $("#form_result").html("");

    $("#formModal").modal("show");
});

$(document).on("click", ".edit", function (event) {
    event.preventDefault();
    var id = $(this).attr("id");
    /* alert(id); */
    $("#form_result").html("");

    $.ajax({
        url: "/formato/editar/" + id + "/",
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        dataType: "json",
        success: function (data) {
            
            $("#nombre_equipo_m").val(data.result.nombre_equipo);
            $("#fecha_mant_est_m").val(data.result.fecha_mant_est);
            $("#fecha_retiro_m").val(data.result.fecha_retiro);
            $("#fecha_entrega_m").val(data.result.fecha_entrega);
            $("#observaciones_m").val(data.result.observaciones);
            $("#hidden_id").val(id);
            $(".modal-title").text("Edit Record");
            $("#action_button").val("Update");
            $("#action").val("Edit");
            $("#formModal").modal("show");
        },
        error: function (data) {
            var errors = data.responseJSON;
            console.log(errors);
        },
    });
});

$("#sample_form").on("submit", function (event) {
    event.preventDefault();
    var action_url = "";
    if ($("#action").val() == "Edit") {
        action_url = prueba;
        // hola = $('meta[name="csrf-token"]').attr("content");
    }

    $.ajax({
        type: "post",
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        url: action_url,
        data: $(this).serialize(),
        dataType: "json",
        success: function (data) {
            var html = "";
            if (data.errors) {
                html = '<div class="alert alert-danger">';
                for (var count = 0; count < data.errors.length; count++) {
                    html += "<p>" + data.errors[count] + "</p>";
                }
                html += "</div>";
            }
            if (data.success) {
                html =
                    '<div class="alert alert-success">' +
                    data.success +
                    "</div>";
                $("#sample_form")[0].reset();
                $("#tabla").DataTable().ajax.reload();
                $("#formModal").modal('hide');


            }
            $("#form_result").html(html);
        },
        error: function (data) {
            var errors = data.responseJSON;
            console.log(errors);
        },
    });
});
