//click que abre el modal de crear
$("#AbrirModalCrearRol").click(function () {

    //mostrar el modal
    $('#CrearRol').modal('show');

    //$('#CrearEmpleado').modal('hide');

});

$("#CerrarModalCreate").click(function () {

    //mostrar el modal
    $('#CrearRol').modal('hide');

    //$('#CrearEmpleado').modal('hide');

});

$("#CerrarModalEdit").click(function () {

    //mostrar el modal
    $('#EditarRol').modal('hide');

    //$('#CrearEmpleado').modal('hide');

});

//click que confirma la creación del registro
$("#CrearRol #CrearRolConfirmar").click(function () {

    //crear el objeto con los valores seleccionados 
    var data = [
        { name: "rol_Description", value: $("#CrearRol #rol_Description").val() },
        { name: "rol_IdUserCreate", value: TempUserDefault },
        { name: "dep_IdUserModified", value: null },
    ];
    //Insertar el dato
    $.ajax({
        type: "POST",
        url: BaseUrl + "/Rol/Create",
        data: data,
        //contentType: "application/json; charset=utf-8",
        /*dataType: "json",*/
    }).done(function (data) {

        location.reload();

    }).fail(function () {
        //mostrar alerta en caso de error

    });

    //ocultar el modal
    $('#CrearRol').modal('hide');

});