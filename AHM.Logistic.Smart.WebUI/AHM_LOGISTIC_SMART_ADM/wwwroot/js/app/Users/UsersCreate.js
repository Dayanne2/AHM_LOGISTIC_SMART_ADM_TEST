
//click que abre el modal de crear
$("#AbrirModalCrearUsers").click(function () {


    GetPersonListCreate();
    GetRol2ListCreate();
    

    //mostrar el modal
    $('#CrearUsers').modal('show');

    //$('#CrearSubCate').modal('hide');

});

$("#CerrarModal").click(function () {


    GetPersonListCreate();
    GetRol2ListCreate();


    //mostrar el modal
    $('#CrearUsers').modal('hide');

    //$('#CrearSubCate').modal('hide');

});

$("#CerrarModalEditar").click(function () {


    GetPersonListCreate();
    GetRol2ListCreate();


    //mostrar el modal
    $('#EditarUsers').modal('hide');

    //$('#CrearSubCate').modal('hide');

});

//click que confirma la creación de una persona
$("#CrearUsers #CrearUsersConfirmar").click(function (e) {

    //crear el objeto con los valores seleccionados 
    e.preventDefault();
    e.stopImmediatePropagation();
    var data = [
        { name: "usu_UserName", value: $("#CrearUsers #usu_UserName").val() },
        { name: "usu_Password", value: $("#CrearSubCate #usu_Password").val() },

        { name: "rol_Id", value: $("#CrearUsers #DropDownPersonas").val() },
        { name: "per_Id", value: $("#CrearUsers #DropDownRoles").val() },
        { name: "usu_IdUserCreate", value: TempUserDefault },
        { name: "usu_IdUserModified", value: null },
    ];

    //Insertar la persona
    $.ajax({
        type: "POST",
        url: BaseUrl + "/User/Create",
        data: data,
        //contentType: "application/json; charset=utf-8",
        /*dataType: "json",*/
    }).done(function (data) {

        location.reload();

    }).fail(function () {
        //mostrar alerta en caso de error

    });

    //ocultar el modal
    $('#CrearUsers').modal('hide');

});



//funciones para obtener los listados
function GetPersonListCreate() {
    $.ajax({
        type: "GET",
        url: BaseUrl + "/Persons/PersonsList",
    }).done(function (data) {
        //Vaciar el dropdownlist
        $("#CrearUsers #DropDownPersonas").empty();
        //variable que almacena las opciones
        var NewOption = `<option value="0" disabled=""> Por favor seleccione una opción... </option>`;

        data.data.forEach(function (item, index, array) {
            NewOption += `<option value="${item.per_Id}"> ${item.per_Firstname} ${item.per_LastNames} </option>`;
        });

        //Agregar las opciones al dropdownlist
        $("#CrearUsers #DropDownPersonas").append(NewOption);

    }).fail(function () {
        //mostrar alerta en caso de error
        console.log("Error al cargar las personas");
    });
}

function GetRol2ListCreate() {
    $.ajax({
        type: "GET",
        url: BaseUrl + "/Rol/RolList",
    }).done(function (data) {
        //Vaciar el dropdownlist
        $("#CrearUsers #DropDownRoles").empty();
        //variable que almacena las opciones
        var NewOption = `<option value="0" disabled=""> Por favor seleccione una opción... </option>`;

        data.data.forEach(function (item, index, array) {
            NewOption += `<option value="${item.rol_Id}"> ${item.rol_Description} </option>`;
        });

        //Agregar las opciones al dropdownlist
        $("#CrearUsers #DropDownRoles").append(NewOption);

    }).fail(function () {
        //mostrar alerta en caso de error
        console.log("Error al cargar las rol");
    });
}

