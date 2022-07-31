//Callbacks

function somarValoresNumericos(numero1:number, number2:number,callback:(numero:number) => number):number{
    let resultado = numero1 + number2;
    return callback(resultado);
}

function aoQuadrado(numero:number):number{
    return numero*numero;
}

console.log(somarValoresNumericos(1,3,aoQuadrado));