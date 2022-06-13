function DeleteCustomers(id) {
    Swal.fire({
        width: '20%',
        height: '20%',
        text: "¿Estás seguro de eliminar este registro?",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí'

    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: "DELETE",
                url: BaseUrl + "/Customers/Delete?Id=" + id + "&Mod=" + TempUserDefault,
                /*                data: { Id: id },*/
                /*                contentType: "application/json; charset=utf-8",*/
                /*                dataType: "json",*/
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
                            location.assign("https://localhost:44339/Customers/Index");

                        }, 1500)
                    };
                    if (message.includes("Operation completed successfully.")) {
                        Swal.fire({
                            width: '20%',
                            height: '20%',
                            title: 'Eliminado',
                            text: 'Registro eliminado correctamente',
                            icon: 'success',
                            confirmButtonColor: '#3085d6',
                        });
                        setTimeout(function () {
                            location.reload()
                        }, 1500)
                    };
                }
            })
        }
    })
}
