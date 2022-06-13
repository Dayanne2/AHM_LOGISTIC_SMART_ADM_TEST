var are_Id = 0;
function ShowModalEditAreas(id) {
    are_Id = id;
    GetAreasDetail(id);
    $('#EditArea').modal('show');
    LimpiarControles();

}

function LimpiarControles() {
    $('#EditArea #are_Description').css("border-color", "#eee");
}

$('#EditArea #are_Description').on('keypress', function () {
    $('#EditArea #are_Description').css("border-color", "#eee");
});

//funcion para obtener la información del empleado
function GetAreasDetail(id) {
    $.ajax({
        type: "GET",
        url: BaseUrl + "/Areas/Edit/" + id,
    }).done(function (data) {
        $("#EditArea #are_Description").val(data.data.are_Description);

    }).fail(function () {
        var message = '<span style="color: red;">No se pudieron cargar las opciones, comuníquese con el encargado.</span>';
        $('#EditArea #are_Description').after($(message));
    });
}


$('#EditArea #EditAreaConfirm').on('click', function () {
    var result = ValiFrmAreaEdit()
    if (result == true) {
        var data = [
            { name: "are_Description", value: $("#EditArea #are_Description").val() },
            { name: "are_IdUserCreate", value: TempUserDefault },
            { name: "are_IdUserModifies", value: TempUserDefault },
        ];
        $.ajax({
            type: "PUT",
            url: BaseUrl + "/Areas/Edit?Id=" + are_Id,
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
        //ocultar el modal
        
    }
})

function ValiFrmAreaEdit() {
    var result = true;
    var are_Description = $('#EditArea #are_Description');
    result = MessagesError(are_Description, 2, 40, 'Descripción');
    return result;
}