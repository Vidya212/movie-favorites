const API_KEY = process.env.REACT_APP_OMDB_KEY;
const BASE = 'https://www.omdbapi.com/';

export async function searchMovies(query, page = 1) {
  const res = await fetch(`${BASE}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}`);
  const data = await res.json();
  return data; // { Search: [...], totalResults, Response: "True"/"False", Error: "..."}
}

export async function getMovieById(imdbID) {
  const res = await fetch(`${BASE}?apikey=${API_KEY}&i=${imdbID}&plot=short`);
  return res.json(); // full movie detail including Genre
}
