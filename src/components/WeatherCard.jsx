import { describeWeather } from '../utils/weatherCodes';
import ForecastList from './ForecastList';

export default function WeatherCard({ data }) {
  const { name, current, daily } = data;
  const { text, emoji } = describeWeather(current.weather_code);

  return (
    <section className="results">
      <h2 className="city-name">{name}</h2>
      <span className="icon" role="img" aria-label={text}>
        {emoji}
      </span>
      <p className="temp">{Math.round(current.temperature_2m)}°C</p>
      <p className="description">{text}</p>

      <ul className="details">
        <li>Humidity: {current.relative_humidity_2m}%</li>
        <li>Wind: {Math.round(current.wind_speed_10m)} km/h</li>
        <li>Feels like: {Math.round(current.apparent_temperature)}°C</li>
      </ul>

      <h3>3-day forecast</h3>
      <ForecastList daily={daily} />
    </section>
  );
}