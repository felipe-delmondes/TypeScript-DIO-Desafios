"use strict";
const pessoa = {
    nome: 'Mariana',
    idade: 28,
    profissao: 'desenvolvedor'
};
const andre = {
    nome: 'Andre',
    idade: 25,
    profissao: 'Pintor'
};
//Grupo de constantes
var Profissao;
(function (Profissao) {
    Profissao[Profissao["Professora"] = 0] = "Professora";
    Profissao[Profissao["Atriz"] = 1] = "Atriz";
    Profissao[Profissao["Desenvolvedora"] = 2] = "Desenvolvedora";
    Profissao[Profissao["JogadoraDeFutebol"] = 3] = "JogadoraDeFutebol";
})(Profissao || (Profissao = {}));
const vanessa = {
    nome: 'Vanessa',
    idade: 25,
    profissao: Profissao.Atriz
};
const maria = {
    nome: 'Maria',
    idade: 25,
    profissao: Profissao.Desenvolvedora
};
const jessica = {
    nome: 'Maria',
    idade: 25,
    profissao: Profissao.Desenvolvedora,
    materias: ["Math", "Portuguese", "Programação"]
};
//Profissão agora não é mais obrigatória!
const monica = {
    nome: 'Maria',
    idade: 25,
    materias: ["Math", "Portuguese", "Programação"]
};
