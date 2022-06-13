
//almacenar el id del registro modificado
var cont_Id = 0;

//click que abre el modal de crear
function ShowModalEditContacts(id) {

    //cambiar el valor de emp_Id
    cont_Id = id;
    //llamar la funció que recupera el detalle
    GetContactsDetail(id);

    //mostrar el modal
    $('#EditarContacts').modal('show');

}


//click que confirma la creación de un Contacts
$("#EditarContacts #EditarContactsConfirmar").click(function () {

    //crear el objeto con los valores seleccionados 
    var data = [
        { name: "cont_Name", value: $("#EditarContacts #cont_Name").val() },
        { name: "cont_LastName", value: $("#EditarContacts #cont_LastName").val() },
        { name: "cont_Email", value: $("#EditarContacts #cont_Email").val() },
        { name: "cont_Phone", value: $("#EditarContacts #cont_Phone").val() },
        { name: "occ_Id", value: $("#EditarContacts #occ_Id").val() },
        { name: "cus_Id", value: $("#EditarContacts #cus_Id").val() },

        { name: "occ_IdUserCreate", value: TempUserDefault },
        { name: "occ_IdUserModifies", value: TempUserDefault },
    ];

    //Insertar la persona
    $.ajax({
        type: "PUT",
        url: BaseUrl + "/Contacts/Edit?Id=" + cont_Id,
        data: data,
        //contentType: "application/json; charset=utf-8",
        /*dataType: "json",*/
    }).done(function (data) {

        location.reload();

    }).fail(function () {
        //mostrar alerta en caso de error
        console.log("Error al editar el contacto");
    });

    //ocultar el modal
    $('#EditarContacts').modal('hide');

});


//funcion para obtener la información del empleado
function GetContactsDetail(id) {
    $.ajax({
        type: "GET",
        url: BaseUrl + "/Contacts/Edit/" + id,
    }).done(function (data) {
        $("#EditarContacts #cont_Name").val(data.data.cont_Name);
        $("#EditarContacts #cont_LastName").val(data.data.cont_LastName);
        $("#EditarContacts #cont_Email").val(data.data.cont_Email);
        $("#EditarContacts #cont_Phone").val(data.data.cont_Phone);
        $("#EditarContacts #occ_Id").val(data.data.occ_Id);
        $("#EditarContacts #cus_Id").val(data.data.cus_Id);


    }).fail(function () {
        //mostrar alerta en caso de error
        console.log("Error al recuperar la información del Contacto");
    });
}