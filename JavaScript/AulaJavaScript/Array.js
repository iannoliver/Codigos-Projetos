const baralho = [""]
let option = ""

do{
    option = prompt(
        "Cartas no Baralho: " + baralho.length +
        "\nAdicionar Carta\nPuxar uma Carta\nSair" 
    )

    switch(option) {
        case "Adicionar Carta":
            const novaCarta = prompt("Qual carta quer adicionar?:")
            baralho.push(novaCarta)
            break
        case "Puxar uma Carta":
            const cartaPuxada = baralho.pop()
            if(!cartaPuxada) {
                alert("Não há nenhuma carta no baralho")
            } else {
                alert("Você puxou um(a) " + cartaPuxada)
            }
            break
        case "Sair":
            alert("Encerrando...")
            break
        default:
            alert("Opcão Inválida")
    }

}while(option != "Sair")