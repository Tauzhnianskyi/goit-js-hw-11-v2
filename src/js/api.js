import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '30150514-c6c2592e7290a81c416aa6291';

fetch(
  `${BASE_URL}/?key=${API_KEY}&q=all&orientation=horizontal&safesearch=true&image_type=photo&per_page=40&page=1`
)
  .then(resp => {
    resp.json();
  })
  .then(data => {
    console.log(data);
  });
