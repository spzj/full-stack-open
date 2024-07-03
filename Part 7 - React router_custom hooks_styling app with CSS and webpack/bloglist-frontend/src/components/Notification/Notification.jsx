import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  useNotificationMessage,
  useNotificationDispatch,
} from '@/providers/NotificationContext'
import styles from './Notification.module.css'

const Notification = ({ className, ...rest }) => {
  const location = useLocation()
  const message = useNotificationMessage()
  const dispatch = useNotificationDispatch()

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => dispatch({ type: 'CLEAR' }), 1500)
      return () => clearTimeout(timeout)
    }
  }, [message, dispatch])

  useEffect(() => {
    return () => {
      if (message) {
        dispatch({ type: 'CLEAR' })
      }
    }
  }, [location.pathname, message, dispatch])

  //   if (!message) return null

  return (
    <div className={`${styles.container} ${className}`} role="alert" {...rest}>
      <span
        className={`${message.startsWith('Error:') ? styles.error : styles.success}`}
      >
        {message}
      </span>
    </div>
  )
}

Notification.propTypes = {
  className: PropTypes.string,
}

export default Notification
