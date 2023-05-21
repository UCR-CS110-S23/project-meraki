async function loadBooks() {
  let response = await fetch("http://localhost:3000/books");

  console.log(response.status); //200
  console.log(response.statusText); //OK

  if (response.status === 200) {
    let data = await response.text();
    console.log(data);
    const books = JSON.parse(data);

    for (let book of books) {
      const x = `
                <div class="col-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class = "card-title">${book.title}</h5>
                            <h6 class = "card-subtitle mb-2 text-muted">${
                              book.isbn
                            }</h6>

                            <div>Author: ${book.author}</div>
                            <div>Publisher: ${book.publisher}</div>
                            <div>Number Of Pages: ${
                              book.numOfPages || book.pages
                            }</div>

                            <hr>

                            <button type="button" class="btn btn-danger" onClick="deleteBook(${
                              book.isbn
                            })">Delete</button>
                            <button types="button" class="btn btn-primary" data-toggle="modal" data-target="#editBookModal" onClick="setEditModal(${
                              book.isbn
                            })">Edit</button>
                        </div>
                    </div>
                </div>
            `;

      document.getElementById("books").innerHTML =
        document.getElementById("books").innerHTML + x;
    }
  }
}

loadBooks();

async function setEditModal(isbn) {
  let response = await fetch(`http://localhost:3000/book/${isbn}`); //makes a GET request to the endpoint for a specific book using its unique isbn. This allows us to fetch the info for this book and parse it to display its current values inside the fields of the edit form.

  console.log(response.status);
  console.log(response.statusText);
  console.log("look");

  if (response.status === 200) {
    let data = await response.text();
    console.log("In setEditModal() ", data);
    const book = JSON.parse(data);

    let {
      title,
      author,
      publisher,
      publish_date,
      numOfPages,
      pages,
      published,
    } = book;

    published = moment(published).utc().format("YYYY-MM-DD");

    document.getElementById("isbn").value = isbn;
    document.getElementById("title").value = title;
    document.getElementById("author").value = author;
    document.getElementById("publisher").value = publisher;
    document.getElementById("publish_date").value = publish_date || published;
    document.getElementById("numOfPages").value = numOfPages || pages;

    //TODO: EDIT POST METHOD FOR EDITING FORM. Currently does not display the updated data.
    document.getElementById(
      "editForm"
    ).action = `http://localhost:3000/book/${isbn}`; //tells Edit form to make a POST request when we submit an edit
  }
}

async function deleteBook(isbn) {
  let response = await fetch(`http://localhost:3000/book/${isbn}`, {
    method: "DELETE",
  });
  //   location.href = "./book-list.html";
  location.reload();
}
