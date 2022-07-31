let button = document.getElementById("button1") as HTMLButtonElement;
let input1 = document.getElementById("input1") as HTMLInputElement;
let input2 = document.getElementById("input2") as HTMLInputElement;

function adicionarNumeros(numero1:number,numero2:number,devePrintar: boolean, frase:string){
    let resultado = numero1 + numero2;
    if(devePrintar){
        console.log(frase + resultado);
    }

    return frase + resultado;
}

//Assume os tipos de variável por inferência
let devePrintar = true;
let frase = 'O valor é: ';

button.addEventListener("click", () => {
    adicionarNumeros(Number(input1.value), Number(input2.value),true, frase);
});

//Podemos até escrever em TypeScript, mas a compilação é fundamental porque
//As aplicações no final rodam o JS!