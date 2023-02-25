const library = [];

function Book(bookInfo) {
  console.log(bookInfo);
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

function setUp() {
  popUp();
}

setUp();
