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

function checkReadState(book, read) {
  const readIt = 'Have read it';
  const notReadIt = 'Not read yet';

  if (book.read) {
    read.textContent = readIt;
    read.classList.add('read');
  } else {
    read.textContent = notReadIt;
    read.classList.remove('read');
  }
}

function createBookCard(book) {
  const booksDisplay = document.querySelector('.display-books');
  const card = document.createElement('div');
  const title = document.createElement('p');
  const author = document.createElement('p');
  const pages = document.createElement('p');
  const read = document.createElement('button');

  card.classList.add('card');

  title.textContent = `"${book.title}"`;
  author.textContent = `by ${book.author}`;
  pages.textContent = `${book.pages} pages`;
  checkReadState(book, read);

  read.addEventListener('click', () => {
    book.read = !book.read;
    checkReadState(book, read);
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
    const book = new Book(getData(event.target));
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
