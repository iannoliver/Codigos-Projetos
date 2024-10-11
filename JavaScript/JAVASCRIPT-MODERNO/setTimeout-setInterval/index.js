/*
console.log('Programa iniciado!')

const timeoutId = setTimeout(() => {
    console.log('2 segundos se passaram desde que o programa foi iniciado.')
}, 2 * 1000)*/

/*
console.log('Programa iniciado!')

const timeoutId = setTimeout(() => {
    console.log('2 segundos se passaram desde que o programa foi iniciado.')
}, 2 * 1000)

clearTimeout(timeoutId)*/

/*
let seconds = 0
setInterval(() => {
    seconds += 3
    console.log(`Se passaram ${seconds} segundos.`)
}, 3 * 1000)*/


let seconds = 0
const intervalId = setInterval(() => {
    seconds += 3
    console.log(`Se passaram ${seconds} segundos.`)
    if (seconds > 10) {
        clearInterval(intervalId)
        console.log('Tempo esgotado! Encerrando...')
    }
}, 3 * 1000)