"use strict";
let valorAny;
//Recebe qualquer coisa - Não segue regras de tipagem
valorAny = false;
let valorString = 'teste';
//This is not cool, because see that valorAny is not exactly a String anymore.....
valorString = valorAny;
