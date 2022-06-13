//almacenar el id del registro modificado
var rol_Id = 0;

//click que abre el modal de crear
function ShowModalEditRol(id) {

    //cambiar el valor de emp_Id
    rol_Id = id;
    //llamar la funció que recupera el detalle
    GetRolDetail(rol_Id);

    //mostrar el modal
    $('#EditarRol').modal('show');

}

//click que confirma la creación de un area
$("#EditarRol #EditarRolConfirmar").click(function () {

    //crear el objeto con los valores seleccionados 
    var data = [
        { name: "rol_Description", value: $("#EditarRol #rol_Description").val() },
        { name: "rol_IdUserCreate", value: TempUserDefault },
        { name: "rol_IdUserModified", value: TempUserDefault },
    ];

    //Insertar la persona
    $.ajax({
        type: "PUT",
        url: BaseUrl + "/Rol/Edit?Id=" + rol_Id,
        data: data,
        //contentType: "application/json; charset=utf-8",
        /*dataType: "json",*/
    }).done(function (data) {

        location.reload();

    }).fail(function () {
        //mostrar alerta en caso de error
        console.log("Error al editar el empleado");
    });

    //ocultar el modal
    $('#EditarRol').modal('hide');

});


//funcion para obtener la información del empleado
function GetRolDetail(id) {
    $.ajax({
        type: "GET",
        url: BaseUrl + "/Rol/RolDetail/" + id,
    }).done(function (data) {
        $("#EditarRol #rol_Description").val(data.data.rol_Description);

    }).fail(function () {
        //mostrar alerta en caso de error
        console.log("Error al recuperar la información del empleado");
    });
}