import styles from "../styles/countryDetails.module.css";

const CountryDetails = ({ country, weather }) => {
  if (!country || !weather) return null;
  const imgSrc = country.flags.png ? country.flags.png : country.flags.svg;
  const daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div>
      <div className={styles.countryHeader}>
        <h2 className={styles.countryName}>{country.name.common}</h2>
        <div>
          Country in{" "}
          {country.subregion ? "the " + country.subregion : country.region}
        </div>
      </div>

      <div className={styles.countryBody}>
        <div className={styles.aboutBox}>
          <h3 className={styles.aboutHeader}>About</h3>
          <div className={styles.aboutItem}>
            <b className={styles.bold}>Capital: </b>
            {country.capital[0]}
          </div>

          <div className={styles.aboutItem}>
            <b className={styles.bold}>Continent: </b> {country.continents[0]}
          </div>

          <div className={styles.aboutItem}>
            <b className={styles.bold}>
              Currenc
              {Object.values(country.currencies).length === 1
                ? "y"
                : "ies"}:{" "}
            </b>
            {Object.values(country.currencies).map((cur, index, array) => (
              <span key={cur}>
                {cur.name}
                {index !== array.length - 1 && ", "}
              </span>
            ))}
          </div>

          <div className={styles.aboutItem}>
            <b className={styles.bold}>
              Language{Object.values(country.languages).length === 1 ? "" : "s"}
              :{" "}
            </b>
            {Object.values(country.languages).map((language, index, array) => (
              <span key={language}>
                {language}
                {index !== array.length - 1 && ", "}
              </span>
            ))}
          </div>

          <div className={styles.aboutItem}>
            <b className={styles.bold}>Population: </b>{" "}
            {country.population > 1000000
              ? (country.population / 1000000)
                  .toFixed(2)
                  .replace(/[.,]00$/, "")
                  .toLocaleString() + " million"
              : country.population}
          </div>

          <div className={styles.aboutItem}>
            <b className={styles.bold}>Area: </b>
            {country.area} km<sup>2</sup>
          </div>
          <div className={styles.aboutItem}>
            <b className={styles.bold}>Dialing code: </b>
            {Object.values(country.idd.suffixes).map((suffix, index) => (
              <span key={suffix}>
                {country.idd.root}
                {suffix.length > 2 ? "-" : ""}
                {suffix}
                {index !== country.idd.suffixes.length - 1 ? ", " : ""}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.visuals}>
          <div className={styles.visualContainer}>
            <h3 className={styles.flagHeader}>Flag</h3>
            {imgSrc && (
              <img
                className={styles.flag}
                src={imgSrc}
                alt={country.name.common}
              />
            )}
          </div>
          <div className={styles.visualContainer}>
            <h3 className={styles.weatherHeader}>Weather</h3>
            <div className={styles.weatherForecasts}>
              {weather.map((forecast) => (
                <div key={forecast.dt}>
                  <div className={styles.dayOfWeekText}>
                    {daysOfWeek[new Date(`${forecast.dt_txt}`).getDay()]}
                  </div>
                  <div className={styles.weatherIconTempBox}>
                    <a
                      title={forecast.weather[0].description}
                      className={styles.weatherIcon}
                    >
                      <img
                        className={styles.weatherIcon}
                        src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                        alt={forecast.weather[0].description}
                      />
                    </a>
                    <div className={styles.weatherTempText}>
                      {forecast.main.temp.toFixed(0)}&deg;C
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <a
              href="https://openweather.co.uk/"
              className={styles.weatherSourceText}
            >
              openweather.co.uk
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
