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

getMovies(API_URL);

function getMovies(url) {
  fetch(url)
    .then(resp => resp.json())
    .then(data => {
      showMovies(data.results);
    });
}

function showMovies(data) {
  main.innerHTML = '';

  data.forEach(movie => {
    const { title, backdrop_path, vote_average } = movie; 
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
    <img src="${IMG_URL + backdrop_path}" alt="${title}" width="100px" />
        <div class="movie-info">
          <h3 class="movie-title">${title}</h3>
          <span class="${getColor(vote_average)}">${vote_average}</span>
          </div>
    
    `;
    main.appendChild(movieEl);
  });
}

function getColor(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5 && vote < 8) {
    return 'orange';
  } else {
    return 'red';
  }
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const searchTerm = search.value;
  console.log(searchTerm);

  if (searchTerm) {
    getMovies(searchURL + '&query=' + searchTerm);
  } else {
    getMovies(API_URL);
  }
});
