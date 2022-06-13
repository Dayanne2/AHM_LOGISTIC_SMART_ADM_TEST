//almacenar el id del empleado modificado
var scat_Id = 0;

//click que abre el modal de crear
function ShowModalEditSubCategoria(id) {

    //cambiar el valor de emp_Id
    scat_Id = id;
    //llamar la funció que recupera el detalle
    GetSubCategoriesDetail(id);

    //mostrar el modal
    $('#EditarSubCategoria').modal('show');

}

//click que confirma la creación de una persona
$("#EditarSubCategoria #EditarSubCategoriaConfirmar").click(function () {

    //crear el objeto con los valores seleccionados 
    var data = [
        { name: "scat_Description", value: $("#EditarSubCategoria #scat_Description").val() },
        { name: "cat_Id", value: $("#EditarSubCategoria #DropDownCategoria").val() },
        { name: "scat_IdUserCreate", value: TempUserDefault },
        { name: "scat_IdUserModified", value: TempUserDefault },
    ];

    //Insertar la persona
    $.ajax({
        type: "PUT",
        url: BaseUrl + "/SubCategories/Edit?Id=" + scat_Id,
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
    $('#EditarSubCategoria').modal('hide');

});


//funcion para obtener la información del empleado
function GetSubCategoriesDetail(id) {
    $.ajax({
        type: "GET",
        url: BaseUrl + "/SubCategories/Edit/" + id,
    }).done(function (data) {

        $("#EditarSubCategoria #scat_Description").val(data.data.scat_Description);
        GetCategoriaList(data.data.cat_Id);

    }).fail(function () {
        //mostrar alerta en caso de error
        console.log("Error al recuperar la información");
    });
}

//funciones para obtener los listados
function GetCategoriaList(id) {
    $.ajax({
        type: "GET",
        url: BaseUrl + "/Categories/CategoriesList",
    }).done(function (data) {

        //Vaciar el dropdownlist
        $("#EditarSubCategoria #DropDownCategoria").empty();
        //variable que almacena las opciones
        var NewOption = `<option value="0" disabled=""> Por favor seleccione una opción... </option>`;

        data.data.forEach(function (item, index, array) {
         
                NewOption += `<option value="${item.cat_Id}" selected> ${item.cat_Description} </option>`;
           
        });

        //Agregar las opciones al dropdownlist
        $("#EditarSubCategoria #DropDownCategoria").append(NewOption);

    }).fail(function () {
        //mostrar alerta en caso de error
        console.log("Error al cargar las Categoria");
    });
}