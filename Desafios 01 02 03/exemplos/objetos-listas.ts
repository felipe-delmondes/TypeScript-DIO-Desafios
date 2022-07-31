const pessoa = {
    nome: 'Mariana',
    idade: 28,
    profissao: 'desenvolvedor'
}

const andre:{nome:string,idade:number,profissao:'Desenvolvedora'|'Pintor'} = {
    nome: 'Andre',
    idade: 25,
    profissao: 'Pintor'
}

//Grupo de constantes
enum Profissao{
    Professora,
    Atriz,
    Desenvolvedora,
    JogadoraDeFutebol
}

interface Pessoa {
    nome:string,
    idade:number,
    profissao?:Profissao
}

interface Estudante extends Pessoa{
    materias:string[]
}

const vanessa:Pessoa = {
    nome: 'Vanessa',
    idade: 25,
    profissao: Profissao.Atriz
}

const maria:Pessoa = {
    nome: 'Maria',
    idade: 25,
    profissao: Profissao.Desenvolvedora
}

const jessica:Estudante = {
    nome: 'Maria',
    idade: 25,
    profissao: Profissao.Desenvolvedora,
    materias: ["Math", "Portuguese", "Programação"]
}

//Profissão agora não é mais obrigatória!
const monica:Estudante = {
    nome: 'Maria',
    idade: 25,
    materias: ["Math", "Portuguese", "Programação"]
}


