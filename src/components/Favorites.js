import React from 'react';
import MovieCard from './MovieCard';

export default function Favorites({ favorites, onToggleFav, onShowDetails }) {
  if (!favorites.length) {
    return <div className="favorites empty">No favorites yet.</div>;
  }
  return (
    <section className="favorites">
      <h2>Your Favorites</h2>
      <div className="grid">
        {favorites.map(m => (
          <MovieCard
            key={m.imdbID}
            movie={m}
            onToggleFav={onToggleFav}
            isFav={true}
            onShowDetails={onShowDetails}
          />
        ))}
      </div>
    </section>
  );
}
