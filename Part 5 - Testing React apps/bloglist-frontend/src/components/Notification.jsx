import PropTypes from 'prop-types'
import NotificationType from '../constants'
import styles from '../styles/notification.module.css'

const Notification = ({ type, message }) => {
  if (!message) return null
  return (
    <div className={styles.container}>
      <span
        className={`${type === NotificationType.SUCCESS ? styles.success : styles.error}`}
      >
        {message}
      </span>
    </div>
  )
}

Notification.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
}

export default Notification
