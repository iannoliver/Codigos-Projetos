const personagens = [
    {nivel: 42, nome: "Thrall",  raca: "Orc", classe: "Xamã"},
    {nivel: 28, nome: "Garrosh",  raca: "Orc", classe: "Guerreiro"},
    {nivel: 35, nome: "Varok",  raca: "Orc", classe: "Guerreiro"},
    {nivel: 35, nome: "Uther",  raca: "Humano", classe: "Paladino"},
    {nivel: 26, nome: "Jaina",  raca: "Humano", classe: "Maga"},
    {nivel: 39, nome: "Tyrande",  raca: "Elfo Noturno", classe: "Sacerdotisa"},
    {nivel: 29, nome: "Muradin",  raca: "Anão", classe: "Guerreiro"},
]

//Map

//const nomes = []

//for( let i = 0; i < personagens.length; i++) {
   // nomes.push(personagens[i].nome)
//}

const nomes = personagens.map(function(personagem){
    return personagem.nome
})

console.log(nomes)


// Filter

//const Orcs = []

//for (let i = 0; i < personagens.length; i++) {
   // if(personagens[i].raca === "Orcs") {
  //      Orcs.push(personagens[i])
 //   }
    
//}

const orcs = personagens.filter(function(personagem){
    return personagem.raca === "Orc"
})

console.log(orcs)


// Reduce

const  nivelTotal = personagens.reduce(function (valorAcumulado, personagem){
    return valorAcumulado + personagem.nivel
}, 0) 

console.log(nivelTotal)

const raca = personagens.reduce(function(valorAcumulado, personagem){
    if (valorAcumulado[personagem.raca]) {
        valorAcumulado[personagem.raca].push(personagem) 
    } else {
        valorAcumulado[personagem.raca] = [personagem]
    }

    return valorAcumulado
}, {})

console.log(raca)

//sort

//slice() sem parametro faz uma cópia do elemento e passa uma cópoia pro sort, criando um novo array, assim usando o sort para não alterar o array
const personagensOrdenados = personagens.sort(function(a, b){
    return a.nivel - b.nivel
}) //altera o array original diferente dos outros acima

console.log(personagens)
console.log(personagensOrdenados)