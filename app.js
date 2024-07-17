//Book Class : Represents a Book

class Book{
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Class : Handle UI tasks

class UI{
    static displayBook(){
        const books = Store.getBooks();
        
        books.forEach((book)=>UI.addBookToList(book));
    }
    static addBookToList(book){
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-outline-danger btn-sm delete" fdprocessedid="li0wu">X</a></td>
        `;
        list.appendChild(row);

    }
    static clearFields(){
        document.querySelector('#Title').value="";
        document.querySelector('#Author').value="";
        document.querySelector('#ISBN').value="";
    }

    static showAlert(message,className){
        const div = document.createElement('div');
        div.className=`alert alert-dismissible alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div,form);
        setTimeout(()=>document.querySelector('.alert').remove(),2000);
    }
    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }
}

// Store Class: Handles Storage
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')===null){
            books = [];
        }
        else
        {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }
    static removeBook(isbn){
        const books = Store.getBooks();
        books.forEach((book,index)=>{
            if(book.isbn===isbn)
            {
                books.splice(index,1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBook);

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit',(e)=>{
    e.preventDefault();
    const title = document.querySelector('#Title').value;
    const author = document.querySelector('#Author').value;
    const isbn = document.querySelector('#ISBN').value;

    if(title===''||author===''||isbn==='')
    {
        UI.showAlert('Please fill in all fields','danger');
    }
    else{
    //Instantiate book
    const book = new Book(title,author,isbn);
    UI.addBookToList(book);
    Store.addBook(book);
    UI.showAlert('Book Added','success');
    UI.clearFields();
    }
})

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click',(e)=>{
    UI.deleteBook(e.target);

    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    UI.showAlert('Book Removed','success');
})