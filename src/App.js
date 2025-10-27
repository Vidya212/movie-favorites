import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import MovieGrid from './components/MovieGrid';
import Favorites from './components/Favorites';
import MovieModal from './components/MovieModal';
import { searchMovies, getMovieById } from './api';

export default function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]); // array of detailed movie objects
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('favs') || '[]');
    } catch { return []; }
  });
  const [loading, setLoading] = useState(false);
  const [modalMovie, setModalMovie] = useState(null);

  useEffect(() => {
    localStorage.setItem('favs', JSON.stringify(favorites));
  }, [favorites]);

  async function handleSearch(q) {
    setQuery(q);
    setLoading(true);
    setMovies([]);
    const res = await searchMovies(q);
    if (!res || res.Response === 'False') {
      setLoading(false);
      alert(res?.Error || 'No movies found'); // per requirement: display alert if no movies found.
      return;
    }
    // res.Search contains basic fields; fetch details for genre + full info
    const detailPromises = res.Search.map(item => getMovieById(item.imdbID));
    const details = await Promise.all(detailPromises);
    setMovies(details);
    setLoading(false);
  }

  function toggleFav(movie) {
    setFavorites(prev => {
      const exists = prev.some(m => m.imdbID === movie.imdbID);
      if (exists) return prev.filter(m => m.imdbID !== movie.imdbID);
      // store minimal fields and full info optionally
      return [movie, ...prev];
    });
  }

  async function showDetails(imdbID) {
    setLoading(true);
    const detail = await getMovieById(imdbID);
    setModalMovie(detail);
    setLoading(false);
  }

  return (
    <div className="app">
      <header>
        <h1>Movie Search & Favorites</h1>
        <SearchBar onSearch={handleSearch} />
      </header>

      <main>
        <section className="results">
          <h2>Results {query ? `for "${query}"` : ''}</h2>
          {loading && <div className="loader">Loading…</div>}
          {!loading && <MovieGrid movies={movies} favorites={favorites} onToggleFav={toggleFav} onShowDetails={showDetails} />}
        </section>

        <aside>
          <Favorites favorites={favorites} onToggleFav={toggleFav} onShowDetails={showDetails} />
        </aside>
      </main>

      <MovieModal movie={modalMovie} onClose={() => setModalMovie(null)} />

      <footer>
        <small>Built following the task spec.</small>
      </footer>
    </div>
  );
}
