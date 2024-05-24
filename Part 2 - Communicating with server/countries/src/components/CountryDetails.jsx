const CountryDetails = ({ country, weather }) => {
  if (!country || !weather) return null;

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img
        src={country.flags.png}
        alt={country.name.common}
        width="150px"
        height="auto"
      />
      <h3>Weather in {country.capital[0]}</h3>
      <p>temperature: {weather.main.temp} Celsius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />
      <p>wind: {weather.wind.speed} m/s</p>
    </div>
  );
};

export default CountryDetails;
