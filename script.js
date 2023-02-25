const library = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

const modal = document.querySelector('.modal');
const addBook = document.querySelector('.add-book button');

addBook.addEventListener('click', () => (modal.style.visibility = 'visible'));
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.visibility = 'hidden';
  }
});
