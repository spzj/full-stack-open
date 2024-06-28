import PropTypes from 'prop-types'
import styles from './Input.module.css'

const Input = ({ label, className, ...rest }) => {
  /* " Hello World " becomes "hello-world" */
  const id = label.toLowerCase().trim().replace(/\s+/g, '-')
  return (
    <div className={`${styles.inputField} ${className}`}>
      <input id={id} {...rest} />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
}

export default Input
