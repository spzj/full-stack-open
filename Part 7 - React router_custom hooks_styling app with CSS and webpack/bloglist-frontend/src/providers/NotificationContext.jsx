import { createContext, useContext, useReducer } from 'react'
import PropTypes from 'prop-types'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'CLEAR':
      return ''
    case 'CREATE':
      return `Created: ${action.payload}`
    case 'ERROR':
      return `Error: ${action.payload}`
    default:
      return state
  }
}

const NotificationContext = createContext()

export const useNotificationMessage = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ''
  )

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

NotificationContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default NotificationContext
