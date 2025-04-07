// Sample books in the library
let books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925, isAvailable: true },
    { id: 2, title: "1984", author: "George Orwell", year: 1949, isAvailable: true },
    { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960, isAvailable: true }
];

// Function to render books on the page
function displayBooks() {
    const libraryDiv = document.getElementById("library");
    libraryDiv.innerHTML = ""; // Clear existing content

    // Insert Add Book Form at the top
    const formHTML = `
        <div id="formContainer">
            <h3>Add a New Book</h3>
            <form id="addBookForm">
                <input type="text" id="title" placeholder="Title" required />
                <input type="text" id="author" placeholder="Author" required />
                <input type="number" id="year" placeholder="Year" required />
                <button type="submit">Add Book</button>
            </form>
        </div>
    `;
    libraryDiv.innerHTML += formHTML;

    // Then list books
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
        `;

        libraryDiv.appendChild(bookDiv);
    });

    // Attach form submission logic
    const form = document.getElementById("addBookForm");
    form.addEventListener("submit", function(event) {
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

// Function to add a new book
function addBook(title, author, year) {
    const newBook = {
        id: books.length + 1,
        title,
        author,
        year,
        isAvailable: true
    };
    books.push(newBook);
    displayBooks(); // Refresh display
}

// Function to borrow a book
function borrowBook(bookId) {
    const book = books.find(book => book.id === bookId);
    if (book && book.isAvailable) {
        book.isAvailable = false;
        displayBooks(); // Update the display
    }
}

// Function to return a book
function returnBook(bookId) {
    const book = books.find(book => book.id === bookId);
    if (book && !book.isAvailable) {
        book.isAvailable = true;
        displayBooks(); // Update the display
    }
}

// Initial display of books and form
displayBooks();
