import { createContext, useContext } from 'react';

const NotificationContext = createContext();

export const useNotificationMessage = () => {
  const messageAndDispatch = useContext(NotificationContext);
  return messageAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const messageAndDispatch = useContext(NotificationContext);
  return messageAndDispatch[1];
};

export default NotificationContext;
