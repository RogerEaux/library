const library = [];

function Book(bookInfo) {
  this.title = bookInfo[0];
  this.author = bookInfo[1];
  this.pages = bookInfo[2];
  this.read = false;
  if (bookInfo[3]) {
    this.read = true;
  }
}

function popUp() {
  const modal = document.querySelector('.modal');
  const addBook = document.querySelector('.add-book button');

  addBook.addEventListener('click', () => (modal.style.visibility = 'visible'));
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.visibility = 'hidden';
    }
  });
}

function getData(form) {
  const formData = new FormData(form);
  const bookInfo = [];

  for (let pair of formData.entries()) {
    bookInfo.push(pair[1]);
  }

  return bookInfo;
}

function createBookCard(book) {
  const booksDisplay = document.querySelector('.display-books');
  const card = document.createElement('div');
  const title = document.createElement('p');
  const author = document.createElement('p');
  const pages = document.createElement('p');
  const read = document.createElement('button');
  const readIt = 'Have read it';
  const notReadIt = 'Not read yet';

  card.classList.add('card');

  title.textContent = `"${book.title}"`;
  author.textContent = `by ${book.author}`;
  pages.textContent = `${book.pages} pages`;
  read.textContent = notReadIt;
  if (book.read === true) {
    read.textContent = readIt;
    read.classList.toggle('read');
  }

  read.addEventListener('click', () => {
    if (read.textContent === readIt) {
      read.textContent = notReadIt;
    } else {
      read.textContent = readIt;
    }
    read.classList.toggle('read');
  });

  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(pages);
  card.appendChild(read);
  booksDisplay.appendChild(card);
}

function submit() {
  const form = document.querySelector('.new-book-form');

  form.addEventListener('submit', function (event) {
    let book = new Book(getData(event.target));
    const modal = document.querySelector('.modal');

    event.preventDefault();
    library.push(book);
    createBookCard(book);
    modal.style.visibility = 'hidden';
    form.reset();
  });
}

function setUp() {
  popUp();
  submit();
}

setUp();
