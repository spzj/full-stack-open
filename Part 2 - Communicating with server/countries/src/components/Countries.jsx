const Countries = ({ countries, handleShowClick }) => {
  if (countries.length === 1) {
    return null;
  } else if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else {
    return (
      <ul className="countryList">
        {countries.map((country) => (
          <span
            key={country.name.common}
            style={{ display: "flex", alignItems: "center", margin: "5px auto"}}
          >
            <li>{country.name.common}</li>
            <button
              onClick={() => handleShowClick(country)}
              style={{ marginLeft: "10px" }}
            >
              show
            </button>
          </span>
        ))}
      </ul>
    );
  }
};

export default Countries;
