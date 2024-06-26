import { useNavigate, useRouteError } from 'react-router-dom'
import HomeIcon from '@/assets/home.svg?react'
import Button from '@/components/ui/button'
import styles from './ErrorRoute.module.css'

const ErrorRoute = () => {
  const error = useRouteError()
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <h2>
        {error.status} {error.statusText}
      </h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Button
        text="Go to Home"
        icon={HomeIcon}
        type="button"
        onClick={() => navigate('/auth/login')}
      />
    </div>
  )
}

export default ErrorRoute
