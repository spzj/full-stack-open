import { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import NotificationContext from '../NotificationContext';

const NotificationContextProvider = (props) => {
  const notificationReducer = (state, action) => {
    switch (action.type) {
      case 'CLEAR':
        return '';
      case 'CREATE':
        return `anecdote: '${action.payload}' created`;
      case 'ERROR':
        return `error: ${action.payload}`;
      case 'VOTE':
        return `anecdote: '${action.payload}' voted`;
      default:
        return state;
    }
  };

  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ''
  );

  useEffect(() => {
    if (notification) {
      const timeout = setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' });
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [notification]);

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

NotificationContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NotificationContextProvider;
