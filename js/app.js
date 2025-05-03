import {
  searchMovies,
  getPopularMovies,
  getMovieDetails,
  getPosterURL,
} from './api.js';
import { renderMovies, showModal, bindModalClose } from './ui.js';

const $ = s => document.querySelector(s);

/* ---------- 상태 ---------- */
const state = {
  query: '',
  bookmarks: JSON.parse(localStorage.getItem('bookmarks') || '[]'), // [id,...]
  lastMovies: [], // 최근 렌더링된 결과 캐시
};

/* ---------- 초기화 ---------- */
const init = async () => {
  bindModalClose();

  $('#searchForm').addEventListener('submit', onSearch);
  $('#searchInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') onSearch(e);
  });

  /* 디바운싱: 입력마다 400ms 대기 후 검색 */
  let timer;
  $('#searchInput').addEventListener('input', e => {
    clearTimeout(timer);
    const q = e.target.value.trim();
    timer = setTimeout(() => {
      if (q) performSearch(q);
    }, 400);
  });

  /* 이벤트 위임 (카드 클릭·북마크) */
  $('#movieList').addEventListener('click', onMovieListClick);

  /* 첫 화면 → 인기 영화 */
  const { results } = await getPopularMovies();
  renderAndCache(results);
};

/* ---------- 검색 ---------- */
const onSearch = e => {
  e.preventDefault();
  const q = $('#searchInput').value.trim();
  if (q) performSearch(q);
};

const performSearch = async query => {
  state.query = query;
  const { results } = await searchMovies(query);
  renderAndCache(results);
};

/* ---------- 카드 / 북마크 클릭 ---------- */
const onMovieListClick = async e => {
  const bookmarkBtn = e.target.closest('.bookmark');
  if (bookmarkBtn) {
    const id = Number(bookmarkBtn.parentElement.dataset.id);
    toggleBookmark(id);
    return;
  }

  const card = e.target.closest('.card');
  if (card) showDetails(card.dataset.id);
};

/* ---------- 북마크 토글 ---------- */
const toggleBookmark = id => {
  const idx = state.bookmarks.indexOf(id);
  if (idx >= 0) state.bookmarks.splice(idx, 1);
  else state.bookmarks.push(id);

  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
  renderMovies(state.lastMovies, state.bookmarks); // UI 반영
};

/* ---------- 상세 정보 ---------- */
const showDetails = async id => {
  const m = await getMovieDetails(id);
  showModal(`
    <h2>${m.title} (${m.release_date?.slice(0,4)})</h2>
    <img style="width:180px" src="${getPosterURL(m.poster_path)}" alt="">
    <p>⭐ ${m.vote_average?.toFixed(1)}</p>
    <p>${m.overview || '줄거리 정보 없음'}</p>
  `);
};

/* ---------- 헬퍼 ---------- */
const renderAndCache = movies => {
  state.lastMovies = movies;
  renderMovies(movies, state.bookmarks);
};

/* ---------- GO ---------- */
init();
