import { getPopular, searchMovies, getMovieDetails } from './api.js';
import { renderMovies, openModal } from './ui.js';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const moviesContainer = document.getElementById('movies');

// Initial load
(async () => {
  try {
    const data = await getPopular();
    renderMovies(data.results);
  } catch (err) {
    console.error(err);
    alert('Failed to load popular movies 🥲');
  }
})();

// Search handler
searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (!query) return;
  try {
    const data = await searchMovies(query);
    renderMovies(data.results);
  } catch (err) {
    console.error(err);
    alert('Search failed');
  }
});

// Event delegation for movie card click
moviesContainer.addEventListener('click', async (e) => {
  const card = e.target.closest('.movie-card');
  if (!card) return;
  const id = card.dataset.id;
  try {
    const movie = await getMovieDetails(id);
    openModal(detailTemplate(movie));
  } catch (err) {
    console.error(err);
    alert('Could not load movie details');
  }
});

function detailTemplate(m) {
  const poster = m.poster_path ? 'https://image.tmdb.org/t/p/w500' + m.poster_path : '';
  return /*html*/\`
    <h2>\${m.title} (\${m.release_date?.slice(0,4)})</h2>
    <img src="\${poster}" alt="\${m.title}" style="width:200px;float:left;margin-right:1rem;" />
    <p><strong>Rating:</strong> \${m.vote_average.toFixed(1)}</p>
    <p><strong>Overview:</strong> \${m.overview}</p>
  \`;
}
