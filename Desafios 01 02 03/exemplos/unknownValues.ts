let anyEstaDeVolta: any;

anyEstaDeVolta = 5;

let stringTest:string = 'verificar';
stringTest = anyEstaDeVolta;

let unknownValue: unknown;
unknownValue = 3;
unknownValue = 'Opa';
unknownValue = true;
unknownValue = 'Vai sim';

//O Unknown é mais robusto que o Any, não pode ser assinalado a outros tipos!
let stringTeste2 = "Agora vai";

//stringTeste2 = unknownValue;

//Se você fizer uma verificação e garantir ai você pode assinalar!!!
if(typeof unknownValue === 'string'){
    stringTeste2 = unknownValue;
}

function jogaErro(erro:string, codigo:number){
    throw {error: erro, code: codigo}
}