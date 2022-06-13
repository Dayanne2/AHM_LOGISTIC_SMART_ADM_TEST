$(document).ready(function () {
    GetOccupationsListCreateContacts();
    GetCustomerListCreateContacts();
});

$("#btnCreateContacts").click(function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var data = [
        { name: "cont_Name", value: $("#cont_Name").val() },
        { name: "cont_LastName", value: $("#cont_LastName").val() },
        { name: "cont_Email", value: $("#cont_Email").val() },
        { name: "cont_Phone", value: $("#cont_Phone").val() },
        { name: "occ_Id", value: $("#DropDownOcupaciones").val() },
        { name: "cus_Id", value: $("#DropDownCustomers").val() },

        { name: "cont_IdUserCreate", value: TempUserDefault },
        { name: "cont_IdUserModified", value: null },
    ];
    //Insertar el dato
    $.ajax({
        type: "POST",
        url: BaseUrl + "/Contacts/Create",
        data: data,
        //contentType: "application/json; charset=utf-8",
        /*dataType: "json",*/
    }).done(function (data) {
        if (data.success == true) {
            window.location.href = "/Contacts/Index";
        }

    }).fail(function () {
        //mostrar alerta en caso de error
        console.log("Error al cargar los datos");
    });
});


function GetOccupationsListCreateContacts() {

    $.ajax({
        type: "GET",
        url: BaseUrl + "/Occupation/OccupationList",
    }).done(function (data) {
        console.log(data)
        //Vaciar el dropdownlist
        $("#CreateContacts #DropDownOcupaciones").empty();
        //variable que almacena las opciones
        var NewOption = `<option value="0" disabled=""> Por favor seleccione una opción... </option>`;

        data.data.forEach(function (item, index, array) {
            NewOption += `<option value="${item.occ_Id}"> ${item.occ_Description} </option>`;
        });

        //Agregar las opciones al dropdownlist
        $("#CreateContacts #DropDownOcupaciones").append(NewOption);

    }).fail(function () {
        //mostrar alerta en caso de error
        console.log("Error al cargar las ocupaciones");
    });
}

function GetCustomerListCreateContacts() {
    $.ajax({
        type: "GET",
        url: BaseUrl + "/Customers/CustomersList",
    }).done(function (data) {
        console.log(data.data);
        //Vaciar el dropdownlist
        $("#DropDownCustomers").empty();
        //variable que almacena las opciones
        var NewOption = `<option value="0" disabled=""> Por favor seleccione una opción... </option>`;

        data.data.forEach(function (item, index, array) {
            NewOption += `<option value="${item.cus_Id}"> ${item.cus_Name} </option>`;
        });

        //Agregar las opciones al dropdownlist
        $("#CreateContacts #DropDownCustomers").append(NewOption);

    }).fail(function () {
        //mostrar alerta en caso de error
        console.log("Error al cargar las customers");
    });
}