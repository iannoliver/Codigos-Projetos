const Book = require("./Book")

class Publisher {
    constructor(name) {
        this.name = name
        this.books = []
        this.pub = []
    }

    addbook(title, year, publishingcompany) {
        const book = new Book(title, year, publishingcompany, this)
        this.books.push(book)
        return book
    }

    addpub(name) {
        const pub = new Publisher(name, this)
        this.pub.push(pub)
        return pub
    }
}

module.exports = Publisher