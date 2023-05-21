const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var bookList = require("./book.json"); //getting book list from book.json file

const app = express();
const port = 3000;
app.use(express.static(__dirname));

//Where we will keep books
let books = bookList.books; //add already existing books from book.json file

app.use(cors());

//Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/book", (req, res) => {
  const book = req.body;

  //Output the book to the console for debugging
  console.log(book);
  books.push(book);

  res.redirect("/new-book");
});

app.get("/new-book", (req, res) => {
  res.sendFile(__dirname + "/new-book.html");
});

app.get("/books", (req, res) => {
  res.json(books);
});

//make updates to a book
app.post("/book/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const newBook = req.body;

  for (let i = 0; i < books.length; i++) {
    let book = books[i];
    if (book.isbn === isbn) {
      books[i] = newBook;
    }
  }
  res.redirect("/book-list");
});

app.get("/book-list", (req, res) => {
  res.sendFile(__dirname + "/book-list.html");
});

//get book data to populate into Edit form
app.get("/book/:isbn", (req, res) => {
  const isbn = req.params.isbn;

  for (let i = 0; i < books.length; i++) {
    if (books[i].isbn === isbn) {
      console.log(books[i], "CHECK");
      res.json(books[i]);
    }
  }
});

app.delete("/book/:isbn", (req, res) => {
  const isbn = req.params.isbn;

  for (let i = 0; i < books.length; i++) {
    if (books[i].isbn === isbn) {
      console.log(books[i], "DELETE");
      const beforeElement = books.slice(0, i);
      const afterElement = books.slice(i + 1);
      books = beforeElement.concat(afterElement);
      console.log(books, "now");
      res.send(`Book with ISBN ${isbn} has been deleted.`);
    }
  }
});
app.listen(port, () => console.log("Hello world app listening on port"));
