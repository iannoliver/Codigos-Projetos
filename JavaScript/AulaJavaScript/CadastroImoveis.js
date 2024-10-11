const imoveis = [""]
let option = ""

do{
    option = prompt(
        "Imóveis cadastrados: " + imoveis.length +
        "\n1. Salvar imóvel\n2. Mostar todos os Imoveis\n3. Sair" 
    )

    switch(option) {
        case "1":
            const imovel = {}

            imovel.proprietario = prompt("Informe o nome do proprietário:")
            imovel.quartos = prompt("Quantos quartos possui o imóvel?")
            imovel.banheiros = prompt("Quantos banheiros possui o imóvel?")
            imovel.garagem = prompt("Possui garagem?:  (Sim/Não)")

            const confirmacao = confirm(
              "Salvar este imóvel?\n" +
              "\nProprietário: " + imovel.proprietario +
              "\nQuartos: " + imovel.quartos +
              "\nBanheiros: " + imovel.banheiros +
              "\nPossui garagem? " + imovel.garagem
            )

            if(confirmacao) {
                imoveis.push(imovel)
            }

            break
        case "2":
            for(let i = 0; i < imoveis.length; i++) {
                alert(
                    "Imóvel " + (i + 1) +
                    "\nProprietário: " + imoveis[i].proprietario +
                    "\nQuartos: " + imoveis[i].quartos +
                    "\nBanheiros: " + imoveis[i].banheiros +
                    "\nPossui garagem? " + imoveis[i].garagem 

                )
            }
            break
        case "3":
            alert("Encerrando...")
            break
        default:
            alert("Opcão Inválida")
    }

}while(option !== "3")