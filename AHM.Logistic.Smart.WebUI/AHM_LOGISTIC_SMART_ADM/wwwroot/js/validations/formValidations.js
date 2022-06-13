//Esta función valida los formularios, retorna un booleano
//Pide los siguientes parámetros el input tal cual sin valor, ejemplo input = $(#ejemplo);
//el min este pueden volverlo un null y no pasará nada el min lo usan para cuantos caracteres minimo ocupan
//el max este pueden volverlo un null y no pasará nada el max lo usan para cuantos caracteres maximo ocupan
//el nameinput es el nombre del campo que quieren, ejemplo 'Descripción' y lo termina guardando.
// Pueden hacer lo asi 
//result = MessagesError(pro_Description, 8, 50, 'Description');
//result = MessagesError(pro_PurchasePrice, null, null, 'Precio de Compra');
function MessagesError(input, min, max, nameInput) {
    var message = "";
    var type = typeof input.val();
    switch (type) {
        case 'string':
            if (input.val() === "0") {
                message = '<span style="color: red;">El campo de ' + nameInput + ' necesita una opción válida</span>';
                input.after($(message).fadeToggle(3000));
                input.css("border-color", "red");
                return false;
            }
            if (input.val() === "") {
                message = '<span style="color: red;">El campo de ' + nameInput + ' es requerido</span>';
                input.after($(message).fadeToggle(3000));
                input.css("border-color", "red");
                return false;
            }
            if (min != null) {
                if (input.val().length < min) {
                    message = '<span style="color: red;">El campo de ' + nameInput + ' contiene caracteres insuficientes</span>';
                    input.after($(message).fadeToggle(3000));
                    input.css("border-color", "red");
                    return false;
                }
            }
            if (max != null) {
                if (input.val().length > max) {
                    message = '<span style="color: red;">El campo de ' + nameInput + ' contiene demasiados caracteres</span>';
                    input.after($(message).fadeToggle(3000));
                    input.css("border-color", "red");
                    return false;
                }
            }
            if (input.val().indexOf('@', 0) == -1 || input.val().indexOf('.', 0) == -1) {
                if (input.val().indexOf('@', 0) == 1) {
                    message = '<span style="color: red;">El campo de ' + nameInput + ' es inválido</span>';
                    input.after($(message).fadeToggle(3000));
                    input.css("border-color", "red");
                    return false;
                } else if (input.val().indexOf('.', 0) == 1) {
                    message = '<span style="color: red;">El campo de ' + nameInput + ' es inválido</span>';
                    input.after($(message).fadeToggle(3000));
                    input.css("border-color", "red");
                    return false;
                }
            }
            break;

        default:
            message = '<span style="color: red;">El campo de ' + nameInput + ' es requerido</span>';
            input.after($(message).fadeToggle(3000));
            input.css("border-color", "red");
            return false;
            break;
    }

    return true;
}