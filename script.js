let myLibrary = [];
const bookLibrary = document.querySelector('.book-library')
let bookId = 1;

function Book(title, author, year, pages, id, read) {
    this.title = title
    this.author = author
    this.year = year
    this.pages = pages
    this.id = id
    this.read = read
}

function addBookToLibrary() {
    bookLibrary.innerHTML = "";
    myLibrary.forEach(function (book) {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookLibrary.appendChild(bookCard);

        const readToggle = document.createElement('button');
        readToggle.textContent = book.read;
        bookCard.appendChild(readToggle);

        const bookTitle = document.createElement('p');
        bookTitle.textContent = `Title: ${book.title}`;
        bookCard.appendChild(bookTitle);

        const bookAuthor = document.createElement('p');
        bookAuthor.textContent = `Author: ${book.author}`;
        bookCard.appendChild(bookAuthor);

        const bookYear = document.createElement('p');
        bookYear.textContent = `Year: ${book.year}`;
        bookCard.appendChild(bookYear);

        const bookPages = document.createElement('p');
        bookPages.textContent = `Pages: ${book.pages}`;
        bookCard.appendChild(bookPages);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute("class", "delete-button");
        deleteButton.setAttribute("id", book.id);
        bookCard.appendChild(deleteButton);

        deleteButton.addEventListener('click', () => {
            const selectedBook = myLibrary.findIndex(book => book.id === parseInt(deleteButton.id));
            myLibrary.splice(selectedBook,1);
            addBookToLibrary();
        })

        function updateReadStatus() {
            readToggle.classList.remove('read-button-read', 'read-button-notread');
            if (book.read) {
                readToggle.textContent = 'READ';
                readToggle.classList.add('read-button-read');
            } else {
                readToggle.textContent = 'NOT READ';
                readToggle.classList.add('read-button-notread');
            }
        }

        updateReadStatus();

        readToggle.addEventListener('click', () => {
            book.read = !book.read; // Toggle the boolean read property
            updateReadStatus();
        });
    })
}


const submitButton = document.querySelector('#submitButton');

const bookForm = document.querySelector('#bookForm')

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    const titleContent = document.querySelector('#title').value;
    const authorContent = document.querySelector('#author').value;
    const yearContent = document.querySelector('#year').value;
    const pagesContent = document.querySelector('#pages').value;
    const read = document.querySelector('#read').checked;
    const book = new Book(titleContent, authorContent, yearContent, pagesContent, bookId, read);
    myLibrary.push(book);
    bookId++;
    bookForm.reset();
    addBookToLibrary();
});

const createFormButton = document.querySelector('#showForm');

createFormButton.addEventListener('click', () => {
    if (document.body.contains(bookForm)) {
        document.body.removeChild(bookForm);
        createFormButton.textContent= "+ADD";
        bookLibrary.classList.remove('book-library');
        bookLibrary.classList.add('book-library-max')
        
    } else {
        document.body.appendChild(bookForm);
        createFormButton.textContent= "HIDE";
        bookLibrary.classList.add('book-library');
        bookLibrary.classList.remove('book-library-max')
    }
    
})