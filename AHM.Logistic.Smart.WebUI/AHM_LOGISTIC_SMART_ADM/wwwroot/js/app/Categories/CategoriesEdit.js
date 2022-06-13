
//almacenar el id del registro modificado
var cat_Id = 0;

//click que abre el modal de crear
function ShowModalEditCategories(id) {

    //cambiar el valor de cat_Id
    cat_Id = id;
    //llamar la función que recupera el detalle
    GetCategoriesDetail(id);

    //mostrar el modal
    $('#EditCategories').modal('show');

}


//click que confirma la creación de un area
$("#EditCategories #EditCategoriesConfirm").click(function () {

    //crear el objeto con los valores seleccionados 
    var data = [
        { name: "cat_Description", value: $("#EditCategories #cat_Description").val() },
        { name: "are_IdUserCreate", value: TempUserDefault },
        { name: "are_IdUserModifies", value: TempUserDefault },
    ];

    //Insertar la persona
    $.ajax({
        type: "PUT",
        url: BaseUrl + "/Categories/Edit?Id=" + cat_Id,
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
    $('#EditCategories').modal('hide');

});


//funcion para obtener la información de la categoria
function GetCategoriesDetail(id) {
    $.ajax({
        type: "GET",
        url: BaseUrl + "/Categories/Edit/" + id,
    }).done(function (data) {
        $("#EditCategories #cat_Description").val(data.data.cat_Description);

    }).fail(function () {
        //mostrar alerta en caso de error
        console.log("Error al recuperar la información del empleado");
    });
}