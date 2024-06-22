import { useState, useEffect } from 'react';
import axios from 'axios';

const COUNTRY_API_URL =
  'https://studies.cs.helsinki.fi/restcountries/api/name/';

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (name) {
      axios
        .get(COUNTRY_API_URL + name)
        .then((response) => setCountry({ found: true, data: {...response.data} }))
        .catch((error) => {
          console.log(error);
          setCountry({ found: false, data: {} });
        });
    }
  }, [name]);

  return country;
};

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};
