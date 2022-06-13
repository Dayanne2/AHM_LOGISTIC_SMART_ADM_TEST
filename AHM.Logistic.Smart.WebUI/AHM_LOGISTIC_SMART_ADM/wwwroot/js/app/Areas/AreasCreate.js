$("#AbrirModalCrear").on('click', function () {
    $('#CrearArea').modal('show');
    LimpiarControlesAreasCreate();
});

function LimpiarControlesAreasCreate() {
    $('#CrearArea #are_Description').val("");
    $('#CrearArea #are_Description').css("border-color", "#eee");
}

$('#CrearArea #are_Description').on('keypress', function () {
    $('#CrearArea #are_Description').css("border-color", "#eee");
});

$('#CrearArea #CrAreaConfirm').on('click', function () {
    var result = ValiFrmAreaCreate()
    if (result == true) {
        var data = [
            { name: "are_Description", value: $("#CrearArea #are_Description").val() },
            { name: "are_IdUserCreate", value: TempUserDefault },
            { name: "are_IdUserModifies", value: null },
        ];

        $.ajax({
            type: "POST",
            url: BaseUrl + "/Areas/Create",
            data: data,
            //contentType: "application/json; charset=utf-8",
            /*dataType: "json",*/
            success: function (data) {
                var message = data.message;
                if (message.includes("An error has occurred while processing the request." )) {
                    Swal.fire({
                        width: '20%',
                        height: '20%',
                        title: '¡Error!',
                        text: '¡Se perdío conexión con el servidor!',
                        icon: 'warning',
                        confirmButtonColor: '#3085d6',
                    });
                    setTimeout(function () {
                        location.assign("https://localhost:44339/areas/index");
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
                        location.assign("https://localhost:44339/areas/index");
                    }, 1500)
                }
            },
        });
        
    }
})

function ValiFrmAreaCreate() {
    var result = true;
    var are_Description = $('#CrearArea #are_Description');
    result = MessagesError(are_Description, 2, 40, 'Descripción');
    return result;
}
