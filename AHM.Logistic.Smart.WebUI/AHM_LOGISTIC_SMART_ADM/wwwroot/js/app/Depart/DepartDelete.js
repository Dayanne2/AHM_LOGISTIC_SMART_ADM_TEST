function DeleteDepartments(id) {
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
                url: BaseUrl + "/Depart/Delete?Id=" + id + "&Mod=" + TempUserDefault,
                /*                data: { Id: id },/
                /                contentType: "application/json; charset=utf-8",/
                /                dataType: "json",*/
                success: function (response) {
                    Swal.fire({
                        width: '20%',
                        height: '20%',
                        title: '¡Eliminado!',
                        text: '¡Registro eliminado correctamente!',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Ok'
                    })
                }
            }).done(function (data) {
                if (data == true) {
                    location.reload()
                }
            });
        }
    })
}