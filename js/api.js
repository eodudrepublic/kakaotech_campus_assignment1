import { TMDB_ACCESS_TOKEN } from './config.js';

const BASE = 'https://api.themoviedb.org/3';
const IMG  = 'https://image.tmdb.org/t/p/w500';

const headers = {
  accept: 'application/json',
  Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
};

const fetchJSON = async (endpoint, params = {}) => {
  const url = new URL(`${BASE}${endpoint}`);
  if (Object.keys(params).length) url.search = new URLSearchParams(params);
  const res = await fetch(url, { headers });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`TMDB ${res.status}: ${txt}`);
  }
  return res.json();
};

export const searchMovies = (query, page = 1, lang = 'ko-KR') =>
  fetchJSON('/search/movie', { query, language: lang, page });

export const getPopularMovies = (page = 1, lang = 'ko-KR') =>
  fetchJSON('/movie/popular', { language: lang, page });

export const getMovieDetails = (id, lang = 'ko-KR') =>
  fetchJSON(`/movie/${id}`, { language: lang });

export const getPosterURL = path =>
  path ? `${IMG}${path}` : 'https://via.placeholder.com/500x750?text=No+Image';
