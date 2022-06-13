var cou_Id = 0;
function ShowModalEditCountries(id) {
    cou_Id = id;
    GetCountriesDetail(id);
    $('#EditCountries').modal('show');
    LimpiarControles();

}

function LimpiarControles() {
    $('#EditCountries #cou_Description').css("border-color", "#eee");
}

$('#EditCountries #cou_Description').on('keypress', function () {
    $('#EditCountries #cou_Description').css("border-color", "#eee");
});

//funcion para obtener la información del empleado
function GetCountriesDetail(id) {
    $.ajax({
        type: "GET",
        url: BaseUrl + "/Countries/Edit/" + id,
    }).done(function (data) {
        $("#EditCountries #cou_Description").val(data.data.cou_Description);

    }).fail(function () {
        var message = '<span style="color: red;">No se pudieron cargar las opciones, comuníquese con el encargado.</span>';
        $('#EditCountries #cou_Description').after($(message));
    });
}


$('#EditCountries #EditCountriesConfirm').on('click', function () {
    var result = ValiContriesEdit()
    if (result == true) {
        var data = [
            { name: "cou_Description", value: $("#EditCountries #cou_Description").val() },
            { name: "cou_IdUserCreate", value: null },
            { name: "cou_IdUserModifies", value: TempUserDefault },
        ];
        $.ajax({
            type: "PUT",
            url: BaseUrl + "/Countries/Edit?Id=" + cou_Id,
            data: data,
            //contentType: "application/json; charset=utf-8",
            /*dataType: "json",*/
            success: function (data) {
                var message = data.message;
                if (message.includes("An error has occurred while processing the request.")) {
                    message = '<span style="color: red;">No hay conexión hacia el servidor, comuníquese con el administrador del sistema.</span>';
                    $('#EditCountries #cou_Description').after($(message));
                }
                if (message.includes("Operation completed successfully.")) {
                    location.reload();
                    $('#EditCountries').modal('hide');
                }
            },
        });
    }
})

function ValiContriesEdit() {
    var result = true;
    var cou_Description = $('#EditCountries #cou_Description');
    result = MessagesError(cou_Description, 4, 50, 'país');
    return result;
}