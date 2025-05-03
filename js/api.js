import { TMDB_API_KEY } from './config.js';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

const defaultParams = new URLSearchParams({
  language: 'en-US',
  include_adult: 'false',
  api_key: TMDB_API_KEY
});

async function request(endpoint, params = {}) {
  const url = \`\${BASE_URL}\${endpoint}?\${defaultParams}&\${new URLSearchParams(params)}\`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Network response was not ok');
  return res.json();
}

export async function getPopular(page = 1) {
  return request('/movie/popular', { page });
}

export async function searchMovies(query, page = 1) {
  return request('/search/movie', { query, page });
}

export async function getMovieDetails(id) {
  return request(\`/movie/\${id}\`);
}

export { IMAGE_BASE };
