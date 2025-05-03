import { IMAGE_BASE } from './api.js';

const moviesContainer = document.getElementById('movies');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const modalCloseBtn = document.getElementById('modal-close');

export function renderMovies(movies = []) {
  moviesContainer.innerHTML = movies.map(toCard).join('');
}

export function toCard(movie) {
  const poster = movie.poster_path ? IMAGE_BASE + movie.poster_path : 'https://via.placeholder.com/500x750?text=No+Image';
  return /*html*/\`
    <article class="movie-card" data-id="\${movie.id}">
      <img src="\${poster}" alt="\${movie.title}" />
      <div class="movie-info">
        <h3>\${movie.title}</h3>
        <span class="rating">★ \${movie.vote_average.toFixed(1)}</span>
      </div>
    </article>\`;
}

export function openModal(contentHtml) {
  modalBody.innerHTML = contentHtml;
  modal.classList.remove('hidden');
}

export function closeModal() {
  modal.classList.add('hidden');
  modalBody.innerHTML = '';
}

modalCloseBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});
