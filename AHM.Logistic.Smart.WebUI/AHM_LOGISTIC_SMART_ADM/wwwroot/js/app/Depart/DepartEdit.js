
//almacenar el id del registro modificado
var dep_Id = 0;

//click que abre el modal de crear
function ShowModalEditDepart(id) {

    //cambiar el valor de emp_Id
    dep_Id = id;
    //llamar la funció que recupera el detalle
    GetDepartDetails(id);
    //mostrar el modal
    $('#EditarDepart').modal('show');

}


//click que confirma la creación de un area
$("#EditarDepart #EditarDepartConfirmar").click(function () {
    var result = ValidateEditMdlDepart();
    if (result == true) {
    //crear el objeto con los valores seleccionados 
    var data = [
        { name: "dep_Code", value: $("#EditarDepart #dep_CodeDE").val() },
        { name: "dep_Description", value: $("#EditarDepart #dep_DescriptionDE").val() },
        { name: "cou_Id", value: $("#EditarDepart #DropDownPaisDE").val() },
        { name: "dep_IdUserCreate", value: TempUserDefault },
        { name: "dep_IdUserModifies", value: TempUserDefault },
    ];

    //Insertar la persona
    $.ajax({
        type: "PUT",
        url: BaseUrl + "/Depart/Edit?Id=" + dep_Id,
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
    $('#EditarDepart').modal('hide');
    }
});


//funcion para obtener la información del empleado
function GetDepartDetails(id) {
    $.ajax({
        type: "GET",
        url: BaseUrl + "/Depart/Edit/" + id,
    }).done(function (data) {
        $("#EditarDepart #dep_CodeDE").val(data.data.dep_Code);
        $("#EditarDepart #dep_DescriptionDE").val(data.data.dep_Description);
        var sele = 0;
        sele = data.data.cou_Id;
        GetSubPaisListEditDepart(sele);

    }).fail(function () {
        //mostrar alerta en caso de error
        console.log("Error al recuperar la información del empleado");
    });
}
function GetSubPaisListEditDepart(selec) {
    $.ajax({
        type: "GET",
        url: BaseUrl + "/Countries/CountriesList",
    }).done(function (data, index) {
        //Vaciar el dropdownlist
        $("#DropDownPaisDE").empty();
        //variable que almacena las opciones
        var NewOption = "<option value=" + 0 + "> Por favor seleccione una pais... </option>";

        data.data.forEach(function (item) {
            if (item.cou_Id == selec) {
                NewOption += "<option value=" + item.cou_Id + " selected>" + item.cou_Description + "</option>";
            }
            else {
                NewOption += "<option value=" + item.cou_Id + ">" + item.cou_Description + "</option>";
            }
        });

        //Agregar las opciones al dropdownlist
        $("#DropDownPaisDE").append(NewOption);

    }).fail(function () {
        //mostrar alerta en caso de error
        console.log("Error al cargar los Pais");
    });
}

function ValidateEditMdlDepart() {
    var result = true;
    var dep_CodeDE = $('#EditarDepart #dep_CodeDE');
    var dep_DescriptionDE = $('#EditarDepart #dep_DescriptionDE');
    var DropDownPaisDE = $('#EditarDepart #DropDownPaisDE');


    if (validar(dep_CodeDE, "Codigo") == false)
        result = false;

    if (validar(dep_DescriptionDE, "Departamento") == false)
        result = false;

    if (validar(DropDownPaisDE, "Pais") == false)
        result = false;

    if (length(dep_CodeDE, 2, 1, "Codigo") == false)
        result = false;

    if (length(dep_DescriptionDE, 90, 2, "Departamento") == false)
        result = false;
}

$('#EditarDepart #dep_CodeDE').on('keypress', function () {
    $('#EditarDepart #dep_CodeDE').css("border-color", "#eee");
});
$('#EditarDepart #dep_DescriptionDE').on('keypress', function () {
    $('#EditarDepart #dep_DescriptionDE').css("border-color", "#eee");
});
$('#EditarDepart #DropDownPaisDE').on('change', function () {
    $('#EditarDepart #DropDownPaisDE').css("border-color", "#eee");
});