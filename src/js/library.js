const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'api_key=14f00e78a1ac618254d40a79e60e9f37';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/keyword?' + API_KEY;

export function getMoviestoLibrary() {
  for (let i = 0; i < localStorage.length; i++) {
    const currentMovie = JSON.parse(localStorage.getItem(localStorage.key(i)));
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
    <img src="${currentMovie.img}" alt="${currentMovie.title}" width="100px" />
        <div class="movie-info-${currentMovie.id}">
          <h3 class="movie-title">${currentMovie.title}</h3>
          <span class="avarage">${currentMovie.vote_count}</span>
          <span class="id-number">${currentMovie.id}</span>
          <button type="button" class="btn-${currentMovie.id}">Remove from wish</button>
          </div>
    `;
    main.appendChild(movieEl);
    const removeBtn = document.querySelector(`.btn-${currentMovie.id}`);
    removeBtn.addEventListener('click', onRemoveBtnClick);
    function onRemoveBtnClick() {
      window.localStorage.removeItem(`${currentMovie.id}`);
      const divEl = document.querySelector(`.movie-info-${currentMovie.id}`);
      divEl.parentElement.remove();
    }
  }
}
getMoviestoLibrary();
