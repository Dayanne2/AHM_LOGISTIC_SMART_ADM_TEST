//almacenar el id del empleado modificado
var emp_Id = 0;

//click que abre el modal de crear
function ShowModalEditEmployees(id) {

    //cambiar el valor de emp_Id
    emp_Id = id;
    //llamar la funció que recupera el detalle
    EmployeesGetPersonDetail(id);
    EmployeesGetOccupationsDetail(id);
    EmployeesGetAreasDetail(id);


    //mostrar el modal
    $('#EditarEmpleado').modal('show');

}


//click que confirma la creación de una persona
$("#EditarEmpleado #EditarPersonaConfirmar").click(function () {
    //crear el objeto con los valores seleccionados
    var result = ValiFrmEmployeesEdit()
    if (result == true) {
        var data = [
            { name: "per_Id", value: $("#EditarEmpleado #DropDownPersonas").val() },
            { name: "are_Id", value: $("#EditarEmpleado #DropDownAreas").val() },
            { name: "occ_Id", value: $("#EditarEmpleado #DropDownOcupaciones").val() },
            { name: "emp_IdUserCreate", value: null },
            { name: "emp_IdUserModified", value: TempUserDefault },
        ];

        //Insertar la persona
        $.ajax({
            type: "PUT",
            url: BaseUrl + "/Employers/Edit?Id=" + emp_Id,
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
        $('#EditarEmpleado').modal('hide');
    }

});


//funcion para obtener la información del empleado
function GetEmployeesDetail(id) {
    $.ajax({
        type: "GET",
        url: BaseUrl + "/Employers/Detail/" + id,
    }).done(function (data) {
        $("#EditarEmpleado #txtNombreCompleto").val(data.data.per_Firstname + " " + data.data.per_LastNames);
        EmployeesGetPersonDetail(data.data.per_Id);
        GetOccupationsList(data.data.occ_Id);
        GetAreasList(data.data.are_Id);

    }).fail(function () {
        //mostrar alerta en caso de error
        console.log("Error al recuperar la información del empleado");
    });
}


//funciones para obtener los listados
function EmployeesGetPersonDetail(id) {
    $.ajax({
        type: "GET",
        url: BaseUrl + "/Persons/PersonsList",
    }).done(function (data) {
        //Vaciar el dropdownlist
        $("#EditarEmpleado #DropDownPersonas").empty();
        //variable que almacena las opciones
        var NewOption = `<option value="0" disabled=""> Por favor seleccione una opción... </option>`;

        data.data.forEach(function (item, index, array) {
            if (item.per_Id == id)
                NewOption += `<option value="${item.per_Id}" selected> ${item.per_Firstname} ${item.per_LastNames} </option>`;
            else
                NewOption += `<option value="${item.per_Id}"> ${item.per_Firstname} ${item.per_LastNames} </option>`;
        });

        //Agregar las opciones al dropdownlist
        $("#EditarEmpleado #DropDownPersonas").append(NewOption);

    }).fail(function () {
        //mostrar alerta en caso de error
        console.log("Error al cargar las personas");
    });
}

function EmployeesGetOccupationsDetail(id) {
    $.ajax({
        type: "GET",
        url: BaseUrl + "/Occupation/OccupationList",
    }).done(function (data) {
        //Vaciar el dropdownlist
        $("#EditarEmpleado #DropDownOcupaciones").empty();
        //variable que almacena las opciones
        var NewOption = `<option value="0" disabled=""> Por favor seleccione una opción... </option>`;

        data.data.forEach(function (item, index, array) {
            /*            NewOption += `<option value="${item.occ_Id}"> ${item.occ_Description} </option>`;*/
            if (item.occ_Id == id)
                NewOption += `<option value="${item.occ_Id}" selected> ${item.occ_Description} </option>`;
            else
                NewOption += `<option value="${item.occ_Id}"> ${item.occ_Description} </option>`;
        });

        //Agregar las opciones al dropdownlist
        $("#EditarEmpleado #DropDownOcupaciones").append(NewOption);

    }).fail(function () {
        //mostrar alerta en caso de error
        console.log("Error al cargar las ocupaciones");
    });
}

function EmployeesGetAreasDetail(id) {
    $.ajax({
        type: "GET",
        url: BaseUrl + "/Areas/AreasList",
    }).done(function (data) {
        //Vaciar el dropdownlist
        $("#EditarEmpleado #DropDownAreas").empty();
        //variable que almacena las opciones
        var NewOption = `<option value="0" disabled=""> Por favor seleccione una opción... </option>`;

        data.data.forEach(function (item, index, array) {
            if (item.are_Id == id)
                NewOption += `<option value="${item.are_Id}" selected> ${item.are_Description} </option>`;
            else
                NewOption += `<option value="${item.are_Id}"> ${item.are_Description} </option>`;
        });

        //Agregar las opciones al dropdownlist
        $("#EditarEmpleado #DropDownAreas").append(NewOption);

    }).fail(function () {
        //mostrar alerta en caso de error
        console.log("Error al cargar las areas");
    });
}

function ValiFrmEmployeesEdit() {
    var count = 0;
    var result = true;
    var DropDownPersonas = $('#EditarEmpleado #DropDownPersonas');
    var DropDownOcupaciones = $('#EditarEmpleado #DropDownOcupaciones');
    var DropDownAreas = $('#EditarEmpleado #DropDownAreas');
    result = MessagesError(DropDownPersonas, null, null, 'persona');
    if (result == true) { count++; }
    result = MessagesError(DropDownOcupaciones, null, null, 'ocupación');
    if (result == true) { count++; }
    result = MessagesError(DropDownAreas, null, null, 'área');
    if (result == true) { count++; }
    if (count == 3) {
        return result;
    }
    return false;
}

$('#EditarEmpleado #DropDownPersonas').on('change', function () {
    $('#EditarEmpleado #DropDownPersonas').css("border-color", "#eee");
});
$('#EditarEmpleado #DropDownAreas').on('change', function () {
    $('#EditarEmpleado #DropDownAreas').css("border-color", "#eee");
});
$('#EditarEmpleado #DropDownOcupaciones').on('change', function () {
    $('#EditarEmpleado #DropDownOcupaciones').css("border-color", "#eee");
});