// import BooksApiService from './BooksApiService';
import onCategoryHandle from './onCategoryHandle';
import Notiflix from 'notiflix';

// import openModal from '';

import axios from 'axios';

class BooksApiService {
  static URL = 'https://books-backend.p.goit.global/books/';
  static ENDPOINT_CATEGORIES_LIST = 'category-list';
  static ENDPOINT_TOP_BOOKS = 'top-books';

  // constructor() {
  //   this.query = '';
  //   this.page = 1;
  // }

  // Отримати масив усіх категорій
  async getCategoriesList() {
    const url = `${BooksApiService.URL}${BooksApiService.ENDPOINT_CATEGORIES_LIST}`;

    const { data } = await axios.get(url);
    return data;
  }

  // Отримати масив об'єктів з двома полями:
  // list_name: назва категорії,
  // books: масив топ 5 книг за категорією
  async getTopBooks() {
    const url = `${BooksApiService.URL}${BooksApiService.ENDPOINT_TOP_BOOKS}`;

    const { data } = await axios.get(url);
    return data;
  }

  // Отримати масив топ 5 книг за категорією categoryName
  async getTopBooksByCategory(categoryName) {
    const url = `${BooksApiService.URL}${BooksApiService.ENDPOINT_TOP_BOOKS}`;

    const { data } = await axios.get(url);
    let books = await data.find(
      category =>
        category.list_name.toLowerCase() === categoryName.toLowerCase()
    );
    return books.books;
  }

  // Отримати масив усіх книг за категорією categoryName
  async getBooks(categoryName) {
    const url = `${BooksApiService.URL}category?category=${categoryName}`;

    const { data } = await axios.get(url);
    return data;
  }

  // отримати об'єкт з інформацією про книгу за ІD книги bookId
  async getInfoAboutBook(bookId) {
    const url = `${BooksApiService.URL}${bookId}`;

    const { data } = await axios.get(url);
    return data;
  }

  // incrementPage() {
  //   this.page += 1;
  // }

  // resetPage() {
  //   this.page = 1;
  // }
}

// const api = new BooksApiService();

// api
//   .getCategoriesList()
//   .then(list => console.log(list))
//   .catch(err => console.log(err));

const allCategoriesRef = document.querySelector('.all-categories-list');
const bestSellersRef = document.querySelector('.best-sellers');

const api = new BooksApiService();

allCategoriesRef.addEventListener('click', onCategoryHandle);

createCategoriesList();

function createCategoriesList() {
  api
    .getCategoriesList()
    .then(list => {
      const markup = list
        .map(
          listItem =>
            `<li class="all-categories-list__item" data-category-name="${listItem.list_name}">
          ${listItem.list_name}
          </li>`
        )
        .join('');
      allCategoriesRef.insertAdjacentHTML('beforeend', markup);

      // console.log(list);
    })
    .catch(err => console.log(err));
}

function accentSelectedTitle(e) {
  const arrOfCategories = [...e.currentTarget.children];
  arrOfCategories.forEach(liItem => {
    liItem.classList.remove('current-category');
  });
  e.target.classList.add('current-category');
}

createTopBestSellersMarkup()
  .then(a => {
    bestSellersRef.innerHTML = a;
  })
  .catch(e => {
    console.log(e);
    Notiflix.Report.failure('Error', `${error}`, 'OK');
  });

async function createTopBestSellersMarkup() {
  let markup = await api
    .getTopBooks()
    .then(categotiesTop => {
      return categotiesTop
        .map(
          categoryTop => `<li class="best-sellers-category">
        <p class="category-title">${categoryTop.list_name}</p>
        <ul class="best-sellers__by-category">
      ${categoryTop.books
        .map(
          book => `<li class="best-sellers-book__by-category"  data-book-id="${book._id}">
       <img class="best-sellers-book__img" src="${book.book_image}" alt="${book.title}" />
       <p class="best-sellers-book__title">${book.title}</p>
       <p class="best-sellers-book__author">${book.author}</p>
       </li> `
        )
        .join('')}
        </ul>
        <button type="button" class="best-sellers__btn-see-more" data-btn-category-name="${
          categoryTop.list_name
        }">see more</button>
        </li>`
        )
        .join('');
    })
    .catch(error => {
      console.log(error.message);
      allCategoriesRef.innerHTML = 'No information';
      Notiflix.Report.failure('Error', 'Try again later!', 'OK');
    });

  return markup;
}

const selectedCategoryList = document.querySelector('.selected-category__list');

selectedCategoryList.addEventListener('click', bookCardHandle);

function bookCardHandle(e) {
  if (
    !(
      (e.target.parentElement.nodeName === 'LI' &&
        e.target.parentElement.dataset.bookId) ||
      (e.target.nodeName === 'LI' && e.target.dataset.bookId)
    )
  ) {
    return;
  }

  const bookID =
    e.target.nodeName === 'LI'
      ? e.target.dataset.bookId
      : e.target.parentElement.dataset.bookId;

  // console.log(bookID);

  // openModal(bookID)
}

export { createTopBestSellersMarkup, accentSelectedTitle };
