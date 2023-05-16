const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

//Where we will keep books
let books = [];

app.use(cors());

//Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/book", (req, res) => {
  const book = req.body;

  //Output the book to the console for debugging
  console.log(book);
  books.push(book);

  res.send("Book is added to the database");
});

app.get("/books", (req, res) => {
  res.json(books);
});

app.post("/book/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const newBook = req.body;

  for (let i = 0; i < books.length; i++) {
    let book = books[i];
    if (book.isbn === isbn) {
      books[i] = newBook;
    }
  }
  res.send("Book is edited");
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
app.listen(port, () => console.log("Hello world app listening on port"));