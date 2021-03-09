var form = document.querySelector('#cotizar-seguro');
function seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}
;
function UI() { }
UI.prototype.loadSelect = function () {
    var max = new Date().getFullYear();
    var min = max - 20;
    var selectYear = document.querySelector('#year');
    for (var i = max; i > min; i--) {
        var option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
};
UI.prototype.message = function (message, type) {
    removeMessage();
    var div = document.createElement('div');
    if (type === "error") {
        div.classList.add('error');
    }
    else {
        div.classList.add('correcto');
    }
    div.classList.add('mensaje', 'mt-10');
    div.textContent = message;
    form.insertBefore(div, document.querySelector('#resultado'));
    setTimeout(function () {
        div.remove();
    }, 2000);
};
var removeMessage = function () {
    var message = document.querySelector('div .mensaje');
    if (message) {
        message.remove();
    }
    ;
};
var ui = new UI();
document.addEventListener('DOMContentLoaded', function () {
    ui.loadSelect(); //Cargar el Select de Año
});
var eventListener = function () {
    form.addEventListener('submit', validateForm);
};
var validateForm = function () {
    var marca = document.querySelector('#marca');
    var year = document.querySelector('#marca');
    var tipo = document.querySelector('input[name="tipo"]:checked');
    if (marca.value === '' || year.value === '' || tipo.value === '') {
        ui.message('Todo los campos son obligatoros', 'error');
        return;
    }
    ui.message('Cotizando....', 'correcto');
};
eventListener();
