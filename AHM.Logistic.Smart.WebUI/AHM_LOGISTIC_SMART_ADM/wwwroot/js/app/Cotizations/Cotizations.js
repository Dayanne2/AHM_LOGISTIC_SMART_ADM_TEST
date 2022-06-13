//DECLARACION DE VARIABLES
var Productos = [];
var ProductosDetail = [];
var Precios = [];
var precioUnidad = 0;
var total = 0;
var cont = 0;
var cont2 = 0;
var Descripcion = "";
/*-------*/
var Clientes = [];

var DeleteProducts = [];

//Variables de llenado
var cusId = 0;
var fecha;
var id = 0;
var idDet = 0;

//EJECUTAR FUNCIONES EN LA PRIMER CARGA DE LA PAGINA
$(document).ready(function () {
    //Obtener Id de de detalle
    StartIdDetail();
    Productos = [];
    //INICIAR FUNCIONES
    GetCustomersListCreate();
    GetProductsListCreate();
    GetCotizationsDetailList();
});

//INICIAR VARIABLE DE ID DETALLE
function StartIdDetail() {
    var url = window.location.pathname;
    id = url.substring(url.lastIndexOf('/') + 1);
    console.log(id);
};

//OBTENER LA LISTA DE CLIENTES PARA LLENAR EL DROP-DOWN
function GetCustomersListCreate() {
    $.ajax({
        type: "GET",
        url: BaseUrl + "/Customers/CustomersList",
    }).done(function (data, index) {
        //Vaciar el dropdownlist
        var valor = $("#valor").val();
        $("#SelectCustomers").empty();
        //variable que almacena las opciones
        var NewOption = "<option value=" + 0 + "> Por favor seleccione una opción... </option>";

        data.data.forEach(function (item) {

            Clientes.push({ id: item.cus_Id, email: item.cus_Email, rtn: item.cus_RTN, cel: item.cus_Phone, dir: item.cus_Address });

            if (item.cus_Id == cusId) {

                NewOption += "<option  value=" + item.cus_Id + " selected>" + item.cus_Name + "</option>";
                llenarData(item.cus_Id);
                
            }
            else {
                NewOption += "<option  value=" + item.cus_Id + ">" + item.cus_Name + "</option>";
            }
        });

        

        //Agregar las opciones al dropdownlist
        $("#SelectCustomers").append(NewOption);
        llenarData(id);
    }).fail(function () {
        //mostrar alerta en caso de error
        console.log("Error al cargar los Clientes");
    });

}


//OBTENER LOS DATOS DE COTIZACION POR ID PARA EL UPDATE
function GetCotizationList() {

    var url = window.location.pathname;
    var id = url.substring(url.lastIndexOf('/') + 1);

    $.ajax({
        type: "GET",
        url: BaseUrl + "/Quote/CustomersList",
    }).done(function (data, index) {
        

        data.data.forEach(function (item) {
            if (item.cot_Id == id) {
                cusId = item.cus_Id;
                fech = item.cot_DateValidUntil;
                fecha = Date.parse(fech);
            }
        });

    }).fail(function () {
        //mostrar alerta en caso de error
        console.log("Error al cargar la Cotizacion");
    });
}


//LLENAR LOS CAMPOS DE INFORMACION GENERAL DEL CLIENTE
function llenarData(id) {
    var idcus = $("#SelectCustomers").val();
    console.log(idcus);
    Clientes.forEach(function (item) {
        if (item.id == idcus || item.id == id) {

            document.getElementById("PersonEmail").innerHTML = item.email;
            document.getElementById("PersonRtn").innerHTML = item.rtn;
            document.getElementById("PersonTelefono").innerHTML = item.cel;
            document.getElementById("PersonDireccion").innerHTML = item.dir;
/*            $("#fechaexpiracion").val(fecha);*/
        }
    });
    console.log(fecha);
    //console.log(id);
    //console.log(Clientes);
}


//OBTENER LA LISTA DE PRODUCTOS PARA LLENAR EL DROP-DOWN
function GetProductsListCreate() {
    $.ajax({
        type: "GET",
        url: BaseUrl + "/Products/ProductsList",
    }).done(function (data, index) {
        //Vaciar el dropdownlist
        var valor = $("#valor").val();
        $("#SelectProduct").empty();
        //variable que almacena las opciones
        var NewOption = "<option value=" + 0 + "> Por favor seleccione una opción... </option>";

        data.data.forEach(function (item) {
            Precios.push({ id: item.pro_Id, descripcion: item.pro_Description, precio: item.pro_SalesPrice })
            if (item.scat_Id == 0) {
                NewOption += "<option  value=" + item.pro_Id + " selected>" + item.pro_Description + " - " + item.pro_SalesPrice + " Lps." + "</option>";
            }
            else {
                NewOption += "<option  value=" + item.pro_Id + ">" + item.pro_Description + " - " + item.pro_SalesPrice + " Lps." + "</option>";
            }
        });

        //Agregar las opciones al dropdownlist
        $("#SelectProduct").append(NewOption);
        GetCotizationList();
    }).fail(function () {
        //mostrar alerta en caso de error
        console.log("Error al cargar los Clientes");
    });
}

//AGREGAR LOS PRODUCTOS SELECCIONADOS A LA TABLA
function AddProductos() {
    var valor = $("#SelectProduct").val();
    /*var texto = valor2.options[valor2.selectedIndex].text;*/
    var cantidad = $("#Cant").val();
    var tablaProductos = "";

    //obtener el precio, descripcion y la suma de los totales de productos
    Precios.forEach(function (pre) {
        if (valor == pre.id) {
            precioUnidad = pre.precio;
            Descripcion = pre.descripcion;
            total += parseInt(pre.precio) * parseInt(cantidad);
        }
    });

    //Insertar el primer registro al objeto [Productos]
    if (cont == 0 && Productos.length == 0) {
        Productos.push({ id: parseInt(valor), canti: parseInt(cantidad), descripcion: Descripcion, precio: precioUnidad, total: parseInt(cantidad) * parseInt(precioUnidad) });
    }
    else {
        //Sumar las cantidades si encuentra el producto registrado en el objeto [Productos]
        Productos.forEach(function (item) {
            if (item.id == valor) {
                item.canti = parseInt(item.canti) + parseInt(cantidad);
                item.total = parseInt(item.canti) * parseInt(item.precio);
                cont2++;
            }
        });

        //Insertar el toda la informacion del producto si no lo encuentra en el objeto [Productos]
        if (cont2 == 0) {
            Productos.push({ id: parseInt(valor), canti: parseInt(cantidad), descripcion: Descripcion, precio: precioUnidad, total: parseInt(cantidad) * parseInt(precioUnidad) });
        }
    }

    //recorrer el objeto [Productos] y agregarlos a la variable
    Productos.forEach(function (item) {
        tablaProductos += "<tr><td style='text-align:center; color: #FFF'><div class='flex align-items-lg-start list-user-action'><a class='btn btn-sm btn-icon btn-primary' data-toggle='tooltip' data-placement='top' data-original-title='Delete' onclick='EliminarProductos(" + item.id + ")'><span class='btn-inner'><svg width='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' stroke='currentColor'><path d='M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'></path><path d='M20.708 6.23975H3.75' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'></path><path d='M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'></path></svg></span></a> | <a class='btn btn-sm btn-icon btn-dark' data-toggle='tooltip' data-placement='top' data-original-title='Generate' onclick='restarProductos(" + item.id + ")'><span class='btn-inner'><svg width='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' stroke='currentColor'><line x1='5' y1='12' x2='19' y2='12' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></line></svg></span></a ></div></td><td>" + item.canti + "</td><td>" + item.descripcion + "</td><td>" + item.precio + "</td><td>" + item.total + "</td></tr>";
    });

    console.log(Productos);
    console.log(Precios);
    console.log(cont);

    //Pitar los datos de las variables en la tabla y el total
    document.getElementById("tableContent").innerHTML = tablaProductos;
    document.getElementById("TotalCotization").innerHTML = total;
    $("#Cant").val("");
    $("#SelectProduct").val("0");
    cont++;
    cont2 = 0;
}


//REALIZAR REGISTRO A LA BASE DE DATOS
function InsertarCotizacion() {
    var cus = $("#SelectCustomers").val();
    var date = $("#fechaexpiracion").val();
    var InsertPro = [];
    Productos.forEach(function (pre) {
        InsertPro.push({
            "code_Id": 0,
            "code_Cantidad": parseInt(pre.canti),
            "pro_Id": parseInt(pre.id),
            "code_TotalPrice": pre.total,
        });
    });
    var InsertCoti = {
        "cot_Id": 0,
        "cus_Id": parseInt(cus),
        "cot_DateValidUntil": date,
        "sta_Id": 1,
        "cot_IdUserCreate": 1,
        "cot_IdUserModified": 0,
        "cot_details": InsertPro
    };

    $.ajax({
        type: "POST",
        url: BaseUrl + "/quote/create",
        data: InsertCoti,
        dataType: "json",
    }).done(function (data) {

        

    }).fail(function () {
        /*console.log("AndonyBolo")*/
        location.reload();

    });
    console.log(InsertCoti);
    console.log(InsertPro);
}


//RESTAR LA CANTIDAD DE PRODUCTOS SELECCIONADA
function restarProductos(id) {
    var tablaProductos2 = "";
    var cont = 0;
    var cont3 = 0;
    $("#tableContent").val("");
    Productos.forEach(function (item) {
        if (item.id == id) {
            item.canti = parseInt(item.canti) - 1;
            item.total = parseInt(item.canti) * parseInt(item.precio);
        }

        if (item.canti == 0) {
            Productos.splice(cont, 1);
            DeleteProducts.push({IdProduct: item.id});
        }

        cont++;
    });
    Productos.forEach(function (item2) {

        if (cont3 == 0) {
            total = parseInt(item2.canti) * parseInt(item2.precio);
        }
        else {
            total += parseInt(item2.canti) * parseInt(item2.precio);
        }

        tablaProductos2 += "<tr><td style='text-align:center; color: #FFF'><div class='flex align-items-lg-start list-user-action'><a class='btn btn-sm btn-icon btn-primary' data-toggle='tooltip' data-placement='top' data-original-title='Delete' onclick='EliminarProductos(" + item2.id + ")'><span class='btn-inner'><svg width='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' stroke='currentColor'><path d='M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'></path><path d='M20.708 6.23975H3.75' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'></path><path d='M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'></path></svg></span></a> | <a class='btn btn-sm btn-icon btn-dark' data-toggle='tooltip' data-placement='top' data-original-title='Generate' onclick='restarProductos(" + item2.id + ")'><span class='btn-inner'><svg width='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' stroke='currentColor'><line x1='5' y1='12' x2='19' y2='12' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></line></svg></span></a></div></td><td>" + item2.canti + "</td><td>" + item2.descripcion + "</td><td>" + item2.precio + "</td><td>" + item2.total + "</td></tr>";
        cont3++;
    });

    if (Productos.length == 0) {
        total = 0;
    }

    document.getElementById("TotalCotization").innerHTML = total;
    document.getElementById("tableContent").innerHTML = tablaProductos2;
    //console.log(Productos);
    cont = 0;
    cont3 = 0;
    console.log("=======Productos Eliminados=======")
    console.log(DeleteProducts);
}

//ELIMINAR PRODUCTOS SELECCIONADOS
function EliminarProductos(id) {
    var tablaProductos2 = "";
    var cont = 0;
    var cont2 = 0
    Productos.forEach(function (item) {
        if (item.id == id) {
            Productos.splice(cont, 1);
            DeleteProducts.push({ IdProduct: item.id });
            
        }
        cont++
    });

    Productos.forEach(function (item2) {
        if (cont2 == 0) {
            total = parseInt(item2.canti) * parseInt(item2.precio);
        }
        else {
            total += parseInt(item2.canti) * parseInt(item2.precio);
        }
        tablaProductos2 += "<tr><td style='text-align:center; color: #FFF'><div class='flex align-items-lg-start list-user-action'><a class='btn btn-sm btn-icon btn-primary' data-toggle='tooltip' data-placement='top' data-original-title='Delete' onclick='EliminarProductos(" + item2.id + ")'><span class='btn-inner'><svg width='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' stroke='currentColor'><path d='M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'></path><path d='M20.708 6.23975H3.75' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'></path><path d='M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'></path></svg></span></a> | <a class='btn btn-sm btn-icon btn-dark' data-toggle='tooltip' data-placement='top' data-original-title='Generate' onclick='restarProductos(" + item2.id + ")'><span class='btn-inner'><svg width='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' stroke='currentColor'><line x1='5' y1='12' x2='19' y2='12' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></line></svg></span></a></div></td><td>" + item2.canti + "</td><td>" + item2.descripcion + "</td><td>" + item2.precio + "</td><td>" + item2.total + "</td></tr>";
        cont2++;
    });

    if (Productos.length == 0) {
        total = 0;
    }

    document.getElementById("TotalCotization").innerHTML = total;
    document.getElementById("tableContent").innerHTML = tablaProductos2;
    cont = 0;
    cont2 = 0;

    console.log("=======Productos Eliminados=======")
    console.log(DeleteProducts);
}

//LLENAR DETALLE UPDATE
function GetCotizationsDetailList() {
    var cont = 0;
    var tablaProductos = "";
    $.ajax({
        type: "GET",
        url: BaseUrl + "/Quote/DetailsList?Id=" + id,
    }).done(function (data, index) {

        data.data.forEach(function (item) {
            Precios.forEach(function (pre) {
                    if (item.pro_Id == pre.id) {
                        Productos.push({ id: pre.id, canti: item.code_Cantidad, descripcion: pre.descripcion, precio: pre.precio, total: item.code_TotalPrice });
                        total += item.code_TotalPrice;
                        idDet = item.code_Id;
                    }
            });
        });

        Productos.forEach(function (item) {
            if (cont == 0) {
                tablaProductos = "<tr><td style='text-align:center; color: #FFF'><div class='flex align-items-lg-start list-user-action'><a class='btn btn-sm btn-icon btn-primary' data-toggle='tooltip' data-placement='top' data-original-title='Delete' onclick='EliminarProductos(" + item.id + ")'><span class='btn-inner'><svg width='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' stroke='currentColor'><path d='M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'></path><path d='M20.708 6.23975H3.75' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'></path><path d='M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'></path></svg></span></a> | <a class='btn btn-sm btn-icon btn-dark' data-toggle='tooltip' data-placement='top' data-original-title='Generate' onclick='restarProductos(" + item.id + ")'><span class='btn-inner'><svg width='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' stroke='currentColor'><line x1='5' y1='12' x2='19' y2='12' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></line></svg></span></a ></div></td><td>" + item.canti + "</td><td>" + item.descripcion + "</td><td>" + item.precio + "</td><td>" + item.total + "</td></tr>";
            }
            else {
                tablaProductos += "<tr><td style='text-align:center; color: #FFF'><div class='flex align-items-lg-start list-user-action'><a class='btn btn-sm btn-icon btn-primary' data-toggle='tooltip' data-placement='top' data-original-title='Delete' onclick='EliminarProductos(" + item.id + ")'><span class='btn-inner'><svg width='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' stroke='currentColor'><path d='M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'></path><path d='M20.708 6.23975H3.75' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'></path><path d='M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'></path></svg></span></a> | <a class='btn btn-sm btn-icon btn-dark' data-toggle='tooltip' data-placement='top' data-original-title='Generate' onclick='restarProductos(" + item.id + ")'><span class='btn-inner'><svg width='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' stroke='currentColor'><line x1='5' y1='12' x2='19' y2='12' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></line></svg></span></a ></div></td><td>" + item.canti + "</td><td>" + item.descripcion + "</td><td>" + item.precio + "</td><td>" + item.total + "</td></tr>";
            }
            cont++;
        });
        console.log(Productos);
        console.log(Precios);
        //Agregar las opciones a la tabla
        document.getElementById("TotalCotization").innerHTML = total;
        document.getElementById("tableContent").innerHTML = tablaProductos;

    }).fail(function () {
        //mostrar alerta en caso de error
        console.log("Error al cargar los prouctos");
    });


}

//ACTUALIZAR LA COTIZACION
function ActualizarCotizacion() {
    var cus = $("#SelectCustomers").val();
    var date = $("#fechaexpiracion").val();
    var InsertPro = [];
    Productos.forEach(function (pre) {
        InsertPro.push({
            "code_Id": parseInt(idDet),
            "code_Cantidad": parseInt(pre.canti),
            "pro_Id": parseInt(pre.id),
            "code_TotalPrice": parseInt(pre.total),
        });
    });
    var data = {
        "cot_Id": parseInt(id),
        "cus_Id": parseInt(cus),
        "cot_DateValidUntil": date,
        "sta_Id": 1,
        "cot_IdUserCreate": 1,
        "cot_IdUserModified": 1,
        "cot_details": InsertPro
    };

    $.ajax({
        type: "POST",
        url: BaseUrl + "/quote/edit",
        data: data,
        dataType: "json",
    }).done(function (data) {



    }).fail(function () {
        console.log("AndonyBolo")
        /*location.reload();*/
        console.log(InsertCoti);
    });
    
    console.log(InsertPro);
}