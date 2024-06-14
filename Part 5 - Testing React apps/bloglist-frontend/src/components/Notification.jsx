import NotificationType from "../constants";
import styles from "../styles/notification.module.css";

const Notification = ({ type, message }) => {
  if (!message) return null;
  return (
    <div className={styles.container}>
      <span
        className={`${type === NotificationType.SUCCESS ? styles.success : styles.error}`}
      >
        {message}
      </span>
    </div>
  );
};

export default Notification;
