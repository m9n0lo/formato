const item_row = [];
const oTable = [];
var idTable;
// var oTable[idTable];
var idEdit;
var editor;
let actual_row = "";

$(document).ready(function () {
  setTimeout(function () {
    endPreloader();
  }, 2000);

  $(document).keyup(function (e) {
    if (e.key === "Escape") {
      // escape key maps to keycode `27`
      $(".context-menu-list").trigger("contextmenu:hide");
    }
  });

  $(document).click(function (e) {
    $(".context-menu-list").trigger("contextmenu:hide");
  });
});

function getInputFields(idObject) {
  var params = idObject;

  var obj_params = params.reduce((ob, param, pindex) => {
    if ($("#" + param).is("div.jsgrid")) {
      var table_items = $("#" + param + " input.sel_chkbx:checked")
        .parents("tr")
        .toArray()
        .map((element) =>
          $(element)
            .children("td")
            .toArray()
            .filter((cell) => !$(cell).hasClass("jsgrid-control-field")),
        )
        .map((row) =>
          row.reduce((o, cell, index) => {
            var name = $("#" + param).jsGrid(
              "fisdaeldOption",
              index + 1,
              "name",
            );
            o[name] = $(cell).text();
            return o;
          }, {}),
        );

      ob[param] = table_items;

      return ob;
    } else if (
      $("#" + param).is("input") ||
      $("#" + param).is("select") ||
      $("#" + param).is("textarea")
    ) {
      ob[param] = $("#" + param).val();
      return ob;
    } else if ($("#" + param).length < 1) {
    } else {
      ob[param] = $("#" + param).text();
      return ob;
    }
  }, {});

  return obj_params;
}

function autocomplete(options) {
  var element = $("#" + options.id);
  element.select2({
    theme: "bootstrap",
    dropdownParent: $("#" + options.id + "_content"),
    minimumInputLength: options.minimum ? options.minimum : 0,
    dropdownAutoWidth: true,
    width: "auto",
    delay: 250,
    disabled: options.disabled ? options.disabled : false,
    language: {
      noResults: function (params) {
        return "No hay registros";
      },
      searching: function () {
        return "Buscando...";
      },
      inputTooShort: function () {
        if (options.tooshort) {
          return options.tooshort;
        }
      },
    },
    ajax: {
      transport: function (params, success, failure) {
        if (!success) return;
        let additional_params = {
          controlador: options.controlador,
          metodo: options.metodo,
          params: options.parametros,
        };
        let f_params = { ...params, ...additional_params };

        $.ajax({
          type: "POST",
          url: "index.php",
          data: f_params,
          dataType: "JSON",
        })
          .done(function (data) {
            success(data.detail);
            $("#" + options.id + "_content > span:nth-child(3) > span").css(
              "position",
              "absolute",
            );
          })
          .fail(function (jqXHR, textStatus) {});
      },
    },
  });

  element.on("select2:open", (event) => {
    $("#" + options.id + "_content > span:nth-child(3) > span").css(
      "position",
      "absolute",
    );
  });

  if (options.events) {
    var eventArray = options.events;
    var rend = "";

    (function () {
      for (var i = 0; i < eventArray.length; i++) {
        rend +=
          'element.on("' +
          eventArray[i].event +
          '", (event)=>{' +
          eventArray[i].action +
          ";});";
      }
      return eval(rend);
    })();
  }
}

function startSelect2(ids) {
  ids.forEach(function (element) {
    if (isObject(element)) {
      var element_id = $("#" + element.id);
      if (element.id) {
        $("#" + element.id).select2({
          theme: "bootstrap",
          dropdownParent: $("#" + element.id + "_content"),
          minimumInputLength: 0,
          dropdownAutoWidth: true,
          width: "auto",
          delay: 250,
          language: {
            noResults: function (params) {
              return "No hay registros";
            },
            searching: function () {
              return "Buscando...";
            },
          },
        });
      }

      if (Array.isArray(element.events)) {
        var eventArray = element.events;
        var rend = "";

        (function () {
          for (var i = 0; i < eventArray.length; i++) {
            rend +=
              'element_id.on("' +
              eventArray[i].event +
              '", (event)=>{' +
              eventArray[i].action +
              ";});";
          }
          return eval(rend);
        })();
      }

      setTimeout(function () {
        element_id.on("select2:open", (event) => {
          $("#" + element.id + "_content > span:nth-child(3) > span").css(
            "position",
            "absolute",
          );
        });
      }, 500);
    } else {
      $("#" + element).select2({
        theme: "bootstrap",
        dropdownParent: $("#" + element + "_content"),
        minimumInputLength: 0,
        dropdownAutoWidth: true,
        width: "auto",
        delay: 250,
        language: {
          noResults: function (params) {
            return "No hay registros";
          },
          searching: function () {
            return "Buscando...";
            $("#" + element + "_content > span:nth-child(3) > span").css(
              "position",
              "absolute",
            );
          },
        },
      });
      setTimeout(function () {
        $("#" + element).on("select2:open", (event) => {
          // debugger;
          $("#" + element + "_content > span:nth-child(3) > span").css(
            "position",
            "absolute",
          );
        });
      }, 500);
    }
  });
}

function isObject(obj) {
  return !!obj && obj.constructor === Object;
}

function reloadTable(options) {
  closeModal();
  startWait();
  if (options.ids) {
    options.ids.forEach(function (item) {
      oTable[item] = $("#" + item).DataTable();
      oTable[item].ajax.reload();
      var rows = oTable[item].rows().count();
      for (var i = rows - 1; i >= 0; i--) {
        item_row[item].splice(i, 1);
      }
    });
  } else {
    oTable[idTable].ajax.reload();
    var rows = oTable[idTable].rows().count();
    for (var i = rows - 1; i >= 0; i--) {
      item_row[idTable].splice(i, 1);
    }
  }
}

function countRowsTable() {
  return oTable[idTable].rows().count();
}

function cleanConst() {
  var rows = item_row.length;
  for (var i = rows - 1; i >= 0; i--) {
    item_row.splice(i, 1);
  }

  var rows2 = oTable.length;
  for (var i = rows2 - 1; i >= 0; i--) {
    oTable.splice(i, 1);
  }
}

// const actual_row = '';

// table tipos de egresos
function startDataTable(options) {
  cleanConst();
  idTable = options.idTable;
  item_row[idTable] = [];

  var dataSource;
  if (options.dataSource) {
    dataSource = options.dataSource;
  } else {
    dataSource = {
      url: "index.php",
      type: "POST",
      data: {
        controlador: options.controller,
        metodo: options.method,
        param: options.params,
      },
      beforeSend: function () {
        // startWait();
      },
      dataSrc: function (json) {
        endWait();
        return json.detail.data;
      },
      error: function (jqXHR, textStatus) {
        endWait();
        Swal.fire({
          title: "Error!",
          text: "Error al cargar la tabla, la consulta es demasiado grande o hay problemas de conexion",
          icon: "error",
        });
      },
    };
  }

  oTable[idTable] = $("#" + options.idTable).DataTable({
    searching: true,
    lengthMenu: [
      [4, 10, 25, -1],
      [4, 10, 25, "Todo"],
    ],
    responsive: options.responsive ? options.responsive : false,
    scrollX: options.scrollX ? options.scrollX : false,
    info: true,
    colReorder: false,
    paging: true,
    pageLength: 10,
    autoWidth: options.autoWidth ? options.autoWidth : false,
    // processing: true,
    language: {
      search: "_INPUT_",
      searchPlaceholder: "Buscar...",
      decimal: "",
      emptyTable: "No hay datos para mostrar",
      info: "Mostrando _START_ a _END_ de _TOTAL_ Registros",
      infoEmpty: "Mostrando 0 to 0 de 0 Registros",
      infoFiltered: "(Filtrado de _MAX_ total Registros)",
      infoPostFix: "",
      thousands: ",",
      lengthMenu: "Mostrar _MENU_ Registros",
      loadingRecords: "Cargando...",
      processing: "Procesando...",
      zeroRecords: "Sin resultados encontrados",
      oPaginate: {
        sFirst: "|<<",
        sLast: ">>|",
        sNext: ">>",
        sPrevious: "<<",
      },
    },
    dom: '<"float-right"l><"float-left"f>rt<"float-right"p><"float-left"i> <"d-none"B>',
    /* buttons: [
      {
        extend: "pdfHtml5",
        orientation: "landscape",
        pageSize: "LEGAL",
        title: options.titleExcel ? options.titleExcel : "Reporte en PDF",
        exportOptions: {
          columns: ":visible",
        },
      },
      "copy",
      "csv",
      {
        name: "excel",
        extend: "excel",
        sheetName: "Resultado",
        title: options.titleExcel ? options.titleExcel : "Reporte de Excel",
        exportOptions: {
          columns: ":visible",
        },
      },
      "print",
    ], */
    ordering: options.ordering ? true : options.ordering,
    order: [
      options.orderCol ? options.orderCol : 0,
      options.orderType ? options.orderType : "desc",
    ],
    ajax: dataSource,
    columns: options.columns,
    columnDefs: options.columnDefs,
    rowCallback: options.rowCallback,
  });

  if (options.inputCheck) {
    $("#" + options.idTable).on("change", "input.editor-active", function () {
      let data = {
        value: $(this).prop("checked") ? 1 : 0,
        data: oTable[idTable].rows($(this).closest("tr")).data()[0],
      };
      options.checkedFunction(data);
    });
  }

  if (options.selection) {
    $("#" + options.idTable + " tbody").on("click", "tr", function () {
      idTable = options.idTable;
      var rows = oTable[idTable].rows().count();
      if (rows > 0) {
        var data = oTable[idTable].rows(this).data()[0]["row_id"];
        actual_row = oTable[idTable].rows(this).data()[0];
        var data_row = oTable[idTable].row(this);
        if (item_row[idTable].includes(data)) {
          data_row.deselect();
          var i = 0;
          while (i < item_row[idTable].length) {
            if (item_row[idTable][i] === data) {
              item_row[idTable].splice(i, 1);
            } else {
              ++i;
            }
          }
          // console.log(JSON.stringify(item_row[idTable]));
        } else {
          data_row.select();
          item_row[idTable].push(data);
          // console.log(JSON.stringify(item_row[idTable]));
        }
      }
    });
  }
  if (options.contextMenu) {
    // Example to set items on context menu
    // contextMenu : {
    // "edit": {
    //       name: "Edit",
    //       icon: "edit",
    //       callback: function(itemKey, opt, e) {
    //           myfunction();
    //       }
    //   },
    // }
    $(function () {
      $.contextMenu({
        selector: "#" + options.idTable + " tbody tr",
        items: options.contextMenu_items,
        build: (triggerElement, e) => {
          oTable[idTable] = $("#" + idTable).DataTable();
          var rows = oTable[idTable].rows().count();
          if (rows > 0) {
            actual_row = oTable[idTable].rows(triggerElement[0]).data()[0];
            if (options.functionMenu) {
              options.functionMenu(
                triggerElement,
                oTable[idTable].rows(triggerElement[0]).data(),
              );
            }
          }
        },
        events: {
          show: function (options) {},
          hide: function (options) {},
          preShow: function (options_1) {
            // actual_row = oTable[idTable].rows(options_1.$trigger[0]).data()[0];
            // console.log(options_1);
            // if (options.functionMenu) {
            //     options.functionMenu(triggerElement, oTable[idTable].rows(triggerElement[0]).data());
            // }
          },
          activated: function (options_1) {
            idTable = options_1.selector.split(" ");
            idTable = idTable[0].substring(1, idTable[0].length);
            oTable[idTable] = $("#" + idTable).DataTable();
            var rows = oTable[idTable].rows().count();
            if (rows > 0) {
              actual_row = oTable[idTable]
                .rows(options_1.$trigger[0])
                .data()[0];
              var data = oTable[idTable].rows(options_1.$trigger[0]).data()[0][
                "row_id"
              ];
              var data_row = oTable[idTable].row(options_1.$trigger[0]);
              if (!item_row[idTable].includes(data)) {
                data_row.select();
                item_row[idTable].push(data);
                // console.log(JSON.stringify(item_row));
              }
            }
          },
        },
      });
    });
  }

  $("#select_all").button().on("click", dataTableSelectAll);

  $("#deselect_all").button().on("click", dataTableDeselectAll);
}

function modalConfirm(options) {
  if (!options.doConfirm) {
    alert("Es neceario doConfirm para usar esta función");
  } else {
    Swal.fire({
      title: options.title ? options.title : "Advertencia!",
      text: options.message ? options.message : "Mensaje de confirmación",
      icon: options.icon ? options.icon : "warning",
      showCancelButton: true,
      confirmButtonText: options.confirmButtonText
        ? options.confirmButtonText
        : "Continuar",
      cancelButtonText: options.cancelButtonText
        ? options.cancelButtonText
        : "Cancelar",
    }).then((result) => {
      if (result.value) {
        options.doConfirm ? options.doConfirm() : "";
      } else {
        options.doCancel ? options.doCancel() : "";
      }
    });
  }
}

function submitToService(options) {
  return $.ajax({
    type: "POST",
    url: "index.php",
    dataType: "JSON",
    data: {
      controlador: options.controlador,
      metodo: options.metodo,
      params: options.params ? options.params : "",
    },
    beforeSend: function () {
      startWait();
    },
    complete: function () {
      endWait();
    },
    error: function (jqXHR, textStatus) {
      endWait();
      Swal.fire({
        title: "Error!",
        text: jqXHR.responseText,
        icon: "error",
      });
    },
  })
    .done((data) => {
      if (data.success) {
        options.on_data(data.detail);
        options.alertDone =
          options.alertDone == false ? options.alertDone : true;
        if (options.alertDone) {
          Swal.fire({
            title: data.title,
            text: data.message,
            icon: data.icon,
            showConfirmButton: true,
            allowOutsideClick: options.on_done ? false : true,
            allowEscapeKey: options.on_done ? false : true,
          }).then((result) => {
            if (result.value) {
              if (data.success && options.on_done) {
                setTimeout(function () {
                  options.on_done(data.detail);
                }, 500);
              }
            }
          });
        } else {
          options.on_done(data.detail);
        }
      } else {
        Swal.fire({
          title: data.title,
          text: data.message,
          icon: data.icon,
          showConfirmButton: true,
          allowOutsideClick: options.on_done ? false : true,
          allowEscapeKey: options.on_done ? false : true,
        }).then((result) => {
          if (result.value) {
            if (options.on_error) {
              setTimeout(function () {
                options.on_error();
              }, 500);
            }
          }
        });
      }
    })
    .fail(failure);
}

function failure() {
  Swal.fire({
    title: "Error!",
    text: "Error de conexión desconocido",
    icon: "error",
  });
}

function closeMenu() {
  $("#sidebar").removeClass("active");
  $(".overlay").removeClass("active");
  $(".list-unstyled").removeClass("show");
}

function exportExcel() {
  $(".buttons-excel").click();
}

function exportPDF() {
  $(".buttons-pdf").click();
}
function exportCSV() {
  $(".buttons-csv").click();
}

function dataTableSelectAll() {
  startWait();
  setTimeout(function () {
    var p = new Promise((resolve) => resolve("done!"));
    p.then((resolve) => {
      var rows = oTable[idTable].rows().count();
      for (var i = rows - 1; i >= 0; i--) {
        var data = oTable[idTable].rows(i).data()[0]["row_id"];
        item_row[idTable][i] = data;
      }
      oTable[idTable].rows().select();
    });
    p.then((resolve) => {
      // console.log(JSON.stringify(item_row));
      endWait();
    });
  }, 100);
}

function dataTableDeselectAll() {
  startWait();
  setTimeout(function () {
    var p = new Promise((resolve) => resolve("done!"));

    p.then((resolve) => {
      var rows = oTable[idTable].rows().count();
      for (var i = rows - 1; i >= 0; i--) {
        var data = oTable[idTable].rows(i).data()[0]["row_id"];
        item_row[idTable].splice(i, 1);
      }
      oTable[idTable].rows().deselect();
    });
    p.then((resolve) => {
      // console.log(JSON.stringify(item_row));
      endWait();
    });
  }, 100);
}

function notification(title, message, type) {
  $.notify(
    {
      title: "<strong>" + title + "</strong></br>",
      message: message,
    },
    {
      animate: {
        enter: "animated bounceIn",
        exit: "animated bounceOut",
      },
      offset: {
        x: 0,
        y: 100,
      },
      type: type,
      z_index: 99999,
    },
  );
}

function startWait() {
  $("body")
    .loadingModal({ text: "Espere por favor..." })
    .loadingModal("animation", "fadingCircle")
    .loadingModal("show");
}

function endWait() {
  $("body").loadingModal("hide");
}

function destroyModal(options) {
  $(".insert_modal").dialog("close");
  if (options.id) {
    $("#" + options.id).empty();
  } else {
    $(".insert_modal").empty();
  }
}

function closeModal() {
  $(".insert_modal").dialog("close");
}

function preloader() {
  $(".context-menu-list").trigger("contextmenu:hide");
  $("body").removeClass("loaded");
  closeMenu();
}

function endPreloader() {
  $("body").addClass("loaded");
}

function modalStyle(options) {
  // Params
  // Header: Put title on header
  // Body: Text on body
  // Button_text: Set button text
  // myFunction: Execute function
  // html: Inner html code
  $(".ui-dialog-content").dialog("close");
  if (options.body) {
    textBody = options.body;
  } else {
    textBody = "";
  }
  var newElement = $(
    "<div class='insert_modal' style='overflow: visible;' id=\"data_serialized\">" +
      textBody +
      "</div>",
  );
  if (options.html) {
    newElement.empty();
    newElement.append(options.html);
  }
  var buttonsBuild;
  var widthBuild;
  if (options.myFunction) {
    buttonsBuild = {
      Ok: {
        click: function () {
          options.myFunction(options.variables);
        },
        text: options.button_text,
        class: "btn btn-primary",
      },
      Cerrar: {
        click: function () {
          if (options.cancelButton) {
            options.cancelButton();
          } else {
            destroyModal({});
          }
        },
        text: "Cerrar",
        class: "btn btn-secondary",
      },
    };
  } else {
    buttonsBuild = {
      Cerrar: {
        click: function () {
          if (options.cancelButton) {
            options.cancelButton();
          } else {
            destroyModal({});
          }
        },
        text: "Cerrar",
        class: "btn btn-secondary",
      },
    };
  }
  if (options.width) {
    widthBuild = options.width;
  } else {
    widthBuild = $(window).width() > 1100 ? 1100 : "auto";
  }
  newElement.dialog({
    resizable: false,
    title: options.header,
    opacity: 0.7,
    width: widthBuild,
    minHeight: 350,
    // maxHeight: 750,
    height: "auto",
    modal: true,
    fluid: true, //new option
    position: { my: "top+30", at: "top+30", of: window },
    buttons: buttonsBuild,
  });

  var div = document.getElementById("data_serialized_modalStyle");
  $(div)
    .find("a")
    .each(function () {
      if ($(this).hasClass("input-clearer")) {
        $(this).remove();
      }
    });
  $(div)
    .find("input")
    .each(function () {
      var readonly = $(this).attr("readonly");
      if (readonly === undefined) {
        // this is readonly
        $(this).clearer();
      }
    });
}
function IsJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function cleanVars(arrayVar) {
  Object.keys(arrayVar).forEach((key) => {
    arrayVar[key] = "";
  });
}

function cleanContentForm(options) {
  var element = $("#" + options.id);
  element.find("input, select, textarea").each(function () {
    var id = this.id;
    if (this.localName == "select") {
      if (this.classList.contains("select2-hidden-accessible")) {
        $("#" + id).select2("trigger", "select", {
          data: { id: "", text: "" },
        });
      } else {
        $(this).val("");
      }
    } else {
      $(this).val("");
    }
  });
}
