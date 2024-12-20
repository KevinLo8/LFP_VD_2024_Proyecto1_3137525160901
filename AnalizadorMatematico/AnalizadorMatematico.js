const Operacion = require("../Operacion/Operacion");

class AnalizadorMatematico {
    constructor() {
        operaciones = new Array;
    }

    AnalizarTexto(texto) {

        let json = JSON.parse(texto);

        json.operaciones.forEach(element => {
            let operacion = crearOperacion(element);
            operaciones.push(operacion);
        });

        json.configuraciones.forEach(element => {
            fondo = element.fondo;
            forma = element. forma;
            fuente =  element.fuente;
        })
    }

    getOperaciones() {
        return operaciones;
    }

    getFondo() {
        return fondo;
    }

    getForma() {
        return forma;
    }

    getFuente() {
        return fuente;
    }
}

let operaciones;
let fondo;
let fuente;
let forma;

function crearOperacion(element) {
    let tipo = element.operacion;

    let valor1;
    let num1;
    if (typeof element.valor1 == 'object') {
        element.valor1.forEach(valor => {
            valor1 = crearOperacion(valor);
            num1 = valor1.getResultado();
        })
    } else {
        valor1 = element.valor1;
        num1 = valor1;
    }

    let valor2;
    let num2;
    if (typeof element.valor2 == 'object') {
        element.valor2.forEach(valor => {
            valor2 = crearOperacion(valor);
            num2 = valor2.getResultado();
        })
    } else {
        valor2 = element.valor2;
        num2 = valor2;
    }

    let resultado;
    switch (tipo) {
        case "suma":
            resultado = num1 + num2;
            break;
        case "resta":
            resultado = num1 - num2;
            break;
        case "multiplicacion":
            resultado = num1 * num2;
            break;
        case "division":
            resultado = num1 / num2;
            break;
        case "potencia":
            resultado = num1 ** num2;
            break;
        case "raiz":
            resultado = Math.sqrt(num1);
            break;
        case "inverso":
            resultado = 1 / num1;
            break;
        case "seno":
            resultado = Math.sin(num1);
            break;
        case "coseno":
            resultado = Math.cos(num1);
            break;
        case "tangente":
            resultado = Math.tan(num1);
            break;
        case "mod":
            var dif = num1 / num2;
            dif = Math.floor(dif);
            resultado = num1 - (num2 * dif);
            break;
    }

    let operacion = new Operacion(tipo, valor1, valor2, resultado);
    return operacion;
}

module.exports = AnalizadorMatematico;