// Retorno de uma função

function calcularMedia(a, b) {
    const media = (a + b) /2
    return media
}

const resultado = calcularMedia(7, 2)

//console.log(resultado)

function criarProduto(nome, preco) {
    const produto = {
        nome, //nome: nome
        preco, //preco: preco
        estoque: 1
    }
    return produto
}

//console.log(criarProduto("Notebook Intel core i5 8GB", 2500))

function areaRetangular(base, altura) {
    const area = base * altura
    return area
}

function areaQuadrado(lado) {
    return areaRetangular(lado, lado)
}


//console.log(areaRetangular(3, 5))

//console.log(areaQuadrado(9))


function ola() {
    let texto = ".."
    texto = "Olá Mundo"
    return texto
    console.log(texto)
}

console.log(ola())

//quando usa o Return a função acaba(o codigo a seguir está apagado)
//funções só retornam uma unica vez

function maiorIdade(idade) {
    if( idade >= 18) {
        return "Maior de Idade"
    } else {
        return "Menor de Idade"
    }
}

console.log(maiorIdade(29))

console.log(maiorIdade(13))