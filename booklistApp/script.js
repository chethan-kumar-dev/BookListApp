//  book class
class Book{
   constructor(title , author , isbn){
      this.title = title;
      this.author = author;
      this.isbn = isbn;
   }

}
//store

class Store{
   static getBooks(){
      let books = [];
      if(localStorage.getItem('books')===null){
         return books
      }
      else
      {
        books= JSON.parse(localStorage.getItem('books'));
         return books
      }
   }

   static addBook(book){
      const books = Store.getBooks();

      books.push(book);
      localStorage.setItem('books',JSON.stringify(books));
   }

   static deleteBookFromStorage(isbn){
      const books = Store.getBooks();
      console.log(books)
      books.map((value,index)=>{
         console.log(value.isbn)
         if(value.isbn===isbn){
            books.splice(index,1)
         }
      })
      localStorage.setItem('books',JSON.stringify(books))
      
   }
}

// display books

class UI{
   static displayBooks(){
      const bookList = Store.getBooks();
      if(bookList===[]){

      }
      else
      {
         // loop over books list array and calls method bookDisplay
         bookList.map(book => UI.bookDisplay(book))
      }
   }

   static bookDisplay(book){
      const tableBody = document.getElementById('table-body');
      const row = document.createElement('tr');
      row.innerHTML=`
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><button value='${book.isbn}' class='btn btn-danger btn-sm  delete'>X</button></td>
      `
      tableBody.appendChild(row)
   }

   static clearFields(){
      document.querySelector('#title').value = ''
      document.querySelector('#author').value = ''
      document.querySelector('#isbn').value = ''
   }

   static deleteBook(ele , isbn){
      console.log(ele)
      if(ele.classList.contains('delete')){
         ele.parentElement.parentElement.remove()
      }
      console.log(isbn)
      Store.deleteBookFromStorage(isbn)
   }

   static showAlert(message,className){
      const container = document.querySelector('.container');
      const form = document.querySelector('#form');

      const div = document.createElement('div');
      div.innerHTML = message;
      div.className=`alert alert-${className}`
      container.insertBefore(div,form);

      setTimeout(() => {
         document.querySelector('.alert').remove()
      }, 3000);
   }
}

document.addEventListener('DOMContentLoaded', UI.displayBooks())

// Add books

const form = document.querySelector('#form');
form.addEventListener('submit', (e)=>{
   e.preventDefault();

   
   let title = document.querySelector('#title').value;
   let author = document.querySelector('#author').value;
   let isbn = document.querySelector('#isbn').value;


   if(title === '' || author === '' || isbn ===''){
      UI.showAlert('Please fill in the details','danger')
   } 
   else{
      UI.showAlert('Your book is added','success')
      const book = new Book(title,author,isbn)
      UI.bookDisplay(book);
      
      Store.addBook(book)
      // clear Fileds
   
      UI.clearFields();
   }
  
})

// remove book

const del = document.querySelector('#table-body');
del.addEventListener('click',(e)=>{
   UI.deleteBook(e.target, e.target.value)
   UI.showAlert('Book Removed','success')
})

// local storage

