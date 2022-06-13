
//click que abre el modal de crear
$("#AbrirModalCrearDepart").click(function () {

    GetSubPaisListCreateCount();
    //mostrar el modal
    $('#CrearDepart').modal('show');

    //$('#CrearEmpleado').modal('hide');

});

//click que confirma la creación del registro
$("#CrearDepart #CrearDepartConfirmar").click(function () {

    var result = ValidateCreateMdlDepart();
    if (result == true) {
        //crear el objeto con los valores seleccionados 
        var data = [
            { name: "dep_Code", value: $("#CrearDepart #dep_CodeDC").val() },
            { name: "dep_Description", value: $("#CrearDepart #dep_DescriptionDC").val() },
            { name: "cou_Id", value: $("#CrearDepart #DropDownPaisDC").val() },
            { name: "dep_IdUserCreate", value: TempUserDefault },
            { name: "dep_IdUserModifies", value: TempUserDefault },
        ];
        //Insertar el dato
        $.ajax({
            type: "POST",
            url: BaseUrl + "/Depart/Create",
            data: data,
            //contentType: "application/json; charset=utf-8",
            /*dataType: "json",*/

        }).done(function (data) {

            location.reload();

        }).fail(function () {
            //mostrar alerta en caso de error
            console.log("Error al Crear el Empleado");
        });

        //ocultar el modal
        $('#EditarDepart').modal('hide');
    }
});

function GetSubPaisListCreateCount() {
    $.ajax({
        type: "GET",
        url: BaseUrl + "/Countries/CountriesList",
    }).done(function (data, index) {
        //Vaciar el dropdownlist
        $("#DropDownPaisDC").empty();
        /*        var id = $("#departamento").val();*/
        //variable que almacena las opciones
        var NewOption = "<option value=" + 0 + "> Por favor seleccione una pais... </option>";

        data.data.forEach(function (item) {
            //if (item.dep_Id == id) {
            //    NewOption += "<option value=" + item.dep_Id + " selected>" + item.dep_Description + "</option>";
            //}
            //else {
            NewOption += "<option value=" + item.cou_Id + ">" + item.cou_Description + "</option>";
            /*        }*/
        });

        //Agregar las opciones al dropdownlist
        $("#DropDownPaisDC").append(NewOption);

    }).fail(function () {
        //mostrar alerta en caso de error
        console.log("Error al cargar los Pais");
    });
}
function ValidateCreateMdlDepart() {
    var result = true;
    var dep_CodeDC = $('#CrearDepart #dep_CodeDC');
    var dep_DescriptionDC = $('#CrearDepart #dep_DescriptionDC');
    var DropDownPaisDC = $('#CrearDepart #DropDownPaisDC');

    if (validar(dep_CodeDC, "Codigo") == false)
        result = false;

    if (validar(dep_DescriptionDC, "Departamento") == false)
        result = false;

    if (validar(DropDownPaisDC, "Pais") == false)
        result = false;

    if (length(dep_CodeDC, 2, 1, "Codigo") == false)
        result = false;

    if (length(dep_DescriptionDC, 90, 2, "Departamento") == false)
        result = false;

    return result;
}

function length(val, logMax, logMin, camp) {
    var treFalse = true;
    var leng = val.val().length;
    console.log("leng: ", leng);
    var message = "";

    if (leng < logMin && leng > 0) {
        message = '<span style="color: red;">El campo de ' + camp + ' contiene muy pocos caracteres</span>';
        val.after($(message).fadeOut(4000));
        val.css("border-color", "red");
        treFalse = false;
    }
    else {
        if (leng >= logMax) {
            message = '<span style="color: red;">El campo de ' + camp + ' demasiados caracteres</span>';
            val.after($(message).fadeOut(4000));
            val.css("border-color", "red");
            treFalse = false;
        }
    }
    return treFalse;
}

function validar(value, messaError) {
    var treFalse = true;
    var Valor = value.val();
    console.log("------------------------------");
    console.log("Valor: ", Valor);

    var message = "";

    if (Valor == 0 || Valor == "0") {
        message = '<span style="color: red;">El campo de ' + messaError + ' es requerido</span>';
        value.after($(message).fadeOut(4000));
        value.css("border-color", "red");
        treFalse = false;
    } else {
        if (Valor === "" || Valor == null) {
            message = '<span style="color: red;">El campo de ' + messaError + ' es requerido</span>';
            value.after($(message).fadeOut(4000));
            value.css("border-color", "red");
            treFalse = false;
        }
    }
    return treFalse;
}

function validarEmail(valor, tanks) {
    var correo = /^\w+([\.-]?\w+)*@(?:|hotmail|outlook|yahoo|live|gmail)\.(?:|com|es)+$/.test(valor.toLowerCase());
    var treFalse = false;
    if (correo == true) {
        tanks.innerHTML = "";
    } else {
        tanks.innerHTML = "La dirección de email es incorrecta.";
        treFalse = true;
    }
    return treFalse;
}

function validarContraseña(valor, tanks) {
    console.log("valor: ", valor);
    var contraseña = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/.test(valor);
    console.log("contraseña: ", contraseña);
    var treFalse = false;
    if (contraseña == true) {
        tanks.innerHTML = "";
    } else {
        tanks.innerHTML = "*Minimo 8 caracteres...*Maximo 15...*Al menos una letra mayúscula...*Al menos una letra minucula...*Al menos un dígito...*No espacios en blanco...*Al menos 1 caracter especial";
        treFalse = true;
    }
    return treFalse;
}

$('#CrearDepart #dep_CodeDC').on('keypress', function () {
    $('#CrearDepart #dep_CodeDC').css("border-color", "#eee");
});
$('#CrearDepart #dep_DescriptionDC').on('keypress', function () {
    $('#CrearDepart #dep_DescriptionDC').css("border-color", "#eee");
});
$('#CrearDepart #DropDownPaisDC').on('change', function () {
    $('#CrearDepart #DropDownPaisDC').css("border-color", "#eee");
});



