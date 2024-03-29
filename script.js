const library = [];

class Book {
  constructor(bookInfo) {
    this.title = bookInfo[0];
    this.author = bookInfo[1];
    this.pages = bookInfo[2];
    this.read = false;
    if (bookInfo[3]) {
      this.read = true;
    }
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

function attachEventListeners(book, read, remove) {
  read.addEventListener('click', () => {
    book.read = !book.read;
    checkReadState(book, read);
  });

  remove.addEventListener('click', () => {
    const index = parseInt(remove.getAttribute('data-index'));
    library.splice(index, 1);
    createBooksDisplay();
  });
}

function createCard(book) {
  const card = document.createElement('div');
  const title = document.createElement('p');
  const author = document.createElement('p');
  const pages = document.createElement('p');
  const read = document.createElement('button');
  const remove = document.createElement('button');

  card.classList.add('card');
  remove.classList.add('remove');
  remove.setAttribute('data-index', library.indexOf(book).toString());
  title.textContent = `"${book.title}"`;
  author.textContent = `by ${book.author}`;
  pages.textContent = `${book.pages} pages`;
  remove.textContent = 'Remove';
  checkReadState(book, read);

  attachEventListeners(book, read, remove);

  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(pages);
  card.appendChild(read);
  card.appendChild(remove);

  return card;
}

function createBooksDisplay() {
  const main = document.querySelector('.main');
  const booksDisplay = document.createElement('div');
  booksDisplay.classList.add('books-display');
  main.removeChild(document.querySelector('div:last-child'));

  for (let book of library) {
    const card = createCard(book);
    booksDisplay.appendChild(card);
  }
  main.appendChild(booksDisplay);
}

function checkTitle() {
  const title = document.getElementById('title');

  if (title.validity.valueMissing) {
    title.setCustomValidity('You must provide a title');
  } else {
    title.setCustomValidity('');
  }
}

function checkAuthor() {
  const author = document.getElementById('author');

  if (author.validity.valueMissing) {
    author.setCustomValidity('You must provide an author');
  } else {
    author.setCustomValidity('');
  }
}

function checkPages() {
  const pages = document.getElementById('pages');

  if (pages.validity.valueMissing) {
    pages.setCustomValidity('You must provide a number of pages');
  } else if (pages.validity.rangeUnderflow) {
    pages.setCustomValidity('Number of pages must be greater than 1');
  } else if (pages.validity.stepMismatch) {
    pages.setCustomValidity('Number of pages must be a whole number');
  } else {
    pages.setCustomValidity('');
  }
}

function checkValidity() {
  checkTitle();
  checkAuthor();
  checkPages();
}

function addValidation() {
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  const pages = document.getElementById('pages');

  checkValidity();
  title.addEventListener('input', checkTitle);
  author.addEventListener('input', checkAuthor);
  pages.addEventListener('input', checkPages);
}

function submit() {
  const form = document.querySelector('.new-book-form');

  form.addEventListener('submit', function (event) {
    const book = new Book(getData(event.target));
    const modal = document.querySelector('.modal');

    event.preventDefault();
    library.push(book);
    createBooksDisplay();
    modal.style.visibility = 'hidden';
    form.reset();
    checkValidity();
  });
}

function setUp() {
  popUp();
  addValidation();
  submit();
}

setUp();
