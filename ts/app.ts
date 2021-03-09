const form:any = document.querySelector('#cotizar-seguro');

function seguro (marca:string, year:number, tipo:string) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
};

function UI() {}

UI.prototype.loadSelect = ():void =>{
    const max:number = new Date().getFullYear();
    const min:number = max - 20;
    const selectYear:any = document.querySelector('#year')
    for (let i = max; i > min; i--) {
        const option:any = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}

UI.prototype.message = (message:string, type:string) => {
    removeMessage();
    const div = document.createElement('div');
    if (type ==="error") {
        div.classList.add('error');
    }else{
        div.classList.add('correcto');
    }
    div.classList.add('mensaje', 'mt-10');
    div.textContent = message;
    form.insertBefore(div, document.querySelector('#resultado'))
    setTimeout(()=>{
        div.remove()
    },2000)
}

const removeMessage = ()=>{
    const message = document.querySelector('div .mensaje');
    if(message){
        message.remove();
    };
};

const ui = new UI();

document.addEventListener('DOMContentLoaded', ()=>{
    ui.loadSelect(); //Cargar el Select de Año
});

const eventListener = ():void =>{
    form.addEventListener('submit', validateForm);
}

const validateForm = ():void =>{
    const marca:any = document.querySelector('#marca');
    const year:any = document.querySelector('#marca');
    const tipo:any = document.querySelector('input[name="tipo"]:checked');

    if (marca.value ==='' || year.value ==='' || tipo.value ==='') {
        ui.message('Todo los campos son obligatoros', 'error');
        return;
    }
    ui.message('Cotizando....', 'correcto');
}
eventListener();