const form = document.querySelector('#cotizar-seguro');
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
    let cantidad;
    const base = 2000;
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
    const diferencia = new Date().getFullYear() - this.year;
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
UI.prototype.loadSelect = () => {
    const max = new Date().getFullYear();
    const min = max - 20;
    const selectYear = document.querySelector('#year');
    for (let i = max; i > min; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
};
UI.prototype.message = (message, type) => {
    removeMessage();
    const div = document.createElement('div');
    if (type === "error") {
        div.classList.add('error');
    }
    else {
        div.classList.add('correcto');
    }
    div.classList.add('mensaje', 'mt-10');
    div.textContent = message;
    form.insertBefore(div, document.querySelector('#resultado'));
    setTimeout(() => {
        div.remove();
    }, 2000);
};
UI.prototype.showHTML_Cotizacion = (total, seguro) => {
    const resultado = document.querySelector('#resultado');
    let make;
    const { marca, year, tipo } = seguro;
    switch (marca) {
        case '1':
            make = 'Americano';
            break;
        case '2':
            make = 'Asiatico';
            break;
        case '3':
            make = 'Europeo';
            break;
    }
    // Crear un div
    const div = document.createElement('div');
    div.classList.add('mt-10');
    // Insertar la informacion
    div.innerHTML = `
          <p class='header'>Tu Resumen: </p>
          <p class="font-bold">Marca: <span class="font-normal"> ${make} </span> </p>
          <p class="font-bold">Año: <span class="font-normal"> ${year} </span> </p>
          <p class="font-bold">Tipo: <span class="font-normal"> ${tipo} </span> </p>
          <p class="font-bold"> Total: <span class="font-normal"> $${total.toFixed(2)} </span> </p>
     `;
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';
    setTimeout(() => {
        spinner.style.display = 'none';
        resultado.appendChild(div);
    }, 3000);
};
const removeMessage = () => {
    const message = document.querySelector('div .mensaje');
    if (message) {
        message.remove();
    }
    ;
};
const ui = new UI();
document.addEventListener('DOMContentLoaded', () => {
    ui.loadSelect(); //Cargar el Select de Año
});
const eventListener = () => {
    form.addEventListener('submit', validateForm);
};
const validateForm = () => {
    const marca = document.querySelector('#marca');
    const year = document.querySelector('#year');
    const tipo = document.querySelector('input[name="tipo"]:checked');
    if (marca.value === '' || year.value === '' || tipo.value === '') {
        ui.message('Todo los campos son obligatoros', 'error');
        return;
    }
    ui.message('Cotizando....', 'correcto');
    // Limpiar resultados anteriores
    const resultados = document.querySelector('#resultado div');
    if (resultados != null) {
        resultados.remove();
    }
    const seguro = new Seguro(marca.value, Number(year.value), tipo.value);
    const total = seguro.cotizarSeguro();
    ui.showHTML_Cotizacion(total, seguro);
};
eventListener();
