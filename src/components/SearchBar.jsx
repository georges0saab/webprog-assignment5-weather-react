import { useState } from 'react';

// A controlled form: the input shows what is in state, and the form checks it before searching.
export default function SearchBar({ onSearch, disabled }) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (!text.trim()) {
      setError('Please enter a city name.');
      return;
    }

    setError('');
    onSearch(text.trim());
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-row">
        <label htmlFor="city-input">City</label>
        <input
          id="city-input"
          placeholder="Enter city name"
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-invalid={!!error}
        />
        <button type="submit" className="search-btn" disabled={disabled}>
          Search
        </button>
      </div>

      {error && <p className="field-error">{error}</p>}
    </form>
  );
}