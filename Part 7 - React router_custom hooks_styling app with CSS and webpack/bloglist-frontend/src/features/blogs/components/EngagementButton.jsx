import PropTypes from 'prop-types'
import styles from './EngagementButton.module.css'

const EngagementButton = ({
  icon: IconComponent,
  count,
  className,
  ...rest
}) => {
  const adjustedCount =
    count === undefined
      ? null
      : count < 1000
        ? count
        : count < 1000000
          ? (count / 1000).toFixed(0) + 'K'
          : (count / 1000000).toFixed(0) + 'M'
  return (
    <button type="button" className={`${styles.button} ${className}`} {...rest}>
      <IconComponent className={styles.icon} />
      {count !== undefined && <span>{adjustedCount}</span>}
    </button>
  )
}

EngagementButton.propTypes = {
  icon: PropTypes.elementType.isRequired,
  count: PropTypes.number,
  className: PropTypes.string,
}

export default EngagementButton
