class Operacion {
    constructor(operacion, valor1, valor2, resultado) {
        this.operacion = operacion;
        this.valor1 = valor1;
        this.valor2 = valor2;
        this.resultado = resultado;
    }

    getOperacion() {
        return this.operacion;
    }

    getValor1() {
        return this.valor1;
    }

    getValor2() {
        return this.valor2;
    }

    getResultado() {
        return this.resultado;
    }
}

module.exports = Operacion;