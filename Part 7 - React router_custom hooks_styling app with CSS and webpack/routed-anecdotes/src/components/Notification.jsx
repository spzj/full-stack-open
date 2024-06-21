import { useEffect } from 'react';
import PropTypes from 'prop-types';

const Notification = ({ notification, setNotification }) => {
  useEffect(() => {
    if (notification) {
      const timeout = setTimeout(() => setNotification(''), 5000);
      return () => clearTimeout(timeout);
    }
  }, [notification, setNotification]);

  return <div>{notification}</div>;
};

Notification.propTypes = {
  notification: PropTypes.string,
  setNotification: PropTypes.func,
};

export default Notification;
