let myLibrary = localStorage.getItem("myLibrary");
if(myLibrary === null) {
    myLibrary = [];
} else {
    myLibrary = JSON.parse(myLibrary);
}
render();

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    populateStorage();
    render();
}

function populateStorage() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function render() {
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
    const library = document.querySelector("div.library");
    for(let i = 0; i < myLibrary.length; i++) {
        
        const bookContainer = document.createElement("div");
        bookContainer.classList.add("book-container");
        bookContainer.setAttribute("data-book-number", i);
        
        const book = document.createElement("div");
        book.classList.add("book");
        book.textContent = myLibrary[i].title + ", " + myLibrary[i].author + ", " + myLibrary[i].pages + ", " + myLibrary[i].read;
        book.setAttribute("data-book-number", i);
        bookContainer.appendChild(book);

        const deleteBookButton = document.createElement("button");
        deleteBookButton.textContent = "Remove";
        deleteBookButton.classList.add("delete-book-button");
        deleteBookButton.setAttribute("data-book-number", i);
        bookContainer.appendChild(deleteBookButton);

        const changeStatusButton = document.createElement("button");
        if(myLibrary[i].read) {
            changeStatusButton.textContent = "Mark as Unread";
        } else {
            changeStatusButton.textContent = "Mark as Read";
        }
        changeStatusButton.classList.add("change-status-button");
        changeStatusButton.setAttribute("data-book-number", i);
        bookContainer.appendChild(changeStatusButton);
        
        library.appendChild(bookContainer);
    }
}

function showAddBookForm() {
    addBookForm.style.display = "block";
    newBookButton.style.display = "none";
}

function hideAddBookForm() {
    addBookForm.style.display = "none";
    newBookButton.style.display = "block";
}

function addBook() {
    hideAddBookForm();
    let title = document.querySelector("#book-title").value;
    let author = document.querySelector("#book-author").value;
    let pages = document.querySelector("#book-pages").value;
    let readOptions = document.getElementsByName("read");
    let read;
    if(readOptions[0].checked) {
        read = true;
    } else {
        read = false;
    }
    addBookToLibrary(title, author, pages, read);
}

function deleteBook() {
    const library = document.querySelector("div.library");
    let books = document.querySelectorAll("div.book-container");
    books.forEach(book => {if(this.getAttribute("data-book-number") == book.getAttribute("data-book-number")){
        library.removeChild(book);
    }})
    myLibrary.splice(Number(this.getAttribute("data-book-number")), 1);
    populateStorage();
}

function changeStatus() {
    let books = document.querySelectorAll("div.book-container");
    books.forEach(book => {if(this.getAttribute("data-book-number") == book.getAttribute("data-book-number")){
        i = Number(this.getAttribute("data-book-number"));
        myLibrary[i].read = !myLibrary[i].read;
        populateStorage();
        book.children[0].textContent = myLibrary[i].title + ", " + myLibrary[i].author + ", " + myLibrary[i].pages + ", " + myLibrary[i].read;
        if(myLibrary[i].read) {
            book.children[2].textContent = "Mark as Unread";
        } else {
            book.children[2].textContent = "Mark as Read";
        }
    }})
}

const addBookForm = document.querySelector("form.add-book-form");
const addBookButton = document.querySelector("input.add-book-button");
const newBookButton = document.querySelector("button.new-book-button");
const cancelButton = document.querySelector("input.cancel-button");

newBookButton.addEventListener("click", showAddBookForm);
addBookButton.addEventListener("click", addBook);
cancelButton.addEventListener("click", hideAddBookForm);

const deleteBookButtons = document.querySelectorAll("button.delete-book-button");
deleteBookButtons.forEach(button => button.addEventListener("click", deleteBook));

const changeStatusButtons = document.querySelectorAll("button.change-status-button");
changeStatusButtons.forEach(button => button.addEventListener("click", changeStatus));
