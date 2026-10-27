export default function ForecastList({ daily }) {
  return (
    <ul className="forecast">
      {daily.time.map((day, i) => (
        <li key={day}>
          {day}: {Math.round(daily.temperature_2m_max[i])}° / {Math.round(daily.temperature_2m_min[i])}°
        </li>
      ))}
    </ul>
  );
}