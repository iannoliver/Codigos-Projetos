let pessoa = {
    nome: "iann",
    idade: 20 ,
    dizerOla() {
        console.log("Ola, Mundo! Meu nome é " + this.nome);

    }
}

console.log(pessoa)

pessoa.dizerOla()