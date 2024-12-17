const Token = require("../Token/token");

class AnalizadorLexico {

    analizarTexto(texto) {
        tokens = new Array;
        errores = new Array;

        espacio = 0;
        columna = 1;
        fila = 1;

        do {
            charInicial = texto.charAt(espacio);

            if (charInicial.match(" ")) {

                columna++;
                espacio++;
            } else if(charInicial.charCodeAt(0) == 10) {

                fila++;
                columna = 1;
                espacio++;
            } else if(esAgrupacion(charInicial)) {
                
                guardarToken(charInicial, 'Agrupación');
                columna++;
                espacio++;
            } else if(esAsignacion(charInicial)) {

                guardarToken(charInicial, 'Asignación');
                columna++;
                espacio++;
            } else if(esSigno(charInicial)) {

                guardarToken(charInicial, 'Signo');
                columna++;
                espacio++;
            } else if(esNumero(charInicial)) {

                const palabra = extraerNumero(texto);
                guardarToken(palabra, 'Numero');
                columna += palabra.length;
            } else if(charInicial.charCodeAt(0) == 34) {
                const palabra = extraerPalabra(texto);

                if (esPalabraReservada(palabra)) {
                    guardarToken(palabra, 'Palabra Reservada');
                } else if(esOperacion(palabra)) {
                    guardarToken(palabra, 'Operación');
                } else if(esConfiguracion(palabra)) {
                    guardarToken(palabra, 'Configuración');
                } else {
                    guardarError(charInicial, 'Palabra no reconocida')
                }
                columna += palabra.length;

            } else {
                guardarError(charInicial, 'Caracter no reconocido');
                columna++;
                espacio++;
            }

        } while (espacio < texto.length);
    }

    getTokens() {
        return tokens;
    }

    getErrores() {
        return errores;
    }

}

const palabrasReservadas = ['"operaciones"','"operacion"','"valor1"','"valor2"','"configuraciones"','"fondo"','"fuente"','"forma"'];
const operaciones = ['"suma"','"resta"','"multiplicación"','"división"','"potencia"','"raiz"','"inverso"','"seno"','"coseno"','"tangente"','"mod"'];
const configuraciones = ['"red"','"blue"','"yellow"','"white"','"black"','"circle"','"diamond"','"triangle"'];

let tokens;
let errores;
let espacio;
let columna;
let fila;
let charInicial;

function esAgrupacion(palabra) {
        if (palabra.charCodeAt(0) == 123 || palabra.charCodeAt(0) == 125) {
            return true;
        } else if (palabra.charCodeAt(0) == 91 || palabra.charCodeAt(0) == 93) {
            return true;
        } else {
            return false;
        }
}

function esAsignacion(palabra) {
    return palabra.charCodeAt(0) == 58;
}

function esSigno(palabra) {
    return palabra.charCodeAt(0) == 44 || palabra.charCodeAt(0) == 59;
}

function esPalabraReservada(palabra) {
    for (let index = 0; index < palabrasReservadas.length; index++) {
        if (palabra.match(palabrasReservadas[index])) {
            return true;
        }
    }
    return false;
}

function esOperacion(palabra) {
    for (let index = 0; index < operaciones.length; index++) {
        if (palabra.match(operaciones[index])) {
            return true;
        }
    }
    return false;
}

function esConfiguracion(palabra) {
    for (let index = 0; index < configuraciones.length; index++) {
        if (palabra.match(configuraciones[index])) {
            return true;
        }
    }
    return false;
}

function esNumero(palabra) {
    if (palabra.charCodeAt(0) > 47 && palabra.charCodeAt(0) < 58) {
        return true;
    }
    return false;
}

function extraerPalabra(texto) {
    let caracter;
    let palabra = '';

    caracter = texto.charAt(espacio);
    palabra = palabra.concat(caracter);
    espacio++;

    do {
        caracter = texto.charAt(espacio);
        palabra = palabra.concat(caracter);
        espacio++;
    } while (caracter.charCodeAt(0) != 34 && caracter.charCodeAt(0) != 10);

    return palabra;
}

function extraerNumero(texto) {
    let caracter = texto.charAt(espacio);
    let palabra = '';

    do {
        palabra = palabra.concat(caracter);
        espacio++;
        caracter = texto.charAt(espacio);
    } while (esNumero(caracter) || caracter.charCodeAt(0) == 46);

    return palabra;
}

function guardarToken(palabra, tipo){
    console.log(`${palabra} -- ${tipo} -- ${fila} -- ${columna}`);
    let token = new Token(palabra, tipo, columna, fila);
    tokens.push(token);
}

function guardarError(palabra, descripcion){
    console.log(`${palabra} -- Error Léxico -- ${descripcion} -- ${fila} -- ${columna}`);
    let token = new Token(palabra, descripcion, columna, fila);
    errores.push(token);
}

module.exports = AnalizadorLexico;