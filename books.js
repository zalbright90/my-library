const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
}

function displayBooks() {
    const library = document.getElementById('library');
    library.innerHTML = '';
    myLibrary.forEach((book, index) => {
        const bookElement = document.createElement('div');
        bookElement.classList.add('book');
        bookElement.textContent = book.title;
        bookElement.dataset.index = index;
        bookElement.addEventListener('click', showBookDetails);
        library.appendChild(bookElement);
    });
}

function showBookDetails(e) {
    const index = e.target.dataset.index;
    const book = myLibrary[index];
    const detailsElement = document.createElement('div');
    detailsElement.classList.add('book-details');
    detailsElement.innerHTML = `
        <h2>${book.title}</h2>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p>Read: ${book.read ? 'Yes' : 'No'}</p>
        <button onclick="toggleReadStatus(${index})">Toggle Read Status</button>
        <button onclick="removeBook(${index})">Remove Book</button>
        <button onclick="closeDetails(this)">Close</button>
    `;
    document.body.appendChild(detailsElement);
}

function closeDetails(button) {
    button.parentElement.remove();
}

function toggleReadStatus(index) {
    myLibrary[index].toggleRead();
    displayBooks();
    document.querySelector('.book-details').remove();
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    displayBooks();
    document.querySelector('.book-details').remove();
}

const newBookBtn = document.getElementById('newBookBtn');
const bookDialog = document.getElementById('bookDialog');
const bookForm = document.getElementById('bookForm');

newBookBtn.addEventListener('click', () => {
    bookDialog.showModal();
});

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;
    addBookToLibrary(title, author, pages, read);
    bookForm.reset();
    bookDialog.close();
});