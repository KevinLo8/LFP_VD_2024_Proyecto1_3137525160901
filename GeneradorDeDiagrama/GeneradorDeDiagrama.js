var util = require('util'),
    graphviz = require('graphviz');

class GeneradorDeDiagrama {

    generarDiagrama(operaciones, forma, fuente, fondo) {

        var g = graphviz.digraph("G");
        i = 1;

        operaciones.forEach(element => {
            crearNodos(g, element, forma, fuente, fondo);
        });
        
        g.output( "png", "diagrama.png" );
    }
}

function crearNodos(g, operacion, forma, fuente, fondo) {
    
    var n = g.addNode( operacion.getOperacion() + "\n" + operacion.getResultado(), { "fillcolor" : fondo , "style" : "filled", "fontcolor" : fuente, "shape" : forma} );

    if (typeof operacion.getValor1() == 'object') {
        crearSubNodos(g, n, operacion.getValor1(),forma, fuente ,fondo);
    } else {
        var nl = g.addNode(i, { "label" : operacion.getValor1(), "fillcolor" : fondo , "style" : "filled", "fontcolor" : fuente, "shape" : forma} );
        var e1 = g.addEdge(n, nl);
        i++;
    }

    if (typeof operacion.getValor2() == 'object') {
        crearSubNodos(g, n, operacion.getValor2(),forma, fuente ,fondo);
    } else {
        var nr = g.addNode(i, { "label" : operacion.getValor2(), "fillcolor" : fondo , "style" : "filled", "fontcolor" : fuente, "shape" : forma} );
        var e2 = g.addEdge(n, nr);
        i++;
    }

    g.getNode("po");

}

function crearSubNodos(g, n, operacion, forma, fuente, fondo) {
    
    var s = g.addNode(i, { "label" : operacion.getOperacion(), "fillcolor" : fondo , "style" : "filled", "fontcolor" : fuente, "shape" : forma} );
    i++;

    if (typeof operacion.getValor1() == 'object') {
        crearSubNodos(g, s, operacion.getValor1(),forma, fuente ,fondo);
    } else {
        var sl = g.addNode(i, { "label" : operacion.getValor1(), "fillcolor" : fondo , "style" : "filled", "fontcolor" : fuente, "shape" : forma} );
        var es1 = g.addEdge(s, sl);
        i++;
    }

    if (typeof operacion.getValor2() == 'object') {
        crearSubNodos(g, s, operacion.getValor2(),forma, fuente ,fondo);
    } else {
        var sr = g.addNode(i, { "label" : operacion.getValor2(), "fillcolor" : fondo , "style" : "filled", "fontcolor" : fuente, "shape" : forma} );
        var es2 = g.addEdge(s, sr);
        i++;
    }

    g.addEdge(n, s);
}

let i;

module.exports = GeneradorDeDiagrama;