$('#frmEditPersons').on('submit', function () {
    var result = ValidateEditFrmPersons();
    if (result == true) {
        var data = [
            { name: "per_Id", value: $('#frmEditPersons #per_Id').val() },
            { name: "per_Identidad", value: $('#frmEditPersons #per_Identidad').val() },
            { name: "per_Firstname", value: $('#frmEditPersons #per_Firstname').val() },
            { name: "per_Secondname", value: $('#frmEditPersons #per_Secondname').val() },
            { name: "per_LastNames", value: $('#frmEditPersons #per_LastNames').val() },
            { name: "per_BirthDate", value: $('#frmEditPersons #per_BirthDate').val() },
            { name: "per_Sex", value: $('#frmEditPersons #per_Sex').val() },
            { name: "per_Email", value: $('#frmEditPersons #per_Email').val() },
            { name: "per_Phone", value: $('#frmEditPersons #per_Phone').val() },
            { name: "per_Direccion", value: $('#frmEditPersons #per_Direccion').val() },
            { name: "dep_Id", value: $('#frmEditPersons #SelectDepartments').val() },
            { name: "mun_Id", value: $('#frmEditPersons #SelectMunicipalities').val() },
            { name: "per_Esciv", value: $('#frmEditPersons #per_Esciv').val() },
            { name: "per_IdUserCreate", value: TempUserDefault },
            { name: "per_IdUserModified", value: TempUserDefault },
        ];

        $.ajax({
            type: "POST",
            url: BaseUrl + "/Persons/Edit",
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
                        location.reload("https://localhost:44339/persons/index");
                    }, 1500)
                }
                if (message.includes("Operation completed successfully.")) {
                    Swal.fire({
                        width: '20%',
                        height: '20%',
                        title: '¡Exito!',
                        text: '¡Registro actualizado correctamente!',
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

function ValidateEditFrmPersons() {
    var result = true;
    var count = 0;
    var per_Identidad = $('#frmEditPersons #per_Identidad');
    var per_Firstname = $('#frmEditPersons #per_Firstname');
    var per_Secondname = $('#frmEditPersons #per_Secondname');
    var per_LastNames = $('#frmEditPersons #per_LastNames');
    var per_BirthDate = $('#frmEditPersons #per_BirthDate');
    var per_Sex = $('#frmEditPersons #per_Sex');
    var per_Email = $('#frmEditPersons #per_Email');
    var per_Phone = $('#frmEditPersons #per_Phone');
    var per_Direccion = $('#frmEditPersons #per_Direccion');
    var SelectDepartments = $('#frmEditPersons #SelectDepartments');
    var SelectMunicipalities = $('#frmEditPersons #SelectMunicipalities');
    var per_Esciv = $('#frmEditPersons #per_Esciv');
    
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

$('#frmEditPersons #per_Identidad').on('keypress', function () {
    $('#frmEditPersons #per_Identidad').css("border-color", "#eee");
});
$('#frmEditPersons #per_Firstname').on('keypress', function () {
    $('#frmEditPersons #per_Firstname').css("border-color", "#eee");
});
$('#frmEditPersons #per_Secondname').on('keypress', function () {
    $('#frmEditPersons #per_Secondname').css("border-color", "#eee");
});
$('#frmEditPersons #per_LastNames').on('keypress', function () {
    $('#frmEditPersons #per_LastNames').css("border-color", "#eee");
});
$('#frmEditPersons #per_BirthDate').on('change', function () {
    $('#frmEditPersons #per_BirthDate').css("border-color", "#eee");
});
$('#frmEditPersons #per_Sex').on('change', function () {
    $('#frmEditPersons #per_Sex').css("border-color", "#eee");
});
$('#frmEditPersons #per_Email').on('keypress', function () {
    $('#frmEditPersons #per_Email').css("border-color", "#eee");
});
$('#frmEditPersons #per_Phone').on('keypress', function () {
    $('#frmEditPersons #per_Phone').css("border-color", "#eee");
});
$('#frmEditPersons #per_Direccion').on('keypress', function () {
    $('#frmEditPersons #per_Direccion').css("border-color", "#eee");
});
$('#frmEditPersons #SelectDepartments').on('change', function () {
    $('#frmEditPersons #SelectDepartments').css("border-color", "#eee");
});
$('#frmEditPersons #SelectMunicipalities').on('change', function () {
    $('#frmEditPersons #SelectMunicipalities').css("border-color", "#eee");
});
$('#frmEditPersons #per_Esciv').on('change', function () {
    $('#frmEditPersons #per_Esciv').css("border-color", "#eee");
});