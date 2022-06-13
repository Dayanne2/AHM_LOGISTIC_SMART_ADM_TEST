$('#frmCreatePersons').on('submit', function () {
    var result = ValidateFrmPersons();
    if (result == true) {
        var data = [
            { name: "per_Identidad", value: $('#frmCreatePersons #per_Identidad').val() },
            { name: "per_Firstname", value: $('#frmCreatePersons #per_Firstname').val() },
            { name: "per_Secondname", value: $('#frmCreatePersons #per_Secondname').val() },
            { name: "per_LastNames", value: $('#frmCreatePersons #per_LastNames').val() },
            { name: "per_BirthDate", value: $('#frmCreatePersons #per_BirthDate').val() },
            { name: "per_Sex", value: $('#frmCreatePersons #per_Sex').val() },
            { name: "per_Email", value: $('#frmCreatePersons #per_Email').val() },
            { name: "per_Phone", value: $('#frmCreatePersons #per_Phone').val() },
            { name: "per_Direccion", value: $('#frmCreatePersons #per_Direccion').val() },
            { name: "dep_Id", value: $('#frmCreatePersons #SelectDepartments').val() },
            { name: "mun_Id", value: $('#frmCreatePersons #SelectMunicipalities').val() },
            { name: "per_Esciv", value: $('#frmCreatePersons #per_Esciv').val() },
            { name: "per_IdUserCreate", value: TempUserDefault },
            { name: "per_IdUserModified", value: null },
        ];

        $.ajax({
            type: "POST",
            url: BaseUrl + "/Persons/Create",
            data: data,
            //contentType: "application/json; charset=utf-8",
            /*dataType: "json",*/
            success: function (data) {
                var message = data.message;
                if (message.includes("An error has occurred while processing the request.")) {
                    Swal.fire({
                        width: '20%',
                        height: '20%',
                        title: '¡Error!',
                        text: '¡Se perdío conexión con el servidor!',
                        icon: 'warning',
                        confirmButtonColor: '#3085d6',
                    });
                    setTimeout(function () {
                        location.assign("https://localhost:44339/persons/index");
                    }, 1500)
                }
                if (message.includes("Operation completed successfully.")) {
                    Swal.fire({
                        width: '20%',
                        height: '20%',
                        title: '¡Exito!',
                        text: '¡Registro agregado correctamente!',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                    });
                    setTimeout(function () {
                        location.assign("https://localhost:44339/persons/index");
                    }, 1500)
                }
            },
        });
    }
    return false;

});

function ValidateFrmPersons() {
    var result = false;
    var count = 0;
    var per_Identidad = $('#frmCreatePersons #per_Identidad');
    var per_Firstname = $('#frmCreatePersons #per_Firstname');
    var per_Secondname = $('#frmCreatePersons #per_Secondname');
    var per_LastNames = $('#frmCreatePersons #per_LastNames');
    var per_BirthDate = $('#frmCreatePersons #per_BirthDate');
    var per_Sex = $('#frmCreatePersons #per_Sex');
    var per_Email = $('#frmCreatePersons #per_Email');
    var per_Phone = $('#frmCreatePersons #per_Phone');
    var per_Direccion = $('#frmCreatePersons #per_Direccion');
    var SelectDepartments = $('#frmCreatePersons #SelectDepartments');
    var SelectMunicipalities = $('#frmCreatePersons #SelectMunicipalities');
    var per_Esciv = $('#frmCreatePersons #per_Esciv');

    result = MessagesError(per_Identidad, 12, 13, 'Identidad');
    if (result == true) { count++; }
    result = MessagesError(per_Firstname, 2, 20, 'Primer Nombre');
    if (result == true) { count++; }
    result = MessagesError(per_Secondname, 2, 20, 'Segundo Nombre');
    if (result == true) { count++; }
    result = MessagesError(per_LastNames, 2, 20, 'Apellidos');
    if (result == true) { count++; }
    result = MessagesError(per_BirthDate, null, null, 'Fecha Nacimiento');
    if (result == true) { count++; }
    result = MessagesError(per_Sex, null, null, 'Sexo');
    if (result == true) { count++; }
    result = MessagesError(per_Email, null, 100, 'Email');
    if (result == true) { count++; }
    result = MessagesError(per_Phone, 11, 11, 'Teléfono');
    if (result == true) { count++; }
    result = MessagesError(per_Direccion, 7, 200, 'Dirección');
    if (result == true) { count++; }
    result = MessagesError(SelectDepartments, null, null, 'Departamentos');
    if (result == true) { count++; }
    result = MessagesError(SelectMunicipalities, null, null, 'Municipios');
    if (result == true) { count++; }
    result = MessagesError(per_Esciv, null, null, 'Estado Civil');
    if (result == true) { count++; }
    if (count == 12) {
        return result;
    }
    return false;
}

$('#frmCreatePersons #per_Identidad').on('keypress', function () {
    $('#frmCreatePersons #per_Identidad').css("border-color", "#eee");
});
$('#frmCreatePersons #per_Firstname').on('keypress', function () {
    $('#frmCreatePersons #per_Firstname').css("border-color", "#eee");
});
$('#frmCreatePersons #per_Secondname').on('keypress', function () {
    $('#frmCreatePersons #per_Secondname').css("border-color", "#eee");
});
$('#frmCreatePersons #per_LastNames').on('keypress', function () {
    $('#frmCreatePersons #per_LastNames').css("border-color", "#eee");
});
$('#frmCreatePersons #per_BirthDate').on('change', function () {
    $('#frmCreatePersons #per_BirthDate').css("border-color", "#eee");
});
$('#frmCreatePersons #per_Sex').on('change', function () {
    $('#frmCreatePersons #per_Sex').css("border-color", "#eee");
});
$('#frmCreatePersons #per_Email').on('keypress', function () {
    $('#frmCreatePersons #per_Email').css("border-color", "#eee");
});
$('#frmCreatePersons #per_Phone').on('keypress', function () {
    $('#frmCreatePersons #per_Phone').css("border-color", "#eee");
});
$('#frmCreatePersons #per_Direccion').on('keypress', function () {
    $('#frmCreatePersons #per_Direccion').css("border-color", "#eee");
});
$('#frmCreatePersons #SelectDepartments').on('change', function () {
    $('#frmCreatePersons #SelectDepartments').css("border-color", "#eee");
});
$('#frmCreatePersons #SelectMunicipalities').on('change', function () {
    $('#frmCreatePersons #SelectMunicipalities').css("border-color", "#eee");
});
$('#frmCreatePersons #per_Esciv').on('change', function () {
    $('#frmCreatePersons #per_Esciv').css("border-color", "#eee");
});