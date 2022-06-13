//almacenar el id del empleado modificado
var usu_Id = 0;

//click que abre el modal de crear
function ShowModalEditUsers(id) {

    //cambiar el valor de emp_Id
    usu_Id = id;
    //llamar la funció que recupera el detalle
    GetPersonasDetail(id);

    //mostrar el modal
    $('#EditarUsers').modal('show');

}

//click que confirma la creación de una persona
$("#EditarUsers #EditarUsersConfirmar").click(function () {

    //crear el objeto con los valores seleccionados 
    var data = [
        { name: "usu_UserName", value: $("#EditarUsers #usu_UserName").val() },
       // { name: "usu_Password", value: $("#EditarUsers #usu_Password").val() },
        {  name: "rol_Id", value: $("#EditarUsers #DropDownRoles").val() },
        { name: "per_Id", value: $("#EditarUsers #DropDownPersonas").val() },

        { name: "usu_IdUserCreate", value: TempUserDefault },
        { name: "usu_IdUserModified", value: TempUserDefault },
    ];

    //Insertar la persona
    $.ajax({
        type: "PUT",
        url: BaseUrl + "/User/Edit?Id=" + usu_Id,
        data: data,
        //contentType: "application/json; charset=utf-8",
        /*dataType: "json",*/
    }).done(function (data) {

        location.reload();

    }).fail(function () {
        //mostrar alerta en caso de error
        console.log("Error al editar el Sub Categoria");
    });

    //ocultar el modal
    $('#EditarUsers').modal('hide');

});


//funcion para obtener la información 
function GetPersonasDetail(id) {
    $.ajax({
        type: "GET",
        url: BaseUrl + "/User/Edit/" + id,
    }).done(function (data) {

        $("#EditarUsers #usu_UserName").val(data.data.usu_UserName);
       // $("#EditarUsers #usu_Password").val(data.data.usu_Password);
        GetRolesList(data.data.rol_Id);
        GetPersonasList(data.data.per_Id);
       

    }).fail(function () {
        //mostrar alerta en caso de error
        console.log("Error al recuperar la información");
    });
}

//funciones para obtener los listados
function GetRolesList(id) {
    $.ajax({
        type: "GET",
        url: BaseUrl + "/Rol/RolList",
    }).done(function (data) {

        //Vaciar el dropdownlist
        $("#EditarUsers #DropDownRoles").empty();
        //variable que almacena las opciones
        var NewOption = `<option value="0" disabled=""> Por favor seleccione una opción... </option>`;

        data.data.forEach(function (item, index, array) {

            NewOption += `<option value="${item.rol_Id}"> ${item.rol_Description} </option>`;

        });

        //Agregar las opciones al dropdownlist
        $("#EditarUsers #DropDownRoles").append(NewOption);

    }).fail(function () {
        //mostrar alerta en caso de error
        console.log("Error al cargar las personas");
    });
}

function GetPersonasList(id) {
    $.ajax({
        type: "GET",
        url: BaseUrl + "/Persons/PersonsList",
    }).done(function (data) {

        //Vaciar el dropdownlist
        $("#EditarUsers #DropDownPersonas").empty();
        //variable que almacena las opciones
        var NewOption = `<option value="0" disabled=""> Por favor seleccione una opción... </option>`;

        data.data.forEach(function (item, index, array) {

            NewOption += `<option value="${item.per_Id}"> ${item.per_Firstname} ${item.per_LastNames} </option>`;

        });

        //Agregar las opciones al dropdownlist
        $("#EditarUsers #DropDownPersonas").append(NewOption);

    }).fail(function () {
        //mostrar alerta en caso de error
        console.log("Error al cargar las personas");
    });
}

