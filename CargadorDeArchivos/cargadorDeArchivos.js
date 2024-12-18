const fs = require('fs');

class CargadorDeArchivos {

    SeleccionarArchivo() {
        fs.readFile('archivo-de-texto.json', 'utf8', function(err,data) {
            if (err) {
                console.log();
                console.log();
                console.error('Error al intertar abrir el archivo:  ', err);
                return;
            }
            console.log();
            console.log();
            console.log('Archivo abierto correctamente');

            textoDeArchivo = data;
        })
    }

    getTexto() {
        return textoDeArchivo;
    }
}

let textoDeArchivo;

module.exports = CargadorDeArchivos;