const readline = require('readline');
const AnalizadorLexico = require('./AnalizadorLexico/AnalizadorLexico');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let texto = `{
    "operaciones": [
        {
            "operacion": "suma",
            "valor1": 4.5,
            "valor2": 5.32
        },
        {
            "operacion": "resta",
            "valor1": 4.5,
            "valor2": [
                {
                    "operacion": "potencia",
                    "valor1": 10,
                    "valor2": 3
                },#
            ]
        },
    ]
}`;

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
                let anLex = new AnalizadorLexico();
                anLex.analizarTexto(texto);
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