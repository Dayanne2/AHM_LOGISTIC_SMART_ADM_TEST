$('#frmCreateProducts').on('submit', function (e) {
    var result = ValidateFrmProducts();
    var pro_PurchasePrice = $('#frmCreateProducts #pro_PurchasePrice').val();
    pro_PurchasePrice = pro_PurchasePrice.replace(/,/g, "");
    var pro_SalesPrice = $('#frmCreateProducts #pro_SalesPrice').val();
    pro_SalesPrice = pro_SalesPrice.replace(/,/g, "");
    var pro_Stock = $('#frmCreateProducts #pro_Stock').val();
    pro_Stock = pro_SalesPrice.replace(/,/g, "");
    if (result == true) {
        var data = [
            { name: "pro_Description", value: $('#frmCreateProducts #pro_Description').val() },
            { name: "pro_PurchasePrice", value: parseFloat(pro_PurchasePrice) },
            { name: "pro_SalesPrice", value: parseFloat(pro_SalesPrice) },
            { name: "pro_Stock", value: parseFloat(pro_Stock) },
            { name: "pro_ISV", value: $('#frmCreateProducts #pro_ISV').val() },
            { name: "uni_Id", value: $('#frmCreateProducts #uni_Id').val() },
            { name: "scat_Id", value: $('#frmCreateProducts #SelectSubcategories').val() },
            { name: "pro_IdUserCreate", value: TempUserDefault },
            { name: "pro_IdUserModified", value: null },
        ];

        $.ajax({
            type: "POST",
            url: BaseUrl + "/Products/Create",
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
                        text: 'Se perdíó conexión con el servidor',
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

$('#frmCreateProducts #pro_PurchasePrice').keyup(function (e) {
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

$('#frmCreateProducts #pro_SalesPrice').keyup(function (e) {
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

$('#frmCreateProducts #pro_Stock').keyup(function (e) {
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


function ValidateFrmProducts() {
    var result = false;
    var count = 0;
    var pro_Description = $('#frmCreateProducts #pro_Description');
    var pro_PurchasePrice = $('#frmCreateProducts #pro_PurchasePrice');
    var pro_SalesPrice = $('#frmCreateProducts #pro_SalesPrice');
    var pro_Stock = $('#frmCreateProducts #pro_Stock');
    var pro_ISV = $('#frmCreateProducts #pro_ISV');
    var uni_Id = $('#frmCreateProducts #uni_Id');
    var SelectCategories = $('#frmCreateProducts #SelectCategories');
    var SelectSubcategories = $('#frmCreateProducts #SelectSubcategories');

    result = MessagesError(pro_Description, 8, 200, 'Descripcion');
    if (result == true) { count++;}
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
}

$('#frmCreateProducts #pro_Description').on('keypress', function () {
    $('#frmCreateProducts #pro_Description').css("border-color", "#eee");
});
$('#frmCreateProducts #pro_PurchasePrice').on('keypress', function () {
    $('#frmCreateProducts #pro_PurchasePrice').css("border-color", "#eee");
});
$('#frmCreateProducts #pro_SalesPrice').on('keypress', function () {
    $('#frmCreateProducts #pro_SalesPrice').css("border-color", "#eee");
});
$('#frmCreateProducts #pro_Stock').on('keypress', function () {
    $('#frmCreateProducts #pro_Stock').css("border-color", "#eee");
});
$('#frmCreateProducts #pro_ISV').on('keypress', function () {
    $('#frmCreateProducts #pro_ISV').css("border-color", "#eee");
});
$('#frmCreateProducts #uni_Id').on('change', function () {
    $('#frmCreateProducts #uni_Id').css("border-color", "#eee");
});
$('#frmCreateProducts #SelectCategories').on('change', function () {
    $('#frmCreateProducts #SelectCategories').css("border-color", "#eee");
});
$('#frmCreateProducts #SelectSubcategories').on('change', function () {
    $('#frmCreateProducts #SelectSubcategories').css("border-color", "#eee");
});