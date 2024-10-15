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

    // Create shelves
    const shelves = [document.createElement('div'), document.createElement('div'), document.createElement('div')];
    shelves.forEach(shelf => {
        shelf.classList.add('shelf');
        library.appendChild(shelf);
    });

    myLibrary.forEach((book, index) => {
        const bookElement = document.createElement('div');
        bookElement.classList.add('book');
        bookElement.style.backgroundColor = getRandomColor();
        bookElement.dataset.index = index;
        bookElement.addEventListener('click', showBookDetails);

        const titleElement = document.createElement('div');
        titleElement.classList.add('book-title');
        titleElement.textContent = book.title;
        bookElement.appendChild(titleElement);

        // Add book to a random shelf
        const randomShelf = shelves[Math.floor(Math.random() * shelves.length)];
        randomShelf.appendChild(bookElement);
    });
}

function getRandomColor() {
    const colors = ['#4caf50', '#f44336', '#2196f3', '#ff9800', '#9c27b0', '#607d8b'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function showBookDetails(e) {
    const index = e.target.dataset.index;
    const book = myLibrary[index];
    const bookElement = e.target;

    // Open the book on the shelf
    bookElement.classList.add('open');

    // Create and show book details
    const detailsElement = document.createElement('div');
    detailsElement.classList.add('book-details');
    detailsElement.innerHTML = `
        <div class="book-content">
            <div class="book-cover">
                <h2>${book.title}</h2>
                <p>by ${book.author}</p>
            </div>
            <div class="book-info">
                <h2>${book.title}</h2>
                <p>Author: ${book.author}</p>
                <p>Pages: ${book.pages}</p>
                <p>Read: ${book.read ? 'Yes' : 'No'}</p>
                <button onclick="toggleReadStatus(${index})">Toggle Read Status</button>
                <button onclick="removeBook(${index})">Remove Book</button>
            </div>
        </div>
        <button class="close-btn" onclick="closeDetails(this)">&times;</button>
    `;
    document.body.appendChild(detailsElement);

    // Trigger the open animation
    setTimeout(() => {
        detailsElement.style.display = 'block';
        setTimeout(() => {
            detailsElement.querySelector('.book-content').classList.add('open');
        }, 50);
    }, 50);
}

function closeDetails(button) {
    const detailsElement = button.closest('.book-details');
    const bookContent = detailsElement.querySelector('.book-content');
    bookContent.classList.remove('open');
    
    setTimeout(() => {
        detailsElement.style.display = 'none';
        detailsElement.remove();

        document.querySelectorAll('.book.open').forEach(book => {
            book.classList.remove('open');
        });
    }, 50);
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

function validateForm() {
    const title = document.getElementById('title');
    const author = document.getElementById('author');
    const pages = document.getElementById('pages');

    let isValid = true;

    if (title.value.trim() === '') {
        setErrorFor(title, 'Title cannot be blank');
        isValid = false;
    } else {
        setSuccessFor(title);
    }

    if (author.value.trim() === '') {
        setErrorFor(author, 'Author cannot be blank');
        isValid = false;
    } else {
        setSuccessFor(author);
    }

    if (pages.value.trim() === '') {
        setErrorFor(pages, 'Number of pages cannot be blank');
        isValid = false;
    } else if (isNaN(pages.value) || parseInt(pages.value) <= 0) {
        setErrorFor(pages, 'Please enter a valid number of pages');
    } else {
        setSuccessFor(pages);
    }

    return isValid;
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const errorDisplay = formControl.querySelector('.error-message');

    errorDisplay.innerText = message;
    formControl.classList.add('error');
    formControl.classList.remove('success');
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    const errorDisplay = formControl.querySelector('.error-message');

    errorDisplay.innerText = '';
    formControl.classList.add('success');
    formControl.classList.remove('error');
}

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateForm()) {
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const pages = document.getElementById('pages').value;
        const read = document.getElementById('read').checked;

        addBookToLibrary(title, author, pages, read);
        bookForm.reset();
        bookDialog.close();
    }
});

const formInputs = bookForm.querySelectorAll('input:not([type="checkbox"])');
formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateForm();
    });
});

addBookToLibrary('The Poetic Edda', 'Lee M. Hollander', 323, true);
addBookToLibrary('EDDA', 'Snorri Sturluson', 220, true);
addBookToLibrary('Heimskringla', 'Snorri Sturluson', 821, false);
addBookToLibrary('The Kalevala', 'Elias Lönnrot', 666, true);
addBookToLibrary('The Nordic Animist Year', 'Rune Hjarnø Rasmussen', 146, true);
addBookToLibrary('RUNES', 'Michael P. Barnes', 240, true);
addBookToLibrary('The Sagas of Icelanders', 740, true);
addBookToLibrary('Our Fathers Godsaga', 'Viktor Rydberg', 166, true);