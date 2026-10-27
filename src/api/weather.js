const GEO = 'https://geocoding-api.open-meteo.com/v1/search'; // city name -> latitude and longitude
const WX = 'https://api.open-meteo.com/v1/forecast'; // latitude and longitude -> weather
 
async function getJSON(url) {
  let response;
 
  try {
    response = await fetch(url);
  } catch {
    throw new Error('network'); // fetch only rejects when no response arrived at all (offline, DNS, CORS)
  }
 
  // fetch does not reject on HTTP errors such as 404, so the status is checked here
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
 
  return response.json();
}
 
// Finds the city's coordinates, then fetches its current weather and a 3-day forecast.
export async function loadWeather(city) {
  const q = new URLSearchParams({ name: city, count: 1 });
  const geo = await getJSON(`${GEO}?${q}`);
 
  if (!geo.results?.length) {
    throw new Error('not-found');
  }
 
  const { latitude, longitude, name } = geo.results[0];
 
  const p = new URLSearchParams({
    latitude,
    longitude,
    forecast_days: 3,
    timezone: 'auto',
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m',
    daily: 'temperature_2m_max,temperature_2m_min',
  });
 
  return { name, ...(await getJSON(`${WX}?${p}`)) };
}
 
// Turns an error into a message for the user, in plain words.
export function getErrorMessage(error) {
  const message = error.message;
 
  if (message === 'not-found') {
    return 'City not found. Check the spelling.';
  }
  if (message === 'network') {
    return "Couldn't reach the server. Check your connection.";
  }
  if (message === 'HTTP 429') {
    return 'Too many requests. Wait a moment and try again.';
  }
  if (message.startsWith('HTTP 5')) {
    return 'The weather service is having problems. Try again later.';
  }
  return 'Something went wrong. Try again.';
}