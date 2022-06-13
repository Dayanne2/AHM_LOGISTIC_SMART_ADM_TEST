var id = $("#municipio").val();
$(document).ready(function () {
    GetSubDepartmentsListCreate2();
    GetSubMunicipalitiesListCreate2();
    GetUsuariosList();
});
function GetSubDepartmentsListCreate2() {//funcion que trae los departamentos
    $.ajax({
        type: "GET",
        url: BaseUrl + "/Depart/DepartList",
    }).done(function (data, index) {
        //Vaciar el dropdownlist
        $("#SelectDepartments22").empty();
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
        $("#SelectDepartments2").append(NewOption);

    }).fail(function () {
        //mostrar alerta en caso de error
        console.log("Error al cargar los Departamentos");
    });
}
document.getElementById("SelectDepartments2").addEventListener('change', function () {
    document.getElementById("SelectMunicipalities2").disabled = false;
    id = 0;
    GetSubMunicipalitiesListCreate2();
});
function GetSubMunicipalitiesListCreate2() {
    var value = $("#SelectDepartments2").val();
    $.ajax({
        type: "GET",
        url: BaseUrl + "/Muni/MuniList",
    }).done(function (data, index) {
        //Vaciar el dropdownlist
        $("#SelectMunicipalities2").empty();
        //variable que almacena las opciones
        var NewOption = "<option value=" + 0 + "> Por favor seleccione una opción... </option>";
        data.data.forEach(function (item) {
            if (item.mun_Id == id) {
                NewOption += "<option  value=" + item.mun_Id + "  selected>" + item.mun_Description + "</option>";
            }
            else {
                if (item.dep_Id == value) {
                    NewOption += "<option  value=" + item.mun_Id + ">" + item.mun_Description + "</option>";
                }
            }
        });
        //Agregar las opciones al dropdownlist
        $("#SelectMunicipalities2").append(NewOption);

    }).fail(function () {
        //mostrar alerta en caso de error
        console.log("Error al cargar los Municipios");
    });
}

function GetUsuariosList() {//funcion que trae los Usuarios
    $.ajax({
        type: "GET",
        url: BaseUrl + "/User/UsersList",
    }).done(function (data, index) {
        //Vaciar el dropdownlist
        $("#SelectUsuario2").empty();
        var id = $("#User").val();
        //variable que almacena las opciones
        var NewOption = "<option value=" + 0 + "> Por favor seleccione una opción... </option>";

        data.data.forEach(function (item) {
            //forma correcta cuando se implemente la seguridad
            //if (item.usu_Id == id) {
            if (item.usu_Id == 2) {
                NewOption += "<option  value=" + item.usu_Id + " selected>" + item.usu_UserName + "</option>";
            }
            else {
                NewOption += "<option  value=" + item.usu_Id + ">" + item.usu_UserName + "</option>";
            }
        });
        //Agregar las opciones al dropdownlist
        $("#SelectUsuario2").append(NewOption);

    }).fail(function () {
        //mostrar alerta en caso de error
        console.log("Error al cargar los Departamentos");
    });
}

//function onchangeTabs(idTab) {
//    var id = idTab.id;
//    $(id).addClass("active");
//}