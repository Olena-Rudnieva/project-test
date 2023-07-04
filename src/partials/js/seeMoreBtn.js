import { createCategory } from './onCategoryHandle';

const listOfSelectedCategory = document.querySelector(
  '.selected-category__list'
);

listOfSelectedCategory.addEventListener('click', onBtnSeeMoreHandle);

function onBtnSeeMoreHandle(e) {
  //   console.dir(e.target.nodeName === 'BUTTON');
  //   console.dir(e.target.textContent === 'see more');
  //   console.dir(e.target.dataset.btnCategoryName);

  if (
    !(e.target.textContent === 'see more' && e.target.nodeName === 'BUTTON')
  ) {
    return;
  }

  //   console.log(e.target.dataset.btnCategoryName);

  removeAccentFromBestSellersTitle();
  createCategory(e.target.dataset.btnCategoryName);
}

function removeAccentFromBestSellersTitle() {
  const bestSellersTitleRef = document.querySelector(
    '.all-categories-list__item[data-category-name="All categories"]'
  );
  bestSellersTitleRef.classList.remove('current-category');
}
