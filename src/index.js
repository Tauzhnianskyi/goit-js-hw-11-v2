const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'api_key=14f00e78a1ac618254d40a79e60e9f37';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/keyword?' + API_KEY;

const main = document.getElementById('main');
const form = document.querySelector('form');
const search = document.getElementById('search');
const searchBtn = document.querySelector('.searchBtn');
console.log(search.value);

function showMovies(data) {
  main.innerHTML = '';

  data.forEach(movie => {
    const {
      title,
      backdrop_path,
      vote_average,
      id,
      overview,
      vote_count,
      popularity,
      genre_ids,
    } = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
    <img src="${IMG_URL + backdrop_path}" alt="${title}" width="100px" />
        <div class="movie-info">
          <h3 class="movie-title">${title}</h3>
          <span class="avarage">${vote_average}</span>
          <span class="id-number">${id}</span>
          <button type="button" class="btn-${id}">Add to wish</button>
          </div>
    
    `;
    main.appendChild(movieEl);

    const Storage = {
      img: `${IMG_URL + backdrop_path}`,
      title: `${title}`,
      id: `${id}`,
      overview: `${overview}`,
      vote_count: `${vote_count}`,
      popularity: `${popularity}`,
      genre_ids: `${genre_ids}`,
    };

    const wishBtn = document.querySelector(`.btn-${id}`);
    wishBtn.addEventListener('click', function handleClick() {
      window.localStorage.setItem(`movie#${id}`, JSON.stringify(Storage));
    });
  });
}
