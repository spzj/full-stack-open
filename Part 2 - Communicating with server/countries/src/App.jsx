import { useEffect, useState } from "react";
import axios from "axios";

import Countries from "./components/Countries";
import CountryDetails from "./components/CountryDetails";
import Filter from "./components/Filter";

const COUNTRY_API_URL = "https://studies.cs.helsinki.fi/restcountries/api/all";
const SERVER_URL = "/api/proxy"; // http://localhost:3001/api/proxy when run locally

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState(countries);
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

  useEffect(() => {
    if (filteredCountries.length === 1) {
      const [lat, lon] = filteredCountries[0].latlng;

      axios
        .get(`${SERVER_URL}?lat=${lat}&lon=${lon}`)
        .then((response) => {
          setWeather(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [filteredCountries]);

  const handleFilterChange = (event) => {
    const newFilter = event.target.value;
    setFilter(newFilter); // allow text input to be stored in the state

    const newFilteredCountries =
      newFilter == ""
        ? []
        : countries.filter((c) =>
            c.name.common.toLowerCase().includes(newFilter.toLowerCase())
          );

    setFilteredCountries(newFilteredCountries);
  };

  const handleShowClick = (country) => {
    setFilteredCountries(
      filteredCountries.filter((c) => c.name.common === country.name.common)
    );
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Countries
        countries={filteredCountries}
        handleShowClick={handleShowClick}
      />
      <CountryDetails
        country={filteredCountries.length === 1 ? filteredCountries[0] : null}
        weather={weather}
      />
    </div>
  );
};

export default App;
