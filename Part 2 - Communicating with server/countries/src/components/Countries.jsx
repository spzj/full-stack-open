import styles from "../styles/countries.module.css";

const Countries = ({ countries, handleShowClick, activeIndex }) => {
  if (countries.length <= 1) {
    return null;
  }

  return (
    <div className={styles.countries}>
      {countries.map((country, index) => (
        <div
          key={country.name.common}
          onClick={() => handleShowClick(country)}
          className={`${styles.country} ${index == activeIndex ? styles.selectedByKey : ''}`}
        >
          <img
            className={styles.icon}
            src={country.flags.svg}
            alt={country.name.common}
          />
          <span className={styles.name}>{country.name.common}</span>
        </div>
      ))}
    </div>
  );
};

export default Countries;
