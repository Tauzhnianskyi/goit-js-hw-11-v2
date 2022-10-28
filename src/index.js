import { fetchImg } from './js/api';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import photoMarkupTemplate from './js/templates/markup.hbs';

const form = document.querySelector('#search-form');
const inputRef = document.querySelector('input[type="text"]');
const gallery = document.querySelector('.gallery');
const btnToTop = document.querySelector('.to-top');

const gallerySimpleLightbox = new SimpleLightbox('.gallery a');

// ----for infinity scroll-------------------------
const guard = document.querySelector('.guard');
const options = {
  root: null,
  rootMargin: '200px',
  threshold: 1,
};
const observer = new IntersectionObserver(onLoad, options); //клас для створення infinity scroll
// -------------------------------------------------------------------------------
let pageNumber = 1;

// btnToTop.style.display = 'none';

// вішаємо слухача на форму, щоб потім, якщо буде додатковий функціонал(інші кнопки в ній), щоб слухач тільки один був і було від нього делегування
form.addEventListener('submit', onBtnSearchClick);

function onBtnSearchClick(e) {
  e.preventDefault();
  cleanGallery();
  const trimmedValue = inputRef.value.trim();
  if (trimmedValue !== '') {
    fetchImages(trimmedValue, pageNumber).then(data => {
      console.log(data);
      const pages = Math.ceil(data.totalHits / data.hits.length);
      //   console.log('onBtnSearchClick', data);
      if (data.totalHits === 0) {
        console.log(pageNumber, pages);
        btnToTop.style.display = 'none';
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        observer.unobserve(guard);
      } else {
        console.log(pageNumber, pages);
        observer.observe(guard);
        renderImageList(data.hits);
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
        if (pageNumber === pages) {
          console.log(pageNumber === pages);
          Notiflix.Notify.failure(
            "We're sorry, but you've reached the end of search results."
          );
          observer.unobserve(guard);
        }
      }
      gallerySimpleLightbox.refresh();
    });
  }
}

// функція для infinity scroll--------------------------
function onLoad(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      //true
      const trimmedValue = inputRef.value.trim();
      btnToTop.style.display = 'inline-flex';
      fetchImages(trimmedValue, pageNumber).then(data => {
        pageNumber += 1;
        const pages = Math.ceil(data.totalHits / data.hits.length);
        if (pageNumber === pages) {
          console.log(pageNumber, pages);

          renderImageList(data.hits);
          Notiflix.Notify.failure(
            "We're sorry, but you've reached the end of search results."
          );
          observer.unobserve(guard);
        } else {
          console.log(pageNumber, pages);
          renderImageList(data.hits);
          observer.observe(guard);
          gallerySimpleLightbox.refresh();
        }
      });
    }
  });
}

function renderImageList(images) {
  // ------з використанням шаблонізатора handlebars-----------------------
  gallery.insertAdjacentHTML('beforeend', photoMarkupTemplate(images));
}
// --------функція для очищення галереї та повернення до дефолтних значень-------------------------------------------
function cleanGallery() {
  gallery.innerHTML = '';
  pageNumber = 1;
  btnToTop.style.display = 'none';
  observer.unobserve(guard);
}

// ----- for scroll to up  ----------------------------
btnToTop.addEventListener('scroll', scrollToTop);
function scrollToTop(e) {
  e.preventDefault();
  window.scrollTo({
    top: 50,
    behavior: 'smooth',
  });
  btnToTop.removeEventListener('scroll', scrollToTop);
}

// import simpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
// import Notiflix from 'notiflix';
// import { fetchImg } from './js/api';
// import markup from './js/templates/markup.hbs';
// // import markup from './js/markup';

// const refs = {
//   formEl: document.querySelector('.search-form'),
//   inputEl: document.querySelector('input[name="searchQuery"]'),
//   searchBtn: document.querySelector('button'),
//   gallery: document.querySelector('.gallery'),
// };

// const imgSimplelightbox = new SimpleLightbox('.gallery a');
// refs.searchBtn.addEventListener('submit', onClick);

// function onClick(e) {
//   e.preventDefault();
//   cleanGallery();
//   const trimValue = inputEl.value.trim();
//   if (trimValue !== '') {
//     fetchImg(trimValue, pageNum).then(data => {
//       console.log(data);
//       const pages = Math.ceil(data.totalHits / data.hits.length);
//       if (data.totalHits === 0) {
//         console.log(pageNum, pages);
//         Notiflix.Notify.failure(
//           'Sorry, there are no images matching your search query. Please try again.'
//         );
//         observer.unobserve(guard);
//       } else {
//         console.log(pageNum, pages);
//         observer.observe(guard);
//         renderImageList(data.hits);
//         Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
//         if (pageNum === pages) {
//           console.log(pageNum === pages);
//           Notiflix.Notify.failure(
//             "We're sorry, but you've reached the end of search results."
//           );
//           observer.unobserve(guard);
//         }
//       }
//       gallerySimpleLightbox.refresh();
//     });
//   }
// }
// function renderImageList(images) {
//   gallery.insertAdjacentHTML('beforeend', markup(images));
// }
