document.getElementById("guardar_mant").addEventListener('click', function(){

    let nombre_funci = $("#nombre_funcionario").val();
    let name_equi= $("#nombre_equipo").val();
    let fecha_mant_est = $("#fecha_mant_est").val();
    let fecha_entrega = $("#fecha_entrega").val();
    let fecha_retiro  = $("#fecha_retiro").val();
    let observaciones = $("#observaciones").val();

  
    if(nombre_funci === '' || name_equi === '' || observaciones === '' || fecha_mant_est === '' || fecha_entrega=== '' || fecha_retiro=== ''){
      
    }else{
      $("#modal_formato").modal("hide");
    console.log("funciono creo", nombre_funci,name_equi,fecha_mant_est,fecha_entrega,fecha_retiro,observaciones);
    }
  });