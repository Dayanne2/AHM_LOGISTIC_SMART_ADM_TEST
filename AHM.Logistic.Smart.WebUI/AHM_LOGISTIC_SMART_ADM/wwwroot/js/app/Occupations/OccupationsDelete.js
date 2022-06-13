function DeleteOccupations(id) {
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
            console.log(id)
            $.ajax({
                type: "DELETE",
                url: BaseUrl + "/Occupation/Delete?Id=" + id + "&Mod=" + TempUserDefault,
                /*                data: { Id: id },*/
                /*                contentType: "application/json; charset=utf-8",*/
                /*                dataType: "json",*/
                success: function (response) {
                    setTimeout(function () {
                        Swal.fire({
                            width: '20%',
                            height: '20%',
                            title: '¡Eliminado!',
                            text: '¡Registro eliminado correctamente!',
                            icon: 'success',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Ok'
                        })
                    }, 5000);

                }
            }).done(function (data) {
                if (data == true) {
                    location.reload()
                }
            });
        }
    })
}