import axios from 'axios';

const API_KEY = '28245233-b42719d95300d696a532045bb';
const BASE_URL = 'https://pixabay.com/api/';

export const getImages = (imageQuery, page) => {
  return axios.get(
    `${BASE_URL}?q=${imageQuery}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`
  );
};
