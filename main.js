const readline = require('readline');
const AnalizadorLexico = require('./AnalizadorLexico/AnalizadorLexico');
const CargadorDeArchivos = require('./CargadorDeArchivos/cargadorDeArchivos');
const GeneradorDeHTML = require('./GeneradorDeHTML/GeneradorDeHTML');
const GeneradorDeJson = require('./GeneradorDeJson/GeneradorDeJson');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function menu() {
    console.log('---------- Menu ----------');
    console.log('1. Cargar Archivo');
    console.log('2. Analizar Archivo');
    console.log('3. Reportes');
    console.log('0. Salir');
    console.log('');
    rl.question('Seleccione una opción:  ', (answer) => {
        opcion = parseInt(answer);
        switch (opcion) {
            case 1:
                console.clear();
                carArc.SeleccionarArchivo();
                menu();
                break;
            case 2:
                console.clear();
                
                if (carArc.getTexto() == undefined) {
                    console.log('No se a cargado ningun archivo');
                    console.log();
                } else {
                    anLex.analizarTexto(carArc.getTexto());
                }
                
                menu();
                break;
            case 3:
                console.clear();
                menuReportes();
                break;
            case 0:
                console.log('Saliendo...');
                rl.close;
                break;        
            default:
                console.clear();
                console.log('Opcion no válida.');
                console.log('');
                menu();
                break;
        }
    })
}

function menuReportes() {
    console.log('---------- Reportes ----------');
    console.log('1. Generar Reporte de tokens');
    console.log('2. Generar Reportes de errores');
    console.log('0. Regresar');
    console.log('');
    rl.question('Seleccione una opción:  ', (answer) => {
        opcion = parseInt(answer);
        switch (opcion) {
            case 1:
                console.clear();
                genHTML.generarReporteTokens(anLex.getTokens());
                menuReportes();
                break;
            case 2:
                console.clear();
                genHTML.generarReporteErrores(anLex.getErrores());
                genJson.generarReporteErrores(anLex.getErrores());
                menuReportes();
                break;
            case 0:
                console.clear();
                menu();
                break;        
            default:
                console.clear();
                console.log('Opcion no válida.');
                console.log('');
                menuReportes();
                break;
        }
    })
}

let anLex = new AnalizadorLexico();
let carArc = new CargadorDeArchivos();
let genHTML = new GeneradorDeHTML();
let genJson = new GeneradorDeJson();

console.clear();
menu();