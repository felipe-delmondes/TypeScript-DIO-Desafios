"use strict";
//Callbacks
function somarValoresNumericos(numero1, number2, callback) {
    let resultado = numero1 + number2;
    return callback(resultado);
}
function aoQuadrado(numero) {
    return numero * numero;
}
console.log(somarValoresNumericos(1, 3, aoQuadrado));
