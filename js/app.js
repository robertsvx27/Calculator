var teclas = document.querySelectorAll('img');
for (var i = 0; i < teclas.length; i++) {

    teclas[i].onmousedown = reduce;        
    teclas[i].onmouseup = enlarge; 
    teclas[i].onclick = add;        
}
function add(e) {
    e.stopPropagation()
   
    var addigit = document.getElementById('display');
    addigit.textContent += caracter(this.getAttribute('alt'));
}

function reduce(e) {
    e.stopPropagation()
    var tecla = document.getElementById(this.getAttribute('alt'));      
    tecla.style = "width:" + (tecla.clientWidth - 5) + "px;height:"+ (tecla.clientHeight - 5) + "px";       
}

function enlarge(e) {
    e.stopPropagation()
    var tecla = document.getElementById(this.getAttribute('alt'));      
    tecla.style = "width:" + (tecla.clientWidth + 5) + "px;height:"+ (tecla.clientHeight + 5) + "px";       
}

function caracter(valor) {
    switch (valor) {
        case 'mas':
            return '+';
        case 'menos':
        return '-';
        case 'por':
            return '*';
        case 'dividido':
            return '/';
        default:
            return valor;
    }
}
