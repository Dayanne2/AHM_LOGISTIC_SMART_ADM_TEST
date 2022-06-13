//click que abre el modal de crear
$("#OpenModalCategories").click(function () {

    //mostrar el modal
    $('#CreateCategories').modal('show');

});

$("#CloseModalCreate").click(function () {

    //mostrar el modal
    $('#CreateCategories').modal('hide');

});

$("#CloseModalEdit").click(function () {

    //mostrar el modal
    $('#EditCategories').modal('hide');

});

//click que confirma la creaciÃ³n de una persona
$("#CreateCategories #CreateCategoriesConfirm").click(function () {

    //crear el objeto con el valores 
    var data = [
        { name: "cat_Description", value: $("#CreateCategories #cat_Description").val() },
        { name: "cat_IdUserCreate", value: TempUserDefault },
        { name: "cat_IdUserModified", value: null },
    ];

    //Insertar la categoria
    $.ajax({
        type: "POST",
        url: BaseUrl + "/Categories/Create",
        data: data,
        //contentType: "application/json; charset=utf-8",
        /*dataType: "json",*/
    }).done(function (data) {

        location.reload();

    }).fail(function () {
        //mostrar alerta en caso de error

    });

    //ocultar el modal
    $('#CreateCategories').modal('hide');

});