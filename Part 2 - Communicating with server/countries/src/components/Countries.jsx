const Countries = ({ countries }) => {
  if (countries.length === 1) {
    return null;
  } else if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else {
    return (
      <ul className="countryList">
        {countries.map((country) => (
          <li key={country.name.common}>{country.name.common}</li>
        ))}
      </ul>
    );
  }
};

export default Countries;
