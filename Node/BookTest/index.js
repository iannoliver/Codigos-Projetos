const Author = require("./Author");

const emily = new Author("Emily", "Rose", 26)

const book = emily.addBook("Memorias do amanhã", 2023, "Armelia")

book.addpub("Novo amanhã")
book.addpub("TributeEM")

console.log(emily)
console.log(book);