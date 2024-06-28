import PropTypes from 'prop-types'
import styles from './Button.module.css'

const Button = ({ text, icon: IconComponent, className, ...rest }) => {
  return (
    <button className={`${styles.button} ${className}`} {...rest}>
      <div className={styles.content}>
        {IconComponent && <IconComponent className={styles.icon} />}
        <span className={styles.text}>{text}</span>
      </div>
    </button>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
  className: PropTypes.string,
}

export default Button
