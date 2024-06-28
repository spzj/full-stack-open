import PropTypes from 'prop-types'
import styles from './Header.module.css'

const Header = ({ children, className, ...rest }) => {
  return (
    <div className={`${styles.headerContainer} ${className}`} {...rest}>
      {children}
    </div>
  )
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

export default Header
