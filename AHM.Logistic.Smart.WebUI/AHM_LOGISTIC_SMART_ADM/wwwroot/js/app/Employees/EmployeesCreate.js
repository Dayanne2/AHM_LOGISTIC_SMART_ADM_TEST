//click que abre el modal de crear
$("#AbrirModalEmployees").click(function () {

    //llamar las funciones que cargan los dropdownlist
    EmployeesGetPersonCreate();
    EmployeesGetOccupationsCreate();
    EmployeesGetAreasCreate();
    //mostrar el modal
    $('#CrearEmpleado').modal('show');
    CleanEmployees();

});

function CleanEmployees() {
    $('#CrearEmpleado #DropDownPersonas').val("");
    $('#CrearEmpleado #DropDownPersonas').css("border-color", "#eee");
    $('#CrearEmpleado #DropDownAreas').val("");
    $('#CrearEmpleado #DropDownAreas').css("border-color", "#eee");
    $('#CrearEmpleado #DropDownOcupaciones').val("");
    $('#CrearEmpleado #DropDownOcupaciones').css("border-color", "#eee");
}

//click que confirma la creación de una persona
$('#CrearEmpleado #CrearPersonaConfirmar').on('click', function () {
    var result = ValiFrmEmployeesCreate()
    if (result == true) {
        var data = [
            { name: "per_Id", value: $("#CrearEmpleado #DropDownPersonas").val() },
            { name: "are_Id", value: $("#CrearEmpleado #DropDownAreas").val() },
            { name: "occ_Id", value: $("#CrearEmpleado #DropDownOcupaciones").val() },
            { name: "emp_IdUserCreate", value: TempUserDefault },
            { name: "emp_IdUserModified", value: null },
        ];

        //Insertar la persona
        $.ajax({
            type: "POST",
            url: BaseUrl + "/Employers/Create",
            data: data,
            //contenttype: "application/json; charset=utf-8",
            /*datatype: "json",*/
            success: function (data) {
                var message = data.message;
                if (message.includes("An error has occurred while processing the request.")) {
                    swal.fire({
                        width: '20%',
                        height: '20%',
                        title: '¡error!',
                        text: '¡se perdío conexión con el servidor!',
                        icon: 'warning',
                        confirmbuttoncolor: '#3085d6',
                    });
                    setTimeout(function () {
                        location.assign("https://localhost:44339/employers/index");
                    }, 1500)
                }
                if (message.includes("Operation completed successfully.")) {
                    NotificationSuccess();
                    setTimeout(function () {
                        location.assign("https://localhost:44339/employers/index");
                    }, 1500)
                }
            },
        });
    }
})

//funciones para obtener los listados

function EmployeesGetPersonCreate() {
    $.ajax({
        type: "GET",
        url: BaseUrl + "/Persons/PersonsList",
    }).done(function (data) {
        //Vaciar el dropdownlist
        $("#CrearEmpleado #DropDownPersonas").empty();
        //variable que almacena las opciones
        var NewOption = `<option value="0"> Por favor seleccione una opción... </option>`;

        data.data.forEach(function (item, index, array) {
            NewOption += `<option value="${item.per_Id}"> ${item.per_Firstname} ${item.per_LastNames} </option>`;
        });

        //Agregar las opciones al dropdownlist
        $("#CrearEmpleado #DropDownPersonas").append(NewOption);

    }).fail(function () {
        //mostrar alerta en caso de error
        console.log("Error al cargar las personas");
    });
}

function EmployeesGetOccupationsCreate() {
    $.ajax({
        type: "GET",
        url: BaseUrl + "/Occupation/OccupationList",
    }).done(function (data) {

        //Vaciar el dropdownlist
        $("#CrearEmpleado #DropDownOcupaciones").empty();
        //variable que almacena las opciones
        var NewOption = `<option value="0"> Por favor seleccione una opción... </option>`;

        data.data.forEach(function (item, index, array) {
            NewOption += `<option value="${item.occ_Id}"> ${item.occ_Description} </option>`;
        });

        //Agregar las opciones al dropdownlist
        $("#CrearEmpleado #DropDownOcupaciones").append(NewOption);

    }).fail(function () {
        //mostrar alerta en caso de error
        console.log("Error al cargar las ocupaciones");
    });
}

function EmployeesGetAreasCreate() {
    $.ajax({
        type: "GET",
        url: BaseUrl + "/Areas/AreasList",
    }).done(function (data) {

        //Vaciar el dropdownlist
        $("#CrearEmpleado #DropDownAreas").empty();
        //variable que almacena las opciones
        var NewOption = `<option value="0"> Por favor seleccione una opción... </option>`;

        data.data.forEach(function (item, index, array) {
            NewOption += `<option value="${item.are_Id}"> ${item.are_Description} </option>`;
        });

        //Agregar las opciones al dropdownlist
        $("#CrearEmpleado #DropDownAreas").append(NewOption);

    }).fail(function () {
        //mostrar alerta en caso de error
        console.log("Error al cargar las areas");
    });
}

function ValiFrmEmployeesCreate() {
    var count = 0;
    var result = true;
    var DropDownPersonas = $('#CrearEmpleado #DropDownPersonas');
    var DropDownOcupaciones = $('#CrearEmpleado #DropDownOcupaciones');
    var DropDownAreas = $('#CrearEmpleado #DropDownAreas');

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

$('#CrearEmpleado #DropDownPersonas').on('change', function () {
    $('#CrearEmpleado #DropDownPersonas').css("border-color", "#eee");
});
$('#CrearEmpleado #DropDownAreas').on('change', function () {
    $('#CrearEmpleado #DropDownAreas').css("border-color", "#eee");
});
$('#CrearEmpleado #DropDownOcupaciones').on('change', function () {
    $('#CrearEmpleado #DropDownOcupaciones').css("border-color", "#eee");
});