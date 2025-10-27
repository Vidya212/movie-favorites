import React from 'react';

export default function MovieModal({ movie, onClose }) {
  if (!movie) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose}>×</button>
        <div className="modal-body">
          <img src={movie.Poster === 'N/A' ? '/no-poster.png' : movie.Poster} alt="" />
          <div>
            <h2>{movie.Title} ({movie.Year})</h2>
            <p><strong>Genre:</strong> {movie.Genre}</p>
            <p><strong>Plot:</strong> {movie.Plot}</p>
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Actors:</strong> {movie.Actors}</p>
            <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
