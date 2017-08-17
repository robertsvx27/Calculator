var teclas = document.querySelectorAll('img');
var addigit = document.getElementById('display');
var operators = ['+', '-', '*', '/'];
//addigit.textContent = "0";

for (var i = 0; i < teclas.length; i++) {

    teclas[i].addEventListener("onmousedown", reduce);
    teclas[i].addEventListener("onmouseup", enlarge);
    teclas[i].addEventListener("click",add);
}
function add(e) {
    e.stopPropagation()
    var valor = this.getAttribute('alt');
    switch (valor) {
        case "on":
            addigit.textContent = "0";
            break
        case "igual":
            addigit.textContent =validate(addigit.textContent);
            if (addigit.textContent)
                addigit.textContent = eval(addigit.textContent);         
            break
        case "punto":
            addigit.textContent += caracter(valor);
            break
        case "raiz":
            addigit.textContent =validate(addigit.textContent);
            if (addigit.textContent)
                addigit.textContent = eval(caracter(valor) + addigit.textContent + ")");
            
            break
        case "signo":
            addigit.textContent =validateSigno(addigit.textContent);                 
            break
        default:
            switch (addigit.textContent) {
                case "0":
                    addigit.textContent = caracter(valor);
                    break
                case "-0":
                    addigit.textContent = "-" + caracter(valor);
                    break
                default:
                    addigit.textContent += caracter(valor);
            }
    }
    addigit.textContent=formatNum(addigit.textContent);
}

function reduce(e) {
    e.stopPropagation()
    var tecla = document.getElementById(this.getAttribute('alt'));
    tecla.style = "width:" + (tecla.clientWidth - 2) + "px;height:" + (tecla.clientHeight - 2) + "px";
}

function enlarge(e) {
    e.stopPropagation()
    var tecla = document.getElementById(this.getAttribute('alt'));
    tecla.style = "width:" + (tecla.clientWidth + 2) + "px;height:" + (tecla.clientHeight + 2) + "px";
}

function caracter(valor) {
    switch (valor) {
        case "mas":
            return "+";
        case "menos":
            return "-";
        case "por":
            return "*"
        case "dividido":
            return "/";
        case "signo":
            return "-";
        case "punto":
            return ".";
        case "raiz":
            return "Math.sqrt(";
        default:
            return valor;
    }
}

function formatNum(valor) {
    if (valor.length>8){
        valor = valor.substr(1,8);
    }
    return valor;
}

function validate(valor) {
    var lastChar = valor[valor.length - 1];
    if (operators.indexOf(lastChar) > -1 || lastChar == caracter("punto")) {
       valor = valor.replace(/.$/, '');
    }
    return valor;
}

function validateSigno(valor) {
    var firstChar = valor[0];
    if (firstChar == caracter("signo")) {
         valor=valor.slice(1);
    }else{
        valor= caracter("signo") + valor;
    }
    return valor;
}


