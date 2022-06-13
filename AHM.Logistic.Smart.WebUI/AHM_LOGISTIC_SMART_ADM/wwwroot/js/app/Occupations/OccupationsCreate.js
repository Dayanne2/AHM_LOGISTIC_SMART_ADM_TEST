
//click que abre el modal de crear
$("#AbrirModalCrear").click(function () {

    //mostrar el modal
    $('#CrearOcupaciones').modal('show');

    //$('#CrearEmpleado').modal('hide');

});

$("#Closeocupationscreate").click(function () {

    //mostrar el modal
    $('#CrearOcupaciones').modal('hide');

    //$('#CrearEmpleado').modal('hide');

});

$("#Closeocupationsedit").click(function () {

    //mostrar el modal
    $('#EditarOccupation').modal('hide');

    //$('#CrearEmpleado').modal('hide');

});


//click que confirma la creación del registro
$("#CrearOcupaciones #CrearOcupacionesConfirmar").click(function () {

    //crear el objeto con los valores seleccionados 
    var data = [
        { name: "occ_Description", value: $("#CrearOcupaciones #occ_Description").val() },
        { name: "occ_IdUserCreate", value: TempUserDefault },
        { name: "occ_IdUserModifies", value: null },
    ];
    //Insertar el dato
    $.ajax({
        type: "POST",
        url: BaseUrl + "/Occupation/Create",
        data: data,
        //contentType: "application/json; charset=utf-8",
        /*dataType: "json",*/
    }).done(function (data) {

        location.reload();

    }).fail(function () {
        //mostrar alerta en caso de error

    });

    //ocultar el modal
    $('#CrearOcupaciones').modal('hide');

});