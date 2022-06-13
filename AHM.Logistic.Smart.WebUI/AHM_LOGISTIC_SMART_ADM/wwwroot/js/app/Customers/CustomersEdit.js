$('#frmEditCustomer').on('submit', function () {
    var result = ValidateEditFrmCustomer();
    if (result == true) {
        var data = [
            { name: "cus_Id", value: $('#frmEditCustomer #cus_Id').val() },
            { name: "cus_AssignedUser", value: $('#frmEditCustomer #SelectUsuario2').val() },
            { name: "tyCh_Id", value: $('#frmEditCustomer #tyCh_Id').val() },
            { name: "cus_Name", value: $('#frmEditCustomer #cus_Name').val() },
            { name: "cus_RTN", value: $('#frmEditCustomer #cus_RTN').val() },
            { name: "cus_Address", value: $('#frmEditCustomer #cus_Address').val() },
            { name: "dep_Id", value: $('#frmEditCustomer #SelectDepartments2').val() },
            { name: "mun_Id", value: $('#frmEditCustomer #SelectMunicipalities2').val() },
            { name: "cus_Email", value: $('#frmEditCustomer #cus_Email').val() },
            { name: "cus_Phone", value: $('#frmEditCustomer #cus_Phone').val() },
            { name: "cus_AnotherPhone", value: $('#frmEditCustomer #cus_AnotherPhone').val() },
            { name: "cus_IdUserCreate", value: TempUserDefault },
            { name: "cus_IdUserModified", value: TempUserDefault },
            { name: "cus_DateModified", value: TempUserDefault },         ];
        $.ajax({
            type: "POST",
            url: BaseUrl + "/Customers/Edit",
            data: data,
            //contentType: "application/json; charset=utf-8",
            /*dataType: "json",*/
            success: function (data) {
                var message = data.message;
                if (message.includes("An error has occurred while processing the request.")) {
                    Swal.fire({
                        width: '20%',
                        height: '20%',
                        title: 'Error',
                        text: 'Se perdío conexión con el servidor',
                        icon: 'warning',
                        confirmButtonColor: '#3085d6',
                    });
                    setTimeout(function () {
                        //location.reload("https://localhost:44339/persons/index");
                    }, 1500)
                }
                if (message.includes("Operation completed successfully.")) {
                    Swal.fire({
                        width: '20%',
                        height: '20%',
                        title: 'Exito',
                        text: 'Registro actualizado correctamente',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                    });
                    setTimeout(function () {
                        location.assign("https://localhost:44339/Customers/Index");
                    }, 1500)
                }
            },
        });
    }
    return false;

});
function ValidateEditFrmCustomer() {
    var result = true;
    var message = "";
    //llamar los texbox y combobox
    var cus_AssignedUser = $('#frmEditCustomer #SelectUsuario2').val();
    var tyCh_Id = $('#frmEditCustomer #tyCh_Id').val();
    var cus_Name = $('#frmEditCustomer #cus_Name').val();
    var cus_RTN = $('#frmEditCustomer #cus_RTN').val();
    var cus_Address = $('#frmEditCustomer #cus_Address').val();
    var SelectDepartments2 = $('#frmEditCustomer #SelectDepartments2').val();
    var SelectMunicipalities2 = $('#frmEditCustomer #SelectMunicipalities2').val();
    var cus_Email = $('#frmEditCustomer #cus_Email').val();
    var cus_Phone = $('#frmEditCustomer #cus_Phone').val();
    var cus_AnotherPhone = $('#frmEditCustomer #cus_AnotherPhone').val();

    //validaciones
    if (cus_AssignedUser === "0") { //validacion de AssignedUser
        message = '<span style="color: red;">*El Campo Codigo de Usuario es Requerido</span>';
        $('#frmEditCustomer #SelectUsuario2').after($(message).fadeOut(4000));
        $('#frmEditCustomer #SelectUsuario2').css("border-color", "red");
        result = false;
    }//validacion de AssignedUser

    if (tyCh_Id === "0") {
        message = '<span style="color: red;">*El Campo Tipo de Canal Requerido</span>';
        $('#frmEditCustomer #tyCh_Id').after($(message).fadeOut(4000));
        $('#frmEditCustomer #tyCh_Id').css("border-color", "red");
        result = false;
    }//validacion de tyCh_Id

    if (cus_Name === "") {
        message = '<span style="color: red;">*El Campo Nonbre es Requerido</span>';
        $('#frmEditCustomer #cus_Name').after($(message).fadeOut(4000));
        $('#frmEditCustomer #cus_Name').css("border-color", "red");
        result = false;
    }//validacion de Nombre blanco

    if (cus_Name.length > 200) {
        message = '<span style="color: red;">*El campo Nombre contiene Demasiados Caracteres</span>';
        $('#frmEditCustomer #cus_Name').after($(message).fadeOut(4000));
        $('#frmEditCustomer #cus_Name').css("border-color", "red");
        result = false;
    }//validacion de nombre muchos

    if (cus_Name.length < 3) {
        if (cus_Name != "") {
            message = '<span style="color: red;">*El campo nombre contiene muy pocos Caracteres</span>';
            $('#frmEditCustomer #cus_Name').after($(message).fadeOut(4000));
            $('#frmEditCustomer #cus_Name').css("border-color", "red");
            result = false;
        }

    }//validacion de nombre pocos

    if (cus_RTN === "") {
        message = '<span style="color: red;">*El Campo RTN Requerido</span>';
        $('#frmEditCustomer #cus_RTN').after($(message).fadeOut(4000));
        $('#frmEditCustomer #cus_RTN').css("border-color", "red");
        result = false;
    }//validacion de RTN BLANCO

    if (cus_RTN.length > 13) {
        message = '<span style="color: red;">*El campo RTN contiene Demasiados Caracteres</span>';
        $('#frmEditCustomer #cus_RTN').after($(message).fadeOut(4000));
        $('#frmEditCustomer #cus_RTN').css("border-color", "red");
        result = false;
    }//validacion de RTN MUCHOS

    if (cus_RTN.length < 5) {
        if (cus_RTN != "") {
            message = '<span style="color: red;">*El campo RTN contiene muy pocos Caracteres</span>';
            $('#frmEditCustomer #cus_RTN').after($(message).fadeOut(4000));
            $('#frmEditCustomer #cus_RTN').css("border-color", "red");
            result = false;
        }
    }//validacion de RTN POCOS

    if (cus_Address === "") {
        message = '<span style="color: red;">*El Campo Dirección Requerido</span>';
        $('#frmEditCustomer #cus_Address').after($(message).fadeOut(4000));
        $('#frmEditCustomer #cus_Address').css("border-color", "red");
        result = false;
    }//validacion de DIRECCION BLANCO

    if (cus_Address.length > 200) {
        message = '<span style="color: red;">*El campo Dirección contiene Demasiados Caracteres</span>';
        $('#frmEditCustomer #cus_Address').after($(message).fadeOut(4000));
        $('#frmEditCustomer #cus_Address').css("border-color", "red");
        result = false;
    }//validacion de DIRECCION muchos

    if (cus_Address.length < 20) {
        if (cus_Address != "") {
            message = '<span style="color: red;">*El campo Dirección contiene muy pocos Caractere</span>';
            $('#frmEditCustomer #cus_Address').after($(message).fadeOut(4000));
            $('#frmEditCustomer #cus_Address').css("border-color", "red");
            result = false;
        }

    }//validacion de DIRECCION pocos

    if (SelectDepartments2 === "0") {
        message = '<span style="color: red;">*El Campo Departamento Requerido</span>';
        $('#frmEditCustomer #SelectDepartments2').after($(message).fadeOut(4000));
        $('#frmEditCustomer #SelectDepartments2').css("border-color", "red");
        result = false;
    }//validacion de departamento

    if (SelectMunicipalities2 === "0") {
        message = '<span style="color: red;">*El Campo Municipio Requerido</span>';
        $('#frmEditCustomer #SelectMunicipalities2').after($(message).fadeOut(4000));
        $('#frmEditCustomer #SelectMunicipalities2').css("border-color", "red");
        result = false;
    }//validacion de Municipios

    if (cus_Email === "") {
        message = '<span style="color: red;">*El Campo Email Requerido</span>';
        $('#frmEditCustomer #cus_Email').after($(message).fadeOut(4000));
        $('#frmEditCustomer #cus_Email').css("border-color", "red");
        result = false;
    }//validacion de email blanco

    if (cus_Email.length > 100) {
        message = '<span style="color: red;">*El campo Email contiene Demasiados Caracteres</span>';
        $('#frmEditCustomer #cus_Email').after($(message).fadeOut(4000));
        $('#frmEditCustomer #cus_Email').css("border-color", "red");
        result = false;
    }//validacion de email muchos

    if (cus_Email.length < 10) {
        if (cus_Email != "") {
            message = '<span style="color: red;">*El campo Email contiene muy pocos Caracteres</span>';
            $('#frmEditCustomer #cus_Email').after($(message).fadeOut(4000));
            $('#frmEditCustomer #cus_Email').css("border-color", "red");
            result = false;
        }

    }//validacion de email Pocos

    if (cus_Phone === "") {
        message = '<span style="color: red;">*El Campo Celular Requerido</span>';
        $('#frmEditCustomer #cus_Phone').after($(message).fadeOut(4000));
        $('#frmEditCustomer #cus_Phone').css("border-color", "red");
        result = false;
    }//validacion telefono blanco

    if (cus_Phone.length > 11) {
        message = '<span style="color: red;">*El campo Departamento contiene Demasiados Caracteres</span>';
        $('#frmEditCustomer #cus_Phone').after($(message).fadeOut(4000));
        $('#frmEditCustomer #cus_Phone').css("border-color", "red");
        result = false;
    }//validacion telefono muchos

    if (cus_Phone.length < 8) {
        if (cus_Phone != "") {
            message = '<span style="color: red;">*El campo Telefono contiene muy pocos Caracteres</span>';
            $('#frmEditCustomer #cus_Phone').after($(message).fadeOut(4000));
            $('#frmEditCustomer #cus_Phone').css("border-color", "red");
            result = false;
        }

    }//validacion telefono poco

    if (cus_AnotherPhone === "") {
        message = '<span style="color: red;">*El Campo Otro Telefono Requerido</span>';
        $('#frmEditCustomer #cus_AnotherPhone').after($(message).fadeOut(4000));
        $('#frmEditCustomer #cus_AnotherPhone').css("border-color", "red");
        result = false;
    }//validacion de otro celular blanco

    if (cus_AnotherPhone.length > 11) {
        message = '<span style="color: red;">*El campo Otro Telefono contiene Demasiados Caracteres</span>';
        $('#frmEditCustomer #cus_AnotherPhone').after($(message).fadeOut(4000));
        $('#frmEditCustomer #cus_AnotherPhone').css("border-color", "red");
        result = false;
    }//validacion de otro celular mucho

    if (cus_AnotherPhone.length < 8) {
        if (cus_AnotherPhone != "") {
            message = '<span style="color: red;">*El campo Otro Telefono contiene muy pocos Caracteres</span>';
            $('#frmEditCustomer #cus_AnotherPhone').after($(message).fadeOut(4000));
            $('#frmEditCustomer #cus_AnotherPhone').css("border-color", "red");
            result = false;
        }

    }//validacion de otro celular poco

    return result;
}

$('#frmEditCustomer #SelectUsuario2').on('change', function () {
    $('#frmEditCustomer #SelectUsuario2').css("border-color", "#eee");
});//ID ASIGNADO

$('#frmEditCustomer #tyCh_Id').on('change', function () {
    $('#frmEditCustomer #tyCh_Id').css("border-color", "#eee");
});//ESTADO

$('#frmEditCustomer #cus_Name').on('change', function () {
    $('#frmEditCustomer #cus_Name').css("border-color", "#eee");
});//NOMBRE

$('#frmEditCustomer #cus_RTN').on('keypress', function () {
    $('#frmEditCustomer #cus_RTN').css("border-color", "#eee");
});//RTN

$('#frmEditCustomer #cus_Address').on('change', function () {
    $('#frmEditCustomer #cus_Address').css("border-color", "#eee");
});//direccion

$('#frmEditCustomer #SelectDepartments2').on('change', function () {
    $('#frmEditCustomer #SelectDepartments2').css("border-color", "#eee");
});//departamento

$('#frmEditCustomer #SelectMunicipalities2').on('change', function () {
    $('#frmEditCustomer #SelectMunicipalities2').css("border-color", "#eee");
});//municipio

$('#frmEditCustomer #cus_Email').on('change', function () {
    $('#frmEditCustomer #cus_Email').css("border-color", "#eee");
});//email

$('#frmEditCustomer #cus_Phone').on('keypress', function () {
    $('#frmEditCustomer #cus_Phone').css("border-color", "#eee");
});//telefono

$('#frmEditCustomer #cus_AnotherPhone').on('change', function () {
    $('#frmEditCustomer #cus_AnotherPhone').css("border-color", "#eee");
});//otro telefono
