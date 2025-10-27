import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState('');

  function submit(e) {
    e.preventDefault();
    if (!q.trim()) return;
    onSearch(q.trim());
  }

  return (
    <form className="searchbar" onSubmit={submit}>
      <input
        type="text"
        placeholder="Search movies (e.g. Inception)"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Search movies"
      />
      <button type="submit">Search</button>
    </form>
  );
}
