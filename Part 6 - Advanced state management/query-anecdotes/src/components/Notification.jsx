import { useNotificationMessage } from '../NotificationContext';
import styles from '../styles/notification.module.css';

const Notification = () => {
  const message = useNotificationMessage();
  if (!message) return null;
  return (
    <div className={message.startsWith('error:') ? styles.error : styles.success}>
      {message}
    </div>
  );
};

export default Notification;
