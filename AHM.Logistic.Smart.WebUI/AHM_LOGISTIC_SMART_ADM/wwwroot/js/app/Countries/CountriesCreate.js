$("#AbrirModalCountries").click(function () {
    $('#CreateCountries').modal('show');
    CleanCountries();
});

function CleanCountries() {
    $('#CreateCountries #cou_Description').val("");
    $('#CreateCountries #cou_Description').css("border-color", "#eee");
}

$('#CreateCountries #cou_Description').on('keypress', function () {
    $('#CreateCountries #cou_Description').css("border-color", "#eee");
});

$('#CreateCountries #CreateCountriesConfirm').on('click', function () {

    var result = ValiContriesCreate();
    if (result == true) {
        var data = [
            { name: "cou_Description", value: $("#CreateCountries #cou_Description").val() },
            { name: "cou_IdUserCreate", value: TempUserDefault },
            { name: "cou_IdUserModified", value: null },
        ];

        var descripcion = $("#CreateCountries #cou_Description").val();
        var repetido = false;
        $.ajax({
            type: "Get",
            url: BaseUrl + "/Countries/CountriesList",
            data: data,
        }).done(function (data, index) {

            data.data.forEach(function (item) {
                if (item.cou_Description == descripcion) {
                    repetido = true;
                }
                if (item.cou_Description.includes(descripcion)) {
                    repetido = true;
                }
            });
            var message = "";
            if (repetido == true) {
                message = '<span style="color: red;">*El país ya existe</span>';
                $('#CreateCountries #cou_Description').after($(message).fadeOut(4000));
                $('#CreateCountries #cou_Description').css("border-color", "red");

            }
            else {
                var data = [
                    { name: "cou_Description", value: $("#CreateCountries #cou_Description").val() },
                    { name: "cou_IdUserCreate", value: TempUserDefault },
                    { name: "cou_IdUserModified", value: null },
                ];
                //Insertar la persona
                $.ajax({
                    type: "POST",
                    url: BaseUrl + "/Countries/Create",
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
                                location.assign("https://localhost:44339/countries/index");
                            }, 1500)
                        }
                        if (message.includes("Operation completed successfully.")) {
                            NotificationSuccess();
                            setTimeout(function () {
                                location.assign("https://localhost:44339/countries/index");
                            }, 1000)
                        }
                    }
                });
            }
        })
    }
});

function ValiContriesCreate() {
    var result = true;
    var message = "";
    var cou_Description = $('#CreateCountries #cou_Description');
    result = MessagesError(cou_Description, 4, 50, 'país');
    return result;
}