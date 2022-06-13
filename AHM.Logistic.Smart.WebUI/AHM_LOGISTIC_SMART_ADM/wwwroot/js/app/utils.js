const BaseUrl = "https://localhost:44339";
const TempUserDefault = 1;

/*--------------------------------------------------InpuMasK------------------------------------------------------------*/
$(document).ready(function () {
    //$(".Telefono").inputmask("(999) 9999-9999");
    //$(".Telefono").inputmask("999 9999-9999");
    $(".Telefono").inputmask("999999999999");
});

//PERMITIR SOLO NUMEROS
$(document).ready(function () {
    $(".soloNumero").ForceNumericOnly();
});

jQuery.fn.ForceNumericOnly =
    function () {
        return this.each(function () {
            $(this).keydown(function (e) {
                var key = e.charCode || e.keyCode || 0;
                // allow backspace, tab, delete, arrows, numbers and keypad numbers ONLY
                return (
                    key == 8 ||
                    key == 9 ||
                    key == 46 ||
                    key == 190 ||
                    key == 110 ||
                    (key >= 37 && key <= 40) ||
                    (key >= 48 && key <= 57) ||
                    (key >= 96 && key <= 105));
            });
        });
    };
/*-----------------------------------------------------------------------------------------------------------------------*/