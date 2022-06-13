function Menu(keyword) {
    switch (keyword) {
        case 'products':
            $("#li-apartVent").addClass("active");
            $("#ul-Vent").addClass("collapse");
            $("#apartVent").addClass("active");
            $("#ul-Vent").addClass("in");
            $("#li-products").addClass("active");
            $('#products').addClass('active');
            break;
        case 'persons':
            $("#li-apartCatalog").addClass("active");
            $("#ul-Catalog").addClass("collapse");
            $("#apartCatalog").addClass("active");
            $("#ul-Catalog").addClass("in");
            $("#li-persons").addClass("active");
            $('#persons').addClass('active');
            break;
        case 'empleados':
            $("#li-apartCatalog").addClass("active");
            $("#ul-Catalog").addClass("collapse");
            $("#apartCatalog").addClass("active");
            $("#ul-Catalog").addClass("in");
            $("#li-empleados").addClass("active");
            $('#empleados').addClass('active');
            break;
        case 'countries':
            $("#li-apartCatalog").addClass("active");
            $("#ul-Catalog").addClass("collapse");
            $("#apartCatalog").addClass("active");
            $("#ul-Catalog").addClass("in");
            $("#li-countries").addClass("active");
            $('#countries').addClass('active');
            break;
        case 'customers':
            $("#li-apartClte").addClass("active");
            $("#ul-Clte").addClass("collapse");
            $("#apartClte").addClass("active");
            $("#ul-Clte").addClass("in");
            $("#li-customers").addClass("active");
            $('#customers').addClass('active');
            break;
    }
}