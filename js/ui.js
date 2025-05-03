import { getPosterURL } from './api.js';

const $ = s => document.querySelector(s);

/* 카드 렌더 */
export const renderMovies = (movies = [], bookmarks = []) => {
  const list = $('#movieList');
  list.innerHTML = movies
    .map(m => {
      const marked = bookmarks.includes(m.id);
      return `
      <article class="card" data-id="${m.id}">
        <img src="${getPosterURL(m.poster_path)}" alt="${m.title}">
        <button class="bookmark ${marked ? 'active' : ''}" aria-label="bookmark">
          ${marked ? '★' : '☆'}
        </button>
        <div class="card-content">
          <h3>${m.title}</h3>
          <p class="rating">⭐ ${m.vote_average?.toFixed(1)}</p>
        </div>
      </article>`;
    })
    .join('');
};

/* 모달 */
export const showModal = html => {
  $('#modalBody').innerHTML = html;
  $('#modal').classList.remove('hidden');
};
export const hideModal = () => $('#modal').classList.add('hidden');
export const bindModalClose = () =>
  $('#modalClose').addEventListener('click', hideModal);
