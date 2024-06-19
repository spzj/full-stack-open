import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const style = {
    border: 'solid 1px',
    padding: 10,
  };

  useEffect(() => {
    if (notification) {
      const timeout = setTimeout(() => dispatch(setNotification('')), 5000);
      return () => clearTimeout(timeout);
    }
  }, [notification, dispatch]);

  return notification ? <div style={style}>{notification}</div> : null;
};

export default Notification;
