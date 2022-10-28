import getPic from './js/api';

refs = {
  input: document.querySelector('input[type="text"]'),
  submitBtn: document.querySelector('button[type="submit"]'),
  gallery: document.querySelector('.gallery'),
};

refs.input.addEventListener('input', debounce(onSearch, 500));

function fetchImg(searchData) {
  const BASE_URL = 'https://pixabay.com/api';
  const API_KEY = '30150514-c6c2592e7290a81c416aa6291';
  const URL = `${BASE_URL}/?key=${API_KEY}&q=all&orientation=horizontal&safesearch=true&image_type=photo&per_page=40&page=1`;

  return fetch(URL).then(resp => resp.json());
}

function onSearch(e) {
  e.preventDefault();
  const searchImg = refs.input.value.toLowerCase().reim();

  fetchImg(searchImg)
    .then(createGallery)
    .catch(err => console.log(err));
}

function createGallery(responceAPI) {
  console.log('createGallery - fetchData', responseAPI.hits);

  const galleryList = responseAPI
    .map(image => renderGalleryCard(image.hits))
    .join('');
  refs.gallery.inserAdjacentHTML('beforeend', galleryList);
}

function renderGalleryCard(array) {
  const {
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = array.hits;
  console.log('renderGalleryCad'.array.hits);

  return `<div class="photo-card">
  <img src="" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div>`;
}
