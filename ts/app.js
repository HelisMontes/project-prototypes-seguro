var form = document.querySelector('#cotizar-seguro');
function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}
;
Seguro.prototype.cotizarSeguro = function () {
    /*
        1 - Americano 1.15
        2 - Asiatico 1.05
        3 - Europeo 1.35
    */
    var cantidad;
    var base = 2000;
    switch (this.marca) {
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
    }
    var diferencia = new Date().getFullYear() - this.year;
    cantidad -= (diferencia * 0.03) * cantidad;
    /*
        Si el seguro es básico se multiplica por 30% mas
        Si el seguro es completo se multiplica por 50% mas
    */
    if (this.tipo === "basico") {
        cantidad *= 1.30;
    }
    else {
        cantidad *= 1.50;
    }
    return cantidad;
};
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
    var year = document.querySelector('#year');
    var tipo = document.querySelector('input[name="tipo"]:checked');
    if (marca.value === '' || year.value === '' || tipo.value === '') {
        ui.message('Todo los campos son obligatoros', 'error');
        return;
    }
    ui.message('Cotizando....', 'correcto');
    var seguro = new Seguro(marca.value, Number(year.value), tipo.value);
    seguro.cotizarSeguro();
};
eventListener();
