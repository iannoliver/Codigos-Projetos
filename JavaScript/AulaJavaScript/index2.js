//const v1 = prompt("Qual a velocidade do seu veiculo?: ")
//const v2 = prompt("Qual a velocidade do seu veiculo?: ")

//if(v1 > v2) {
    //alert("O primeiro carro é mais rápido")
//} else if (v2 > v1) {
    //alert("O segundo carro é o mais rápido")
//} else if(v1 === v2) {
   //alert("Os carros são igualmente rapidos")
//}

const nome1 = prompt("Qual o nome do personagem?: ")
const poder1 = prompt("Quanto de poder o ataque do personagem tem?: ")
const nome2 = prompt("Qual o nome do personagem2?: ")
let pontosDeVida2 = prompt("Quantos pontos de vida ele tem?: ")
const pontosDeDefesa2 = prompt("Quantos pontos de defesa ele tem?: ")
const escudo2 = prompt("Ele possui escudo?: (Sim/Não)")

let danoCausado = 0

if(poder1 > pontosDeDefesa2 && escudo2 === "Não") {
    danoCausado = poder1 - pontosDeDefesa2
} else if(poder1 > pontosDeDefesa2 && escudo2 === "Sim") {
    danoCausado = (poder1 - pontosDeDefesa2) / 2
}

pontosDeVida2 -= danoCausado

alert(nome1 + "causou" + danoCausado + "pontos de dano em " + nome2)
alert(
    nome1 + "\nPoder de ataque " + poder1 + "\n\n" +
    nome2 + "\nPontos de vida: " + pontosDeVida2 + 
    "\nPoder de defesa: " + pontosDeDefesa2 + "\nPossui escudo: " + escudo2
)