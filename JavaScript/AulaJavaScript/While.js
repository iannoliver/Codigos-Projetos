let balance = prompt("Informe a quantidade de dinheiro inicial:")
balance = parseFloat(balance)
let option = ""

do{
    option = prompt(
        "Saldo Disponivel: R$ " + balance +
        "\n1. Adicionar Dinheiro" +
        "\n2. Remover Dinheiro" +
        "\n3. Sair" 
    )

    switch(option) {
        case "1":
            balance += parseFloat( prompt("Informe o valor a ser adicionado:") )
            break
        case "2":
            balance = prompt("Informe o valor a ser removido:")
            break
        case "3":
            alert("Saindo...")
            break     
        default:
            alert("Entrada Invãlida!")    
    }
} while(option !== "3")