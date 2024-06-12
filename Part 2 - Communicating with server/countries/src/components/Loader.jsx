import styles from "../styles/loader.module.css";

const Loader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.ldsRoller}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={styles.text}>Connecting to server</div>
    </div>
  );
};

export default Loader;
