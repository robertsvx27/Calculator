var keys = document.querySelectorAll('img');
var addigit = document.getElementById('display');
var operators = ['+', '-', '*', '/'];
var operation = "";
var lastoperator = "";
//addigit.textContent = "0";

for (var i = 0; i < keys.length; i++) {

    keys[i].addEventListener("onmousedown", reduce);
    keys[i].addEventListener("onmouseup", enlarge);
    keys[i].addEventListener("click", add);
}
function add(e) {
    e.stopPropagation()
    var value = this.getAttribute('alt');
    switch (value) {
        case "on":
            addigit.textContent = "0";
            operation = "";
            lastoperator = "";
            break
        case "igual":
            if (lastoperator != "" && !isNaN(operation)) {
                operation = validate(operation);
                operation += lastoperator + operation;
                addigit.textContent = eval(operation);
                addigit.textContent = formatNum(addigit.textContent);
                operation = addigit.textContent;
            } else {
                operation += addigit.textContent;
                operation = validate(operation);
                addigit.textContent = eval(operation);
                addigit.textContent = formatNum(addigit.textContent);
                operation = addigit.textContent;
            }
            break
        case "punto":
            if (addigit.textContent.indexOf(".")==-1){
                addigit.textContent += getCharacter(value);
            }            
            break
        case "raiz":
            addigit.textContent = validate(addigit.textContent);
            if (addigit.textContent)
                addigit.textContent = eval(getCharacter(value) + addigit.textContent + ")");
            break
        case "signo":
            addigit.textContent = validateSigno(addigit.textContent);
            break
        default:
            if (operators.indexOf(getCharacter(value)) > -1) {         
                if (operation!=addigit.textContent){
                    operation += addigit.textContent;
                }                       
                addigit.textContent = "";
                operation += getCharacter(value);
                lastoperator = getCharacter(value);
            } else {
                switch (addigit.textContent) {
                    case "0":
                        addigit.textContent = getCharacter(value);
                        break
                    case "-0":
                        addigit.textContent = "-" + getCharacter(value);
                        break
                    default:
                        if (addigit.textContent.length < 8) {
                            addigit.textContent += getCharacter(value);
                        }
                        break
                }

            }
            break
    }
    //addigit.textContent=formatNum(addigit.textContent);   
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

function getCharacter(value) {
    switch (value) {
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
            return value;
    }
}

function formatNum(value) {
    if (value.length > 8) {
        value = value.substr(0, 8);
    }
    return value;
}

function validate(value) {
    var lastChar = value[value.length - 1];
    if (operators.indexOf(lastChar) > -1 || lastChar == getCharacter("punto")) {
        value = value.replace(/.$/, '');
    }
    return value;
}

function validateSigno(value) {
    var firstChar = value[0];
    if (firstChar == getCharacter("signo")) {
        value = value.slice(1);
    } else {
        value = getCharacter("signo") + value;
    }
    return value;
}


