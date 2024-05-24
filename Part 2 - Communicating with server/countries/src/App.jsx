import { useEffect, useState } from "react";
import axios from "axios";

import Countries from "./components/Countries";
import CountryDetails from "./components/CountryDetails";
import Filter from "./components/Filter";

const apiUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState(countries);

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        setCountries(response.data);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleFilterChange = (event) => {
    const newFilter = event.target.value;
    setFilter(newFilter); // allow text input to be stored in the state

    const filteredCountries =
      newFilter == ""
        ? []
        : countries.filter((c) =>
            c.name.common.toLowerCase().includes(newFilter.toLowerCase())
          );

    setFilteredCountries(filteredCountries);
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Countries countries={filteredCountries} />
      <CountryDetails
        country={filteredCountries.length === 1 ? filteredCountries[0] : null}
      />
    </div>
  );
};

export default App;
