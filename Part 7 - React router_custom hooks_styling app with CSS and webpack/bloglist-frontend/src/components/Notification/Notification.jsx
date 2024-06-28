import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  useNotificationMessage,
  useNotificationDispatch,
} from '@/providers/NotificationContext'
import styles from './Notification.module.css'

const Notification = () => {
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
    <div className={styles.container} role="alert">
      <span
        className={`${message.startsWith('Error:') ? styles.error : styles.success}`}
      >
        {message}
      </span>
    </div>
  )
}

export default Notification
