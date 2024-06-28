import { NavLink, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import styles from './NavItem.module.css'

const NavItem = ({ icon: IconComponent, text, className, ...rest }) => {
  const location = useLocation()
  const isPageAtCurrentLink = location.pathname === rest.to
  return (
    <NavLink
      className={`${styles.navLink} ${isPageAtCurrentLink ? styles.current : ''} ${className}`}
      {...rest}
    >
      <IconComponent className={styles.icon} />
      <span className={styles.text}>{text}</span>
    </NavLink>
  )
}

NavItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
}

export default NavItem
