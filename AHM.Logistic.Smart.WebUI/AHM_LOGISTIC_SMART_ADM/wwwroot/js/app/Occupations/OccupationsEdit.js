
//almacenar el id del registro modificado
var occ_Id = 0;

//click que abre el modal de crear
function ShowModalEditOccupation(id) {

    //cambiar el valor de emp_Id
    occ_Id = id;
    //llamar la funció que recupera el detalle
    GetOccupationDetail(id);

    //mostrar el modal
    $('#EditarOccupation').modal('show');

}


//click que confirma la creación de un Occupation
$("#EditarOccupation #EditarOccupationConfirmar").click(function () {

    //crear el objeto con los valores seleccionados 
    var data = [
        { name: "occ_Description", value: $("#EditarOccupation #occ_Description").val() },

        { name: "occ_IdUserCreate", value: TempUserDefault },
        { name: "occ_IdUserModifies", value: TempUserDefault },

    ];

    //Insertar la persona
    $.ajax({
        type: "PUT",
        url: BaseUrl + "/Occupation/Edit?Id=" + occ_Id,
        data: data,
        //contentType: "application/json; charset=utf-8",
        /*dataType: "json",*/
    }).done(function (data) {

        location.reload();

    }).fail(function () {
        //mostrar alerta en caso de error
        console.log("Error al editar la ocupación");
    });

    //ocultar el modal
    $('#EditarOccupation').modal('hide');

});


//funcion para obtener la información del empleado
function GetOccupationDetail(id) {
    $.ajax({
        type: "GET",
        url: BaseUrl + "/Occupation/Edit/" + id,
    }).done(function (data) {
        $("#EditarOccupation #occ_Description").val(data.data.occ_Description);

    }).fail(function () {
        //mostrar alerta en caso de error
        console.log("Error al recuperar la información de la ocupación");
    });
}