//Desafio 01: Especificando que o objeto employee possui os atributos acessados e especificando seus tipos.
let employee:{code:number, name:string} = {
    code: 0,
    name: ""
};

employee.code = 10;
employee.name = "John";

//Desafio 02: Como podemos melhorar o esse código usando TS? 
//Podemos definir uma Interface que define as especificações básicas de uma Pessoa

enum ProfissaoPessoa{
    Atriz,
    Padeiro
}

interface SerHumano{
    nome:string,
    idade:number,
    profissao:ProfissaoPessoa
}

let pessoa1:SerHumano = {
    nome: "Maria",
    idade: 29,
    profissao: ProfissaoPessoa.Atriz
};

//Claro que parece ser mais apropriado nesse caso definir classes e suas pessoas

class Human implements SerHumano{
    nome: string;
    idade: number;
    profissao: ProfissaoPessoa;

    constructor(nome:string, idade:number, profissao:ProfissaoPessoa){
        this.nome = nome,
        this.idade = idade,
        this.profissao = profissao
    }
    
}

let pessoa2 = new Human('Roberto',19,ProfissaoPessoa.Padeiro);
let pessoa3 = new Human('Laura',32,ProfissaoPessoa.Atriz);
let pessoa4 = new Human('Carlos',19,ProfissaoPessoa.Padeiro);

//Desafio 03: 
// O código abaixo tem alguns erros e não funciona como deveria. Você pode identificar quais são e corrigi-los em um arquivo TS?

let botaoAtualizar = document.getElementById('atualizar-saldo') as HTMLButtonElement;
let botaoLimpar = document.getElementById('limpar-saldo') as HTMLButtonElement;
let soma = document.getElementById('soma') as HTMLInputElement;
let campoSaldo = document.getElementById('campo-saldo');

if(campoSaldo)
    campoSaldo.innerHTML = String(0);

function somarAoSaldo(soma:number):void {
    if(campoSaldo){
        let resultado = Number(campoSaldo.innerHTML) + soma;
        campoSaldo.innerHTML = String(resultado);
    }
}

function limparSaldo():void {
    if(campoSaldo)
        campoSaldo.innerHTML = '';
}

botaoAtualizar.addEventListener('click', function () {
    somarAoSaldo(Number(soma.value));
});

botaoLimpar.addEventListener('click', function () {
    limparSaldo();
});


