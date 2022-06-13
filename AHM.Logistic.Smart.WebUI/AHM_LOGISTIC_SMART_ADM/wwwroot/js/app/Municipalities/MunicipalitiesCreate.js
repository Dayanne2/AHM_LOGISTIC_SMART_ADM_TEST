
//click que abre el modal de crear
$("#OpenModalCreateMunicipalitie").click(function () {

    //llamar las funciones que cargan los dropdownlist
    GetSubPaisListCreateMuni();
    GetSubDepartmentsListCreateMuni();

    //mostrar el modal
    $('#CreateMunicipalities').modal('show');

    //$('#CrearEmpleado').modal('hide');
});

//click que confirma la creación de una persona
$("#CreateMunicipalities #CreateMunicipalitiesConfirmar").click(function () {

    var CodeMC = document.getElementById("CodeMC");
    var DescriptionMC = document.getElementById("DescriptionMC");
    var DropDownPaisMC = document.getElementById("DropDownPaisMC");
    var DropDownDepartmentsMC = document.getElementById("DropDownDepartmentsMC");

    var codeErroMC = document.getElementById("codeErroMC");
    var descriptionErroMC = document.getElementById("descriptionErroMC");
    var dropDownPaisErro = document.getElementById("dropDownPaisErro");
    var dropDownDepartmentsErroMC = document.getElementById("dropDownDepartmentsErroMC");

    var pr = 0;
    if (pr == valiMC(CodeMC, DescriptionMC, DropDownPaisMC, DropDownDepartmentsMC, codeErroMC, descriptionErroMC, dropDownPaisErro, dropDownDepartmentsErroMC)) {
        //crear el objeto con los valores seleccionados 
        var data = [
            { name: "mun_Code", value: $("#CreateMunicipalities #CodeMC").val() },
            { name: "mun_Description", value: $("#CreateMunicipalities #DescriptionMC").val() },
            { name: "dep_Id", value: $("#CreateMunicipalities #DropDownDepartmentsMC").val() },
            { name: "mun_IdUserCreate", value: TempUserDefault },
            { name: "mun_IdUserModifies", value: null },
        ];

        //Insertar la persona
        $.ajax({
            type: "POST",
            url: BaseUrl + "/Muni/Create",
            data: data,
            //contentType: "application/json; charset=utf-8",
            /*dataType: "json",*/

        }).done(function (data) {

            location.reload();

        }).fail(function () {
            //mostrar alerta en caso de error

        });

        //ocultar el modal
        $('#CreateMunicipalities').modal('hide');
    }
});

function valiMC(CodeMC, DescriptionMC, DropDownPaisMC, DropDownDepartmentsMC, codeErroMC, descriptionErroMC, dropDownPaisErro, dropDownDepartmentsErroMC) {

    var incre = 0;
    const CodeValue = CodeMC.value;
    const DescriptionValue = DescriptionMC.value;
    const DropDownPaisValue = DropDownPaisMC.value;
    const DropDownDepartmentsValue = DropDownDepartmentsMC.value;

    const codeValueL = CodeValue.length;
    const descriptionValueL = DescriptionValue.length;

    if (validar(CodeValue, "Codigo", codeErroMC) == false) {
        if (length(codeValueL, 5, 1, codeErroMC) == false) {
            console.log("Exitosamente Codigo");
        } else incre += 1;
    } else incre += 1;

    if (validar(DescriptionValue, "Municipio", descriptionErroMC) == false) {
        if (length(descriptionValueL, 5, 1, descriptionErroMC) == false) {
            console.log("Exitosamente Codigo");
        } else incre += 1;
    } else incre += 1;

    if (validar(DropDownPaisValue, "Pais", dropDownPaisErro) == false) {
        console.log("Exitosamente Descripcion");
    } else incre += 1;

    if (validar(DropDownDepartmentsValue, "Departamento", dropDownDepartmentsErroMC) == false) {
        console.log("Exitosamente Codigo");
    } else incre += 1;

    console.log("incre: ", incre);
    return incre;
};

function GetSubPaisListCreateMuni() {
    $.ajax({
        type: "GET",
        url: BaseUrl + "/Countries/CountriesList",
    }).done(function (data, index) {
        //Vaciar el dropdownlist
        $("#DropDownPaisMC").empty();
        var id = $("#departamento").val();
        //variable que almacena las opciones
        var NewOption = "<option value=" + 0 + "> Por favor seleccione una opción... </option>";

        data.data.forEach(function (item) {
            //if (item.dep_Id == id) {
            //    NewOption += "<option value=" + item.dep_Id + " selected>" + item.dep_Description + "</option>";
            //}
            //else {
            NewOption += "<option value=" + item.cou_Id + ">" + item.cou_Description + "</option>";
            /*        }*/
        });

        //Agregar las opciones al dropdownlist
        $("#DropDownPaisMC").append(NewOption);

    }).fail(function () {
        //mostrar alerta en caso de error
        console.log("Error al cargar los Departamentos");
    });
}

function GetSubDepartmentsListCreateMuni() {
    $.ajax({
        type: "GET",
        url: BaseUrl + "/Depart/DepartList",
    }).done(function (data, index) {
        //Vaciar el dropdownlist
        $("#DropDownDepartmentsMC").empty();
        var id = $("#DropDownPaisMC").val();
        //variable que almacena las opciones
        var NewOption = "<option value=" + 0 + " selected> Por favor seleccione una opción... </option>";

        data.data.forEach(function (item) {
            console.log("id: ", id);
            console.log("Departamentos: ", item.cou_Id);
            if (item.cou_Id == id) {
                NewOption += "<option value=" + item.dep_Id + ">" + item.dep_Description + "</option>";
            }
        });

        //Agregar las opciones al dropdownlist
        $("#DropDownDepartmentsMC").append(NewOption);

    }).fail(function () {
        //mostrar alerta en caso de error
        console.log("Error al cargar los Departamentos");
    });
}

function ValidateEditMdlMunicipalies() {
    var result = true;
    var CodeME = $('#EditMunicipalities #CodeME');
    var DescriptionME = $('#EditMunicipalities #DescriptionME');
    var DropDownPaisME = $('#EditMunicipalities #DropDownPaisME');
    var DropDownDepartmentsME = $('#EditMunicipalities #DropDownDepartmentsME');

    if (validar(CodeME, "Codigo") == false)
        result = false;

    if (validar(DescriptionME, "Municipio") == false)
        result = false;

    if (validar(DropDownPaisME, "Pais") == false)
        result = false;

    if (validar(DropDownDepartmentsME, "Departamento") == false)
        result = false;

    if (length(CodeME, 4, 1, "Codigo") == false)
        result = false;

    if (length(DescriptionME, 90, 2, "Municipio") == false)
        result = false;

    return result;
}

$('#EditMunicipalities #CodeME').on('keypress', function () {
    $('#EditMunicipalities #CodeME').css("border-color", "#eee");
});
$('#EditMunicipalities #DescriptionME').on('keypress', function () {
    $('#EditMunicipalities #DescriptionME').css("border-color", "#eee");
});
$('#EditMunicipalities #DropDownPaisME').on('change', function () {
    $('#EditMunicipalities #DropDownPaisME').css("border-color", "#eee");
});
$('#EditMunicipalities #DropDownDepartmentsME').on('change', function () {
    $('#EditMunicipalities #DropDownDepartmentsME').css("border-color", "#eee");
});
