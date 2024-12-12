const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function menu() {
    console.log('---------- Menu ----------');
    console.log('1. Cargar Archivo');
    console.log('2. Analizar Archivo');
    console.log('3. Generar Archivo de Errores');
    console.log('4. Reportes');
    console.log('0. Salir');
    console.log('');
    rl.question('Seleccione una opción:  ', (answer) => {
        opcion = parseInt(answer);
        switch (opcion) {
            case 1:
                console.clear();
                menu();
                break;
            case 2:
                console.clear();
                menu();
                break;
            case 3:
                console.clear();
                menu();
                break;
            case 4:
                console.clear();
                menu();
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

console.clear();
menu();