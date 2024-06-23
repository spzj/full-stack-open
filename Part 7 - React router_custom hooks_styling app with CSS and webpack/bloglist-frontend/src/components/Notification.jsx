import { useEffect } from 'react'
import {
  useNotificationMessage,
  useNotificationDispatch,
} from '../providers/NotificationContext'
import styles from '../styles/notification.module.css'

const Notification = () => {
  const message = useNotificationMessage()
  const dispatch = useNotificationDispatch()

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => dispatch({ type: 'CLEAR' }), 1500)
      return () => clearTimeout(timeout)
    }
  }, [message, dispatch])

  if (!message) return null

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
