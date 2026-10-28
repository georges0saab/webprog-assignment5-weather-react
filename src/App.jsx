import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import WeatherCard from './components/WeatherCard';
import { loadWeather, getErrorMessage } from './api/weather';

export default function App() {
  const [city, setCity] = useState('');
  const [attempt, setAttempt] = useState(0); // goes up on every search and Retry, so the effect runs again even for the same city
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'ready' | 'error'
  const [weather, setWeather] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!city) {
      return; // nothing searched yet
    }

    async function load() {
      try {
        const data = await loadWeather(city);
        setWeather(data);
        setStatus('ready');
      } catch (error) {
        setErrorMessage(getErrorMessage(error));
        setStatus('error');
      }
    }

    load();
  }, [city, attempt]);

  function handleSearch(newCity) {
    setStatus('loading');
    setCity(newCity);
    setAttempt((a) => a + 1);
  }

  function handleRetry() {
    setStatus('loading');
    setAttempt((a) => a + 1);
  }

  return (
    <>
      <header>
        <h1>Weather Dashboard</h1>
      </header>

      <main>
        <SearchBar onSearch={handleSearch} disabled={status === 'loading'} />

        {status === 'idle' && <p className="status">Search for a city</p>}
        {status === 'loading' && <LoadingSpinner message={`Loading ${city}…`} />}
        {status === 'error' && <ErrorMessage message={errorMessage} onRetry={handleRetry} />}
        {status === 'ready' && <WeatherCard data={weather} />}
      </main>
    </>
  );
}