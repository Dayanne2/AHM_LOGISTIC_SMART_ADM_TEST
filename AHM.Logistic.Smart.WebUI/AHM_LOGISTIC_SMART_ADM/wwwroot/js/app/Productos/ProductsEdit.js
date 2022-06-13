$('#frmEditProducts').on('submit', function () {
    var result = ValidateFrmEditProducts();
    var pro_PurchasePrice = $('#frmEditProducts #pro_PurchasePrice').val();
    pro_PurchasePrice = pro_PurchasePrice.replace(/,/g, "");
    var pro_SalesPrice = $('#frmEditProducts #pro_SalesPrice').val();
    pro_SalesPrice = pro_SalesPrice.replace(/,/g, "");
    var pro_Stock = $('#frmEditProducts #pro_Stock').val();
    pro_Stock = pro_SalesPrice.replace(/,/g, "");
    if (result == true) {
        var data = [
            { name: "pro_Description", value: $('#frmEditProducts #pro_Description').val() },
            { name: "pro_PurchasePrice", value: parseFloat(pro_PurchasePrice) },
            { name: "pro_SalesPrice", value: parseFloat(pro_SalesPrice) },
            { name: "pro_Stock", value: parseFloat(pro_Stock) },
            { name: "pro_ISV", value: $('#frmEditProducts #pro_ISV').val() },
            { name: "uni_Id", value: $('#frmEditProducts #uni_Id').val() },
            { name: "scat_Id", value: $('#frmEditProducts #SelectSubcategories').val() },
            { name: "pro_Id", value: $('#frmEditProducts #pro_Id').val() },
            { name: "pro_IdUserCreate", value: TempUserDefault },
            { name: "pro_IdUserModified", value: null },
        ];


        $.ajax({
            type: "POST",
            url: BaseUrl + "/Products/Edit",
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
                        location.assign("https://localhost:44339/products/index");
                    }, 1500)
                }
                if (message.includes("Operation completed successfully.")) {
                    Swal.fire({
                        width: '20%',
                        height: '20%',
                        title: '¡Exito!',
                        text: '¡Registro agregado correctamente!',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                    });
                    setTimeout(function () {
                        location.assign("https://localhost:44339/products/index");
                    }, 1500)
                }
            },
        });
    }
    return false;
});

$('#frmEditProducts #pro_PurchasePrice').keyup(function (e) {
    if (e.which >= 37 && e.which <= 40) {
        e.preventDefault();
    }

    $(this).val(function (index, value) {
        return value
            .replace(/\D/g, "")
            .replace(/([0-9])([0-9]{3})$/, '$1,$2')
            .replace(/\B(?=(\d{3})+(?!\d),?)/g, ",")
            ;
    });
});

$('#frmEditProducts #pro_SalesPrice').keyup(function (e) {
    if (e.which >= 37 && e.which <= 40) {
        e.preventDefault();
    }

    $(this).val(function (index, value) {
        return value
            .replace(/\D/g, "")
            .replace(/([0-9])([0-9]{3})$/, '$1,$2')
            .replace(/\B(?=(\d{3})+(?!\d),?)/g, ",")
            ;
    });
});

$('#frmEditProducts #pro_Stock').keyup(function (e) {
    if (e.which >= 37 && e.which <= 40) {
        e.preventDefault();
    }

    $(this).val(function (index, value) {
        return value
            .replace(/\D/g, "")
            .replace(/([0-9])([0-9]{3})$/, '$1,$2')
            .replace(/\B(?=(\d{3})+(?!\d),?)/g, ",")
            ;
    });
});


function ValidateFrmEditProducts() {
    var result = true;
    var count = 0;
    var pro_Description = $('#frmEditProducts #pro_Description');
    var pro_PurchasePrice = $('#frmEditProducts #pro_PurchasePrice');
    var pro_SalesPrice = $('#frmEditProducts #pro_SalesPrice');
    var pro_Stock = $('#frmEditProducts #pro_Stock');
    var pro_ISV = $('#frmEditProducts #pro_ISV');
    var uni_Id = $('#frmEditProducts #uni_Id');
    var SelectCategories = $('#frmEditProducts #SelectCategories');
    var SelectSubcategories = $('#frmEditProducts #SelectSubcategories');

    result = MessagesError(pro_Description, 8, 200, 'Descripcion');
    if (result == true) { count++; }
    result = MessagesError(pro_PurchasePrice, null, null, 'Precio de Compra');
    if (result == true) { count++; }
    result = MessagesError(pro_SalesPrice, null, null, 'Precio de Venta');
    if (result == true) { count++; }
    result = MessagesError(pro_Stock, null, null, 'Stock');
    if (result == true) { count++; }
    result = MessagesError(pro_ISV, null, null, 'ISV');
    if (result == true) { count++; }
    result = MessagesError(uni_Id, null, null, 'Medida de peso');
    if (result == true) { count++; }
    result = MessagesError(SelectCategories, null, null, 'Categorías');
    if (result == true) { count++; }
    result = MessagesError(SelectSubcategories, null, null, 'Subcategorías');
    if (result == true) { count++; }
    if (count == 8) {
        return result;
    }
    return false;

    return result;
}

$('#frmEditProducts #pro_Description').on('keypress', function () {
    $('#frmEditProducts #pro_Description').css("border-color", "#eee");
});
$('#frmEditProducts #pro_PurchasePrice').on('keypress', function () {
    $('#frmEditProducts #pro_PurchasePrice').css("border-color", "#eee");
});
$('#frmEditProducts #pro_SalesPrice').on('keypress', function () {
    $('#frmEditProducts #pro_SalesPrice').css("border-color", "#eee");
});
$('#frmEditProducts #pro_Stock').on('keypress', function () {
    $('#frmEditProducts #pro_Stock').css("border-color", "#eee");
});
$('#frmEditProducts #pro_ISV').on('keypress', function () {
    $('#frmEditProducts #pro_ISV').css("border-color", "#eee");
});
$('#frmEditProducts #uni_Id').on('change', function () {
    $('#frmEditProducts #uni_Id').css("border-color", "#eee");
});
$('#frmEditProducts #SelectCategories').on('change', function () {
    $('#frmEditProducts #SelectCategories').css("border-color", "#eee");
});
$('#frmEditProducts #SelectSubcategories').on('change', function () {
    $('#frmEditProducts #SelectSubcategories').css("border-color", "#eee");
});