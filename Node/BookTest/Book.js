const Author = require("./Author")

class Book {
    constructor(title, year, publishingcompany) {
        this.title = title
        this.year = year
        this.publishingcompany = publishingcompany
        this.author = []
    }

    addAuthor(name, othername, age) {
        this.author.push(new Author(name, othername, age))
    }
}

module.exports = Book