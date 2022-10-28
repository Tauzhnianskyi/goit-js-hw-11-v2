import axios from 'axios'; /* const axios = require('axios').default;*/

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '30150514-c6c2592e7290a81c416aa6291';

// ---------Для HTTP-запитів використана бібліотека axios---------------------
export async function fetchImages(trimmedValue, pageNumber) {
  return await axios
    .get(
      `${BASE_URL}/?key=${API_KEY}&q=${trimmedValue}&orientation=horizontal&safesearch=true&image_type=photo&per_page=40&page=${pageNumber}`
    )
    .then(async response => {
      if (!response.ok) {
        if (response.status === 404) {
          return [];
        }
        new Error(response.status);
      }
      return await response.data;
    })
    .catch(error => {
      console.error(error);
    });
}

// import axios from 'axios';

// const BASE_URL = `https://pixabay.com/api/`;
// const USER_KEY = `30737350-82f55820a31d3ae852bd21a9d`;

// export async function fetchImg(trimValue, pageNum) {
//   return await axios
//     .get(
//       `${BASE_URL}?key=${USER_KEY}&q=${trimValue}&orientation=horizontal&safesearch=true&image_type=photo&per_page=40&page=${pageNum}`
//     )
//     .then(async response => {
//       if (!response.ok) {
//         if (response.status === 404) {
//           return [];
//         }
//         new Error(response.status);
//       }
//       return await response.data;
//     })
//     .catch(error => console.log(error));
// }
