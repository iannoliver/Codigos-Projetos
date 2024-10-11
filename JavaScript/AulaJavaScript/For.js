const word = prompt("Informe uma palavra: ")

let reverseword = ""

//serve para pegar a ultima letra da String
for (let i = word.length - 1 ; i >= 0; i--) {

    reverseword += word[i]
} 

if(word === reverseword) {
    alert(word + " é um palíndromo!")
} else{
    alert(
        word + " não é um palíndromo!\n\n" +
        word + " != " + reverseword
    )
}