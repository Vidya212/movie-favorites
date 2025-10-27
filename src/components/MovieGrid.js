import React from 'react';
import MovieCard from './MovieCard';

export default function MovieGrid({ movies, favorites, onToggleFav, onShowDetails }) {
  return (
    <div className="grid">
      {movies.map(m => (
        <MovieCard
          key={m.imdbID}
          movie={m}
          onToggleFav={onToggleFav}
          isFav={favorites.some(f => f.imdbID === m.imdbID)}
          onShowDetails={onShowDetails}
        />
      ))}
    </div>
  );
}
