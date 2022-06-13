$('#frmCreateCustomer').on('submit', function () {
    var result = ValidateFrmCustomer();
    if (result == true) {
        var data = [
            { name: "cus_AssignedUser", value: $('#frmCreateCustomer #SelectUsuario2').val() },
            { name: "tyCh_Id", value: $('#frmCreateCustomer #tyCh_Id').val() },
            { name: "cus_Name", value: $('#frmCreateCustomer #cus_Name').val() },
            { name: "cus_RTN", value: $('#frmCreateCustomer #cus_RTN').val() },
            { name: "cus_Address", value: $('#frmCreateCustomer #cus_Address').val() },
            { name: "dep_Id", value: $('#frmCreateCustomer #SelectDepartments2').val() },
            { name: "mun_Id", value: $('#frmCreateCustomer #SelectMunicipalities2').val() },
            { name: "cus_Email", value: $('#frmCreateCustomer #cus_Email').val() },
            { name: "cus_Phone", value: $('#frmCreateCustomer #cus_Phone').val() },
            { name: "cus_AnotherPhone", value: $('#frmCreateCustomer #cus_AnotherPhone').val() },
            { name: "cus_IdUserCreate", value: TempUserDefault },
            { name: "cus_IdUserModified", value: TempUserDefault },
        ];
        $.ajax({
            type: "POST",
            url: BaseUrl + "/Customers/Create",
            data: data,
            //contentType: "application/json; charset=utf-8",
            //dataType: "json",
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
                    }, 1500)
                }
                if (message.includes("Operation completed successfully.")) {
                    Swal.fire({
                        width: '20%',
                        height: '20%',
                        title: 'Exito',
                        text: 'Registro agregado correctamente',
                        icon: 'success',
                        //confirmButtonColor: '#3085d6',
                    });
                    setTimeout(function () {
                 
                        location.assign("https://localhost:44339/customers/edit/1");

                    }, 1500)
                }
            },
        });
    }
    return false;
});          
function ValidateFrmCustomer() {
    var result = true;
    var message = "";
    //llamar los texbox y combobox
    var cus_AssignedUser = $('#frmCreateCustomer #SelectUsuario2').val();
    var tyCh_Id = $('#frmCreateCustomer #tyCh_Id').val();
    var cus_Name = $('#frmCreateCustomer #cus_Name').val();
    var cus_RTN = $('#frmCreateCustomer #cus_RTN').val();
    var cus_Address = $('#frmCreateCustomer #cus_Address').val();
    var SelectDepartments2 = $('#frmCreateCustomer #SelectDepartments2').val();
    var SelectMunicipalities2 = $('#frmCreateCustomer #SelectMunicipalities2').val();
    var cus_Email = $('#frmCreateCustomer #cus_Email').val();
    var cus_Phone = $('#frmCreateCustomer #cus_Phone').val();
    var cus_AnotherPhone = $('#frmCreateCustomer #cus_AnotherPhone').val();

   //validaciones
    if (cus_AssignedUser === "0") { //validacion de AssignedUser
        message = '<span style="color: red;">*El Campo Codigo de Usuario es Requerido</span>';
        $('#frmCreateCustomer #SelectUsuario2').after($(message).fadeOut(4000));
        $('#frmCreateCustomer #SelectUsuario2').css("border-color", "red");
        result = false;
    }//validacion de AssignedUser

    if (tyCh_Id === "0") {
        message = '<span style="color: red;">*El Campo Tipo de Canal Requerido</span>';
        $('#frmCreateCustomer #tyCh_Id').after($(message).fadeOut(4000));
        $('#frmCreateCustomer #tyCh_Id').css("border-color", "red");
        result = false;
    }//validacion de tyCh_Id

    if (cus_Name === "") {
        message = '<span style="color: red;">*El Campo Nonbre es Requerido</span>';
        $('#frmCreateCustomer #cus_Name').after($(message).fadeOut(4000));
        $('#frmCreateCustomer #cus_Name').css("border-color", "red");
        result = false;
    }//validacion de Nombre blanco

    if (cus_Name.length > 200) {
        message = '<span style="color: red;">*El campo Nombre contiene Demasiados Caracteres</span>';
        $('#frmCreateCustomer #cus_Name').after($(message).fadeOut(4000));
        $('#frmCreateCustomer #cus_Name').css("border-color", "red");
        result = false;
    }//validacion de nombre muchos

    if (cus_Name.length < 3) {
        if (cus_Name != "") {
            message = '<span style="color: red;">*El campo nombre contiene muy pocos Caracteres</span>';
            $('#frmCreateCustomer #cus_Name').after($(message).fadeOut(4000));
            $('#frmCreateCustomer #cus_Name').css("border-color", "red");
            result = false;
        }

    }//validacion de nombre pocos

    if (cus_RTN === "") {
        message = '<span style="color: red;">*El Campo RTN Requerido</span>';
        $('#frmCreateCustomer #cus_RTN').after($(message).fadeOut(4000));
        $('#frmCreateCustomer #cus_RTN').css("border-color", "red");
        result = false;
    }//validacion de RTN BLANCO

    if (cus_RTN.length > 13) {
        message = '<span style="color: red;">*El campo RTN contiene Demasiados Caracteres</span>';
        $('#frmCreateCustomer #cus_RTN').after($(message).fadeOut(4000));
        $('#frmCreateCustomer #cus_RTN').css("border-color", "red");
        result = false;
    }//validacion de RTN MUCHOS

    if (cus_RTN.length < 5) {
        if (cus_RTN != "") {
            message = '<span style="color: red;">*El campo RTN contiene muy pocos Caracteres</span>';
            $('#frmCreateCustomer #cus_RTN').after($(message).fadeOut(4000));
            $('#frmCreateCustomer #cus_RTN').css("border-color", "red");
            result = false;
        }      
    }//validacion de RTN POCOS

    if (cus_Address === "") {
        message = '<span style="color: red;">*El Campo Dirección Requerido</span>';
        $('#frmCreateCustomer #cus_Address').after($(message).fadeOut(4000));
        $('#frmCreateCustomer #cus_Address').css("border-color", "red");
        result = false;
    }//validacion de DIRECCION BLANCO

    if (cus_Address.length > 200) {
        message = '<span style="color: red;">*El campo Dirección contiene Demasiados Caracteres</span>';
        $('#frmCreateCustomer #cus_Address').after($(message).fadeOut(4000));
        $('#frmCreateCustomer #cus_Address').css("border-color", "red");
        result = false;
    }//validacion de DIRECCION muchos

    if (cus_Address.length < 20) {
        if (cus_Address != "") {
            message = '<span style="color: red;">*El campo Dirección contiene muy pocos Caractere</span>';
        $('#frmCreateCustomer #cus_Address').after($(message).fadeOut(4000));
        $('#frmCreateCustomer #cus_Address').css("border-color", "red");
        result = false;
        }
       
    }//validacion de DIRECCION pocos

    if (SelectDepartments2 === "0") {
        message = '<span style="color: red;">*El Campo Departamento Requerido</span>';
        $('#frmCreateCustomer #SelectDepartments2').after($(message).fadeOut(4000));
        $('#frmCreateCustomer #SelectDepartments2').css("border-color", "red");
        result = false;
    }//validacion de departamento

    if (SelectMunicipalities2 === "0") {
        message = '<span style="color: red;">*El Campo Municipio Requerido</span>';
        $('#frmCreateCustomer #SelectMunicipalities2').after($(message).fadeOut(4000));
        $('#frmCreateCustomer #SelectMunicipalities2').css("border-color", "red");
        result = false;
    }//validacion de Municipios

    if (cus_Email === "") {
        message = '<span style="color: red;">*El Campo Email Requerido</span>';
        $('#frmCreateCustomer #cus_Email').after($(message).fadeOut(4000));
        $('#frmCreateCustomer #cus_Email').css("border-color", "red");
        result = false;
    }//validacion de email blanco

    if (cus_Email.length > 100) {
        message = '<span style="color: red;">*El campo Email contiene Demasiados Caracteres</span>';
        $('#frmCreateCustomer #cus_Email').after($(message).fadeOut(4000));
        $('#frmCreateCustomer #cus_Email').css("border-color", "red");
        result = false;
    }//validacion de email muchos

    if (cus_Email.length < 10) {
        if (cus_Email != "") {
            message = '<span style="color: red;">*El campo Email contiene muy pocos Caracteres</span>';
        $('#frmCreateCustomer #cus_Email').after($(message).fadeOut(4000));
        $('#frmCreateCustomer #cus_Email').css("border-color", "red");
        result = false;
        }
       
    }//validacion de email Pocos

    if (cus_Phone === "") {
        message = '<span style="color: red;">*El Campo Celular Requerido</span>';
        $('#frmCreateCustomer #cus_Phone').after($(message).fadeOut(4000));
        $('#frmCreateCustomer #cus_Phone').css("border-color", "red");
        result = false;
    }//validacion telefono blanco

    if (cus_Phone.length > 11) {
        message = '<span style="color: red;">*El campo Departamento contiene Demasiados Caracteres</span>';
        $('#frmCreateCustomer #cus_Phone').after($(message).fadeOut(4000));
        $('#frmCreateCustomer #cus_Phone').css("border-color", "red");
        result = false;
    }//validacion telefono muchos

    if (cus_Phone.length < 8) {
        if (cus_Phone != "") {
            message = '<span style="color: red;">*El campo Telefono contiene muy pocos Caracteres</span>';
        $('#frmCreateCustomer #cus_Phone').after($(message).fadeOut(4000));
        $('#frmCreateCustomer #cus_Phone').css("border-color", "red");
        result = false;
        }
     
    }//validacion telefono poco

    if (cus_AnotherPhone === "") {
        message = '<span style="color: red;">*El Campo Otro Telefono Requerido</span>';
        $('#frmCreateCustomer #cus_AnotherPhone').after($(message).fadeOut(4000));
        $('#frmCreateCustomer #cus_AnotherPhone').css("border-color", "red");
        result = false;
    }//validacion de otro celular blanco

    if (cus_AnotherPhone.length > 11) {
        message = '<span style="color: red;">*El campo Otro Telefono contiene Demasiados Caracteres</span>';
        $('#frmCreateCustomer #cus_AnotherPhone').after($(message).fadeOut(4000));
        $('#frmCreateCustomer #cus_AnotherPhone').css("border-color", "red");
        result = false;
    }//validacion de otro celular mucho

    if (cus_AnotherPhone.length < 8) {
        if (cus_AnotherPhone != "") {
            message = '<span style="color: red;">*El campo Otro Telefono contiene muy pocos Caracteres</span>';
        $('#frmCreateCustomer #cus_AnotherPhone').after($(message).fadeOut(4000));
        $('#frmCreateCustomer #cus_AnotherPhone').css("border-color", "red");
        result = false;
        }
      
    }//validacion de otro celular poco

    return result;
}

$('#frmCreateCustomer #SelectUsuario2').on('change', function () {
    $('#frmCreateCustomer #SelectUsuario2').css("border-color", "#eee");
});//ID ASIGNADO

$('#frmCreateCustomer #tyCh_Id').on('change', function () {
    $('#frmCreateCustomer #tyCh_Id').css("border-color", "#eee");
});//ESTADO

$('#frmCreateCustomer #cus_Name').on('keypress', function () {
    $('#frmCreateCustomer #cus_Name').css("border-color", "#eee");
});//NOMBRE

$('#frmCreateCustomer #cus_RTN').on('change', function () {
    $('#frmCreateCustomer #cus_RTN').css("border-color", "#eee");
});//RTN

$('#frmCreateCustomer #cus_Address').on('change', function () {
    $('#frmCreateCustomer #cus_Address').css("border-color", "#eee");
});//direccion

$('#frmCreateCustomer #SelectDepartments2').on('change', function () {
    $('#frmCreateCustomer #SelectDepartments2').css("border-color", "#eee");
});//departamento

$('#frmCreateCustomer #SelectMunicipalities2').on('change', function () {
    $('#frmCreateCustomer #SelectMunicipalities2').css("border-color", "#eee");
});//municipio

$('#frmCreateCustomer #cus_Email').on('change', function () {
    $('#frmCreateCustomer #cus_Email').css("border-color", "#eee");
});//email

$('#frmCreateCustomer #cus_Phone').on('keypress', function () {
    $('#frmCreateCustomer #cus_Phone').css("border-color", "#eee");
});//telefono

$('#frmCreateCustomer #cus_AnotherPhone').on('change', function () {
    $('#frmCreateCustomer #cus_AnotherPhone').css("border-color", "#eee");
});//otro telefono


//funciones para obtener los listados
function GetDepartmentsList(id) {
    $.ajax({
        type: "GET",
        url: BaseUrl + "/ User/UsersList",
    }).done(function (data) {

        //Vaciar el dropdownlist
        $("#frmCreateCustomer #SelectUsuario2").empty();
        //variable que almacena las opciones
        var NewOption = `<option value="0" disabled=""> Por favor seleccione una opción... </option>`;
        data.data.forEach(function (item, index, array) {

            NewOption += `<option value="${item.usu_Id}" selected> ${item.usu_UserName} </option>`;
        });

        //Agregar las opciones al dropdownlist
        $("#frmCreateCustomer #SelectUsuario2").append(NewOption);

    }).fail(function () {
        //mostrar alerta en caso de error
        console.log("Error al cargar las listas");
    });
}