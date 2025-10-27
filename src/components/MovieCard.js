import React from 'react';

export default function MovieCard({ movie, onToggleFav, isFav, onShowDetails }) {
  // movie: { Title, Year, Poster, Genre, imdbID }
  return (
    <div className="movie-card">
      <div className="poster-wrap" onClick={() => onShowDetails(movie.imdbID)}>
        <img
          src={movie.Poster === 'N/A' ? '/no-poster.png' : movie.Poster}
          alt={`${movie.Title} poster`}
        />
      </div>
      <div className="movie-info">
        <h3>{movie.Title}</h3>
        <p className="meta">{movie.Year} • {movie.Genre || 'N/A'}</p>
        <div className="card-actions">
          <button onClick={() => onToggleFav(movie)}>
            {isFav ? 'Remove Favorite' : 'Add Favorite'}
          </button>
          <button className="details" onClick={() => onShowDetails(movie.imdbID)}>Details</button>
        </div>
      </div>
    </div>
  );
}
