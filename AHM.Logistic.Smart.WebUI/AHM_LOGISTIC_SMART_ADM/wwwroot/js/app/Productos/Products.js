var id = $("#subcategories").val();
var categorie = null; 
$(document).ready(function () {
    GetCategoriesListCreate();
    GetSubcategoriesListCreate()
});

function GetCategoriesListCreate(categorie) {
    $.ajax({
        type: "GET",
        url: BaseUrl + "/Categories/CategoriesList",
    }).done(function (data, index) {
        //Vaciar el dropdownlist
        $("#SelectCategories").empty();
        /*var id = $("#categories").val();*/
        //variable que almacena las opciones
        var NewOption = "<option value=" + 0 + "> Por favor seleccione una opción... </option>";

        data.data.forEach(function (item) {
            if (item.cat_Id == categorie) {
                NewOption += "<option  value=" + item.cat_Id + " selected>" + item.cat_Description + "</option>";
            }
            else {
                NewOption += "<option  value=" + item.cat_Id + ">" + item.cat_Description + "</option>";
            }
        });

        //Agregar las opciones al dropdownlist
        $("#SelectCategories").append(NewOption);

    }).fail(function () {
        //mostrar alerta en caso de error
        console.log("Error al cargar los Departamentos");
    });
}

$("#SelectCategories").on('change', function () {
    $("#SelectSubcategories").attr('disabled', false);
    id = 0;
    GetSubcategoriesListCreate();
});

function GetSubcategoriesListCreate() {
    var value = $("#SelectCategories").val();
    if (value == null) {
        $.ajax({
            type: "GET",
            url: BaseUrl + "/SubCategories/SubCategoriesList",
        }).done(function (data, index) {
            data.data.forEach(function (item) {
                if (item.scat_Id == id) {
                    categorie = item.cat_Id
                    GetCategoriesListCreate(categorie)
                }
            });
        });
    }
    $.ajax({
        type: "GET",
        url: BaseUrl + "/SubCategories/SubCategoriesList",
    }).done(function (data, index) {
        //Vaciar el dropdownlist
        $("#SelectSubcategories").empty();
        //variable que almacena las opciones
        var NewOption = "<option value=" + 0 + "> Por favor seleccione una opción... </option>";
        data.data.forEach(function (item) {
            if (item.scat_Id == id) {
                NewOption += "<option  value=" + item.scat_Id + "  selected>" + item.scat_Description + "</option>";
            }
            else {
                if (item.cat_Id == value) {
                    NewOption += "<option  value=" + item.scat_Id + ">" + item.scat_Description + "</option>";
                }
            }
        });

        //Agregar las opciones al dropdownlist
        $("#SelectSubcategories").append(NewOption);

    }).fail(function () {
        //mostrar alerta en caso de error
        console.log("Error al cargar los Municipios");
    });
}