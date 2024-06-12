import { useEffect, useState } from "react";
import axios from "axios";

import Countries from "./components/Countries";
import CountryDetails from "./components/CountryDetails";
import Filter from "./components/Filter";
import Loader from "./components/Loader";
import styles from "./styles/app.module.css";

const COUNTRY_API_URL = "https://studies.cs.helsinki.fi/restcountries/api/all";
const SERVER_URL = "/api/proxy"; // http://localhost:3001/api/proxy when run locally

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(COUNTRY_API_URL)
      .then((response) => {
        setCountries(response.data);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // Runs only on first render

  const getThreeDayForecast = (forecastData) => {
    const currentTime = new Date().getTime() / 1000;

    let nearestForecastIndex = 0;
    let nearestForecastTimeDiff = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < forecastData.length; i++) {
      const timeDiff = Math.abs(currentTime - forecastData[i].dt);

      if (timeDiff > nearestForecastTimeDiff) {
        break;
      }
      nearestForecastTimeDiff = timeDiff;
      nearestForecastIndex = i;
    }
    
    // Forecast in 3 hour intervals, hence one day = 24 /3 = 8
    return [
      forecastData[nearestForecastIndex],
      forecastData[nearestForecastIndex + 8],
      forecastData[nearestForecastIndex + 16],
    ];
  };

  useEffect(() => {
    if (filteredCountries.length === 1) {
      const [lat, lon] = filteredCountries[0].latlng;

      axios
        .get(`${SERVER_URL}?lat=${lat}&lon=${lon}`)
        .then((response) => {
          setWeather(getThreeDayForecast(response.data.list));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [filteredCountries]);

  const handleFilterChange = (event) => {
    const newFilter = event.target.value;
    setFilter(newFilter); // allow text input to be stored in the state
    setActiveIndex(-1);

    const newFilteredCountries =
      newFilter == ""
        ? []
        : countries
            .filter((c) =>
              c.name.common.toLowerCase().includes(newFilter.toLowerCase())
            )
            .slice(0, 10);

    setFilteredCountries(newFilteredCountries);
  };

  const handleShowClick = (country) => {
    setFilteredCountries(
      filteredCountries.filter((c) => c.name.common === country.name.common)
    );
  };

  const handleKeyDown = (event) => {
    if (filter) {
      if (event.key == "ArrowDown") {
        event.preventDefault();
        setActiveIndex(Math.min(activeIndex + 1, filteredCountries.length));
      } else if (event.key == "ArrowUp") {
        event.preventDefault();
        setActiveIndex(Math.max(activeIndex - 1, -1));
      } else if (event.key == "Enter" && activeIndex != -1) {
        event.preventDefault();
        setFilteredCountries([filteredCountries[activeIndex]]);
        setActiveIndex(-1);
      } else if (event.key == "Escape") {
        event.preventDefault();
        setActiveIndex(-1);
      }
    }
  };

  if (!isLoaded) {
    return <Loader/>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <span className={styles.letterBlue}>C</span>
        <span className={styles.letterRed}>o</span>
        <span className={styles.letterYellow}>u</span>
        <span className={styles.letterBlue}>n</span>
        <span className={styles.letterRed}>t</span>
        <span className={styles.letterYellow}>r</span>
        <span className={styles.letterBlue}>i</span>
        <span className={styles.letterGreen}>e</span>
        <span className={styles.letterRed}>s</span>
      </div>
      <Filter
        filter={filter}
        filteredCountries={filteredCountries}
        handleFilterChange={handleFilterChange}
        handleKeyDown={handleKeyDown}
      />
      <Countries
        countries={filteredCountries}
        handleShowClick={handleShowClick}
        activeIndex={activeIndex}
      />
      <CountryDetails
        country={filteredCountries.length === 1 ? filteredCountries[0] : null}
        weather={weather}
      />
    </div>
  );
};

export default App;
