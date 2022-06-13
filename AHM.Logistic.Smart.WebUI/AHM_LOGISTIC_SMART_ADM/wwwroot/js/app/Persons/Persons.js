var mun = $("#municipio").val();
$(document).ready(function () {
    GetSubDepartmentsListCreate();
    GetSubMunicipalitiesListCreate();
});

function GetSubDepartmentsListCreate() {
    $.ajax({
        type: "GET",
        url: BaseUrl + "/Depart/DepartList",
    }).done(function (data, index) {
        //Vaciar el dropdownlist
        $("#SelectDepartments").empty();
        var id = $("#departamento").val();
        //variable que almacena las opciones
        var NewOption = "<option value=" + 0 + "> Por favor seleccione una opción... </option>";

        data.data.forEach(function (item) {
            if (item.dep_Id == id) {
                NewOption += "<option  value=" + item.dep_Id + " selected>" + item.dep_Description + "</option>";
            }
            else {
                NewOption += "<option  value=" + item.dep_Id + ">" + item.dep_Description + "</option>";
            }
        });

        //Agregar las opciones al dropdownlist
        $("#SelectDepartments").append(NewOption);

    }).fail(function () {
        //mostrar alerta en caso de error
        var message = '<span style="color: red;">No se pudieron cargar las opciones, comuníquese con el encargado.</span>';
        $('#SelectDepartments').after($(message));
    });
}

$("#SelectDepartments").on('change', function () {
    $("#SelectMunicipalities").attr('disabled', false);
    mun = 0;
    GetSubMunicipalitiesListCreate();
});

function GetSubMunicipalitiesListCreate() {
    var value = $("#SelectDepartments").val();
    $.ajax({
        type: "GET",
        url: BaseUrl + "/Muni/MuniList",
    }).done(function (data, index) {
        //Vaciar el dropdownlist
        $("#SelectMunicipalities").empty();
        //variable que almacena las opciones
        var NewOption = "<option value=" + 0 + "> Por favor seleccione una opción... </option>";

        data.data.forEach(function (item) {
            if (item.mun_Id == mun) {
                NewOption += "<option  value=" + item.mun_Id + "  selected>" + item.mun_Description + "</option>";
            }
            else {
                if (item.dep_Id == value) {
                    NewOption += "<option  value=" + item.mun_Id + ">" + item.mun_Description + "</option>";
                }
            }
        });

        //Agregar las opciones al dropdownlist
        $("#SelectMunicipalities").append(NewOption);

    }).fail(function () {
        //mostrar alerta en caso de error
        var message = '<span style="color: red;">No se pudieron cargar las opciones, comuníquese con el encargado.</span>';
        $('#SelectMunicipalities').after($(message));
    });
}