/*/*const { removeAllListeners } = require("node:process");*/

//almacenar el id del empleado modificado
var mun_Id = 0;
var pais = 0;
//click que abre el modal de crear
function ShowModalEdit(id) {
    //cambiar el valor de emp_Id
    mun_Id = id;
    //llamar la funció que recupera el detalle
    GetMunicipalitiesDetail(id);
    GposDepartmentsListEditMun();

    //mostrar el modal
    $('#EditMunicipalities').modal('show');
}

//click que confirma la creación de un minicipio
$("#EditMunicipalities #EditMunicipalitiesConfirmar").click(function (e) {

    var result = ValidateEditMdlMunicipalies();
    if (result == true) {
        //e.preventDefault();
        //e.stopImmediatePropagation();
        //crear el objeto con los valores seleccionados 
        var data = [
            { name: "mun_Code", value: $("#EditMunicipalities #CodeME").val() },
            { name: "mun_Description", value: $("#EditMunicipalities #DescriptionME").val() },
            { name: "dep_Id", value: $("#EditMunicipalities #DropDownDepartmentsME").val() },
            { name: "mun_IdUserCreate", value: TempUserDefault },
            { name: "mun_IdUserModifies", value: TempUserDefault },
        ];

        //Insertar el municipio
        $.ajax({
            type: "PUT",
            url: BaseUrl + "/Muni/Edit?Id=" + mun_Id,
            data: data,
            //contentType: "application/json; charset=utf-8",
            /*dataType: "json",*/
                   }, 1500)
                }
                if (message.includes("Operation completed successfully.")) {
                    Swal.fire({
                        width: '20%',
                        height: '20%',
                        title: '¡Exito!',
                        text: '¡Registro Editado correctamente!',
          
        }).done(function (data) {

            location.reload();

        }).fail(function () {
            //mostrar alerta en caso de error
            console.log("Error al editar el municipio");

        });

        //ocultar el modal
        $('#EditMunicipalities').modal('hide');
    }
});

//funcion para obtener la información del municipio
function GetMunicipalitiesDetail(id) {
    console.log("GetMunicipalitiesDetail: ", id);
    $.ajax({
        type: "GET",
        url: BaseUrl + "/Muni/Detail/" + id,
    }).done(function (data) {

        $("#EditMunicipalities #CodeME").val(data.data.mun_Code);
        $("#EditMunicipalities #DescriptionME").val(data.data.mun_Description);
        var dep = 0;
        dep = data.data.dep_Id;

        GetDepartmentsPuente(dep);
    }).fail(function () {
        //mostrar alerta en caso de error
        console.log("Error al recuperar la información del Municipios");
    });
}
//funciones para obtener los listados
function GetDepartmentsPuente(id) {
    $.ajax({
        type: "GET",
        url: BaseUrl + "/Depart/Edit/"+id
    }).done(function (data) {
        var pais = 0;
        pais = data.data.cou_Id;
        GetSubPaisListEditMuni(pais,id);
    });
}

function GetSubPaisListEditMuni(selis,algo) {
    $.ajax({
        type: "GET",
        url: BaseUrl + "/Countries/CountriesList",
    }).done(function (data, index) {
        //Vaciar el dropdownlist
        $("#DropDownPaisME").empty();
        //variable que almacena las opciones

        var NewOption = "<option value=" + 0 + "> Por favor seleccione una opción... </option>";

        data.data.forEach(function (item) {
            if (item.cou_Id == selis) {
                NewOption += "<option value=" + item.cou_Id + " selected>" + item.cou_Description + "</option>";
                pais = item.cou_Id;
                GposDepartmentsListEditMun(pais,algo);
            }
            else {
                NewOption += "<option value=" + item.cou_Id + ">" + item.cou_Description + "</option>";
            }
        });

        //Agregar las opciones al dropdownlist
        $("#DropDownPaisME").append(NewOption);

    }).fail(function () {
        //mostrar alerta en caso de error
        console.log("Error al cargar los Departamentos");
    });
}

function GposDepartmentsListEditMun(pais, mun_Id) {
    $.ajax({
        type: "GET",
        url: BaseUrl + "/Depart/DepartList",
    }).done(function (data) {
       
        //Vaciar el dropdownlist
        $("#DropDownDepartmentsME ").empty();

        //variable que almacena las opciones
        var NewOption = `<option value="0" disabled=""> Por favor seleccione una Departamento... </option>`;
        data.data.forEach(function (item, index, array) {
            if (pais == item.cou_Id) {
                if (item.dep_Id == mun_Id) {
                    NewOption += `<option value="${item.dep_Id}" selected> ${item.dep_Description} </option>`;
                }
                else {
                    NewOption += `<option value="${item.dep_Id}"> ${item.dep_Description} </option>`;
                }
            }
        });

        //Agregar las opciones al dropdownlist
        $("#DropDownDepartmentsME").append(NewOption);

    }).fail(function () {
        //mostrar alerta en caso de error
        console.log("Error al cargar las listas");
    });
}
function ValidateEditMdlMunicipalies() {
    var result = true;
    var CodeMC = $('#CreateMunicipalities #CodeMC');
    var DescriptionMC = $('#CreateMunicipalities #DescriptionMC');
    var DropDownPaisMC = $('#CreateMunicipalities #DropDownPaisMC');
    var DropDownDepartmentsMC = $('#CreateMunicipalities #DropDownDepartmentsMC');

    if (validar(CodeMC, "Codigo") == false)
        result = false;

    if (validar(DescriptionMC, "Municipio") == false)
        result = false;

    if (validar(DropDownPaisMC, "Pais") == false)
        result = false;

    if (validar(DropDownDepartmentsMC, "Departamento") == false)
        result = false;

    if (length(CodeMC, 4, 1, "Codigo") == false)
        result = false;

    if (length(DescriptionMC, 90, 2, "Municipio") == false)
        result = false;

}

$('#CreateMunicipalities #CodeMC').on('keypress', function () {
    $('#CreateMunicipalities #CodeMC').css("border-color", "#eee");
});
$('#CreateMunicipalities #DescriptionMC').on('keypress', function () {
    $('#CreateMunicipalities #DescriptionMC').css("border-color", "#eee");
});
$('#CreateMunicipalities #DropDownPaisMC').on('change', function () {
    $('#CreateMunicipalities #DropDownPaisMC').css("border-color", "#eee");
});
$('#CreateMunicipalities #DropDownDepartmentsMC').on('change', function () {
    $('#CreateMunicipalities #DropDownDepartmentsMC').css("border-color", "#eee");
});