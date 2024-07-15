const parentContainer = document.querySelector(
  ".library-container"
);
const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");

const btnClickedCards =
  document.querySelector(".cards");

const myLibrary = [];

function Book(title, author, pages, read) {
  (this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.read = read);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("title");
  const author =
    document.getElementById("author");
  const length = document.getElementById("pages");
  const read = document.getElementById("read");

  const formData = new FormData(form);
  const bookTitle = formData.get("title");
  console.log(bookTitle);
  const bookAuthor = formData.get("author");
  console.log(bookAuthor);
  const bookPages = +formData.get("pages");
  console.log(bookPages);
  const book = new Book(
    bookTitle,
    bookAuthor,
    bookPages
  );
  myLibrary.push(book);

  displayBook(book);
  title.value = "";
  author.value = "";
  length.value = "";

  console.log(myLibrary);
});

console.log(myLibrary);
function displayBook(book) {
  const markup = `
          <div class="container-v">
            <div class="cards">
              <div class="new-book">
                <p id="card-title"><i class="fas fa-book"></i>${book.title}</p>
                <p id="card-author">${book.author}</p>
                <p id="card-pages">${book.pages} pages</p>
                <button class="btn-read">Completed?</button>
              </div>
            </div>
            <button class="btn-delete">Delete Book</button>
          </div>
  `;

  parentContainer.insertAdjacentHTML(
    "afterbegin",
    markup
  );
}

parentContainer.addEventListener(
  "click",
  function (event) {
    if (
      event.target.classList.contains("btn-read")
    ) {
      const card = event.target.closest(".cards");
      const title = card
        .querySelector("#card-title")
        .textContent.trim();
      myLibrary.forEach((book) => {
        if (book.title === title) {
          book.read = true;
        }
      });
      event.target.classList.add("btn-clicked");
      card.classList.add("btn-clicked-cards");
      event.target.classList.remove("btn-read");
      event.target.textContent = "Completed";
      console.log(myLibrary);
    }

    if (
      event.target.classList.contains(
        "btn-delete"
      )
    ) {
      const card = event.target.closest(".cards");
      const title = card
        .querySelector("#card-title")
        .textContent.trim();
      myLibrary = myLibrary.filter(
        (book) => book.title !== title
      );
      card.remove();
      console.log(myLibrary);
    }
  }
);
// myLibrary.map((book) => {
//   displayBook(book);
// });
