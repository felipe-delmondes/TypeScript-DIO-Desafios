//Variáveis personalizadas
//Isso do input também funciona para unir Interfaces!
//Depois você pode fazer objetos seguirem esse tipo!
//E classes herdarem??
type input = number | string;

function somarValores(input1: input, input2: input){
    if(typeof input1 === 'string' || typeof input2 === 'string'){
        return input1.toString() + input2.toString();
    }else{
        return input1 + input2;
    }
    
}