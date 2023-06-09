const arr =[
    "1° nivel",
    ["2° nivel", 42, true],
    [
        ["3° nivel, 1°item", "Olá Mundo!"],
        ["3° nivel, 2°item", "Oi mundo!"],
    ],
    []   
]

console.log(arr)
console.log(arr[0])
console.log(arr[1])
console.log(arr[1][0])
console.log(arr[1][1])
console.log(arr[2][1])
console.log(arr[2][1][0])

const matriz = [
    ["l1, c1", "l1, c2", "l1, c3", "l1, c4"],
    ["l2, c1", "l2, c2", "l2, c3", "l2, c4"],
    ["l3, c1", "l3, c2", "l3, c3", "l3, c4"],
]

console.table(matriz)

matriz[0].push("Nova Coluna")
matriz.push(["Nova Linha"])

console.table(matriz)

for(let i = 0; i < matriz.length; i++) {
    for (let j = 0; j < matriz[i].length; j++) {
        const elemento = matriz[i][j]
    console.log("Posição: (" + i + ", " + j + ") Valor " + elemento)
    }
}

let mat = [[0, 1, 2, 3, 4], [5, 6, 7, 8, 9],[10, 11, 12, 13, 14],[15, 16, 17, 18, 19], 20]

console.log(mat[3[2]])