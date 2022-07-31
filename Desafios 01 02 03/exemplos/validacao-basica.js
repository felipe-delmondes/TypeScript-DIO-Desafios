//let button = document.getElementById("button1");
//let input1 = document.getElementById("input1");
//let input2 = document.getElementById("input2");

function somaTudo(numero1, numero2){
    if(typeof numero1 === 'number' && typeof numero2 === 'number'){
        return numero1 + numero2;
    }else{
        return Number(numero1) + Number(numero2);
    }
}

button.addEventListener("click",() => {
    const resultado = somaTudo(input1.value + input2.value);
    console.log(resultado);
});

//Só sabemos os erros do código quando rodamos o código no Browser, o compilador não
//ajuda quando escrevemos o código, é muito guess até o negócio funcionar.
//Fora a questão do tipo dinâmico ser um problema, trazendo uma incerteza.