function calcularAreaTriangulo() {
    const base = prompt("Informe a base do triangulo:")
    const altura = prompt("Informe a altura do triangulo: ")
    return base * altura / 2
}

function calcularAreaRetangulo() {
    const base = prompt("Informe a base do retangulo:")
    const altura = prompt("Informe a altura do retangulo: ")
    return base * altura
}

function calcularAreaQuadrado() {
    const lado = prompt("Informe o lado do quadrado:")
    return lado * lado
}

function calcularAreaTrapezio() {
    const baseMaior = parsefloat(prompt("Informe a base do trapezio:"))
    const baseMenor = parseFloat(prompt("Informe a base do trapezio:"))
    const altura = prompt("Informe a altura do trapezio:")
    return (baseMaior + baseMenor) * altura / 2
}

function calcularAreaCirculo() {
    const raio = prompt("Informe o raio do circulo")
    return 3.14 * raio * raio
}

function exibirMenu() {
    return prompt(
        "Calculadora Geomátrica\n" +
        "1. Calcular Area do Triangulo\n" +
        "2. Calcular Area do Retangulo\n" +
        "3. Calcular Area do Quadrado\n" +
        "4. Calcular Area do Trapezio\n" +
        "5. Calcular Area do Circulo\n" +
        "6. Sair\n"
    )
}

function executar() {
    let option = ""

    do {
        option = exibirMenu()
        let resultado 

        switch (option) {
            case "1":
                resultado = calcularAreaTriangulo()
                
                break;

            case "2":
                resultado = calcularAreaRetangulo()
                
                break;
                
            case "3":
                resultado = calcularAreaQuadrado()
                
                break;

            case "4":
                resultado = calcularAreaTrapezio()
                
                break;

            case "5":
                resultado = calcularAreaCirculo()
                
                break;
                
            case "6":
                alert("Encerrando...")
                
                break;

            default:
                alert("Opção inválida!")
                break;
        }

        if(resultado) {
            alert("Resultado: " + resultado)
        }
    } while (option !== "6")
}

executar()