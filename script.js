// Load books from localStorage or use default ones
let books = JSON.parse(localStorage.getItem("books")) || [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925, isAvailable: true },
    { id: 2, title: "1984", author: "George Orwell", year: 1949, isAvailable: true },
    { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960, isAvailable: true }
];

// Save books to localStorage
function saveBooks() {
    localStorage.setItem("books", JSON.stringify(books));
}

function displayBooks() {
    const mainContainer = document.getElementById("mainContainer");
    mainContainer.innerHTML = "";

    // Form at the top
    const formContainer = document.createElement("div");
    formContainer.id = "formContainer";
    formContainer.innerHTML = `
        <h3>Add a New Book</h3>
        <form id="addBookForm">
            <input type="text" id="title" placeholder="Title" required />
            <input type="text" id="author" placeholder="Author" required />
            <input type="number" id="year" placeholder="Year" required />
            <button type="submit">Add Book</button>
        </form>
    `;
    mainContainer.appendChild(formContainer);

    // Library (book cards) below
    const libraryDiv = document.createElement("div");
    libraryDiv.id = "library";
    mainContainer.appendChild(libraryDiv);

    // Then render books
    books.forEach(book => {
        let bookDiv = document.createElement("div");
        bookDiv.classList.add("book");

        bookDiv.innerHTML = `
            <h2>${book.title}</h2>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Year:</strong> ${book.year}</p>
            <p><strong>Status:</strong> ${book.isAvailable ? "Available" : "Borrowed"}</p>
            <button class="borrow" ${book.isAvailable ? "" : "disabled"} onclick="borrowBook(${book.id})">Borrow</button>
            <button class="return" ${book.isAvailable ? "disabled" : ""} onclick="returnBook(${book.id})">Return</button>
            <button class="delete" onclick="deleteBook(${book.id})">Delete</button>
        `;

        libraryDiv.appendChild(bookDiv);
    });

    // Attach form submission logic
    const form = document.getElementById("addBookForm");
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const title = document.getElementById("title").value.trim();
        const author = document.getElementById("author").value.trim();
        const year = parseInt(document.getElementById("year").value);

        if (title && author && year) {
            addBook(title, author, year);
            form.reset();
        }
    });
}

// Function to return a book
function returnBook(bookId) {
    const book = books.find(book => book.id === bookId);
    if (book && !book.isAvailable) {
        book.isAvailable = true;
        saveBooks();
        displayBooks();
    }
}

// Function to delete a book
function deleteBook(bookId) {
    books = books.filter(book => book.id !== bookId);
    saveBooks();
    displayBooks();
}

// Initial display
displayBooks();
