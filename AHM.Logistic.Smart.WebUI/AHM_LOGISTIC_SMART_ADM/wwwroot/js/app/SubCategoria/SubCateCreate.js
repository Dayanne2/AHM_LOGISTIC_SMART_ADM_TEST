
//click que abre el modal de crear
$("#AbrirModalCrearSubCategory").click(function () {


    GetCategoriaListCreate();

    //mostrar el modal
    $('#CrearSubCate').modal('show');

    //$('#CrearSubCate').modal('hide');

});


$("#closeModalCreate").click(function () {


    GetCategoriaListCreate();

    //mostrar el modal
    $('#CrearSubCate').modal('hide');

    //$('#CrearSubCate').modal('hide');

});

$("#closeModalEdit").click(function () {


    GetCategoriaListCreate();

    //mostrar el modal
    $('#EditarSubCategoria').modal('hide');

    //$('#CrearSubCate').modal('hide');

});

//click que confirma la creación de una persona
$("#CrearSubCate #CrearSubCategoriaConfirmar").click(function (e) {

    //crear el objeto con los valores seleccionados 
    e.preventDefault();
    e.stopImmediatePropagation();
    var data = [
        { name: "scat_Description", value: $("#CrearSubCate #scat_Description").val() },
        { name: "cat_Id", value: $("#CrearSubCate #DropDownCategoria").val() },
        { name: "scat_IdUserCreate", value: TempUserDefault },
        { name: "scat_IdUserModified", value: null },
    ];

    //Insertar la persona
    $.ajax({
        type: "POST",
        url: BaseUrl + "/SubCategories/Create",
        data: data,
        //contentType: "application/json; charset=utf-8",
        /*dataType: "json",*/
    }).done(function (data) {

        location.reload();

    }).fail(function () {
        //mostrar alerta en caso de error

    });

    //ocultar el modal
    $('#CrearSubCate').modal('hide');

});






function GetCategoriaListCreate() {
    $.ajax({
        type: "GET",
        url: BaseUrl + "/Categories/CategoriesList",
    }).done(function (data) {

        //Vaciar el dropdownlist
        $("#CrearSubCate #DropDownCategoria").empty();
        //variable que almacena las opciones
        var NewOption = `<option value="0" disabled=""> Por favor seleccione una opción... </option>`;

        data.data.forEach(function (item, index, array) {
            NewOption += `<option value="${item.cat_Id}"> ${item.cat_Description} </option>`;
        });

        //Agregar las opciones al dropdownlist
        $("#CrearSubCate #DropDownCategoria").append(NewOption);

    }).fail(function () {
        //mostrar alerta en caso de error
        console.log("Error al cargar las Categorias");
    });
}

