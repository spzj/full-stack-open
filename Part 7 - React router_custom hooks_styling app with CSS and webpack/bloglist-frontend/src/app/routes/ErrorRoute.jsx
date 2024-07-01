import { useNavigate, useRouteError } from 'react-router-dom'
import HomeIcon from '@/assets/home.svg?react'
import Button from '@/components/button'
import { paths } from '@/app/routes'
import styles from './ErrorRoute.module.css'

const ErrorRoute = () => {
  const error = useRouteError()
  console.log(error)
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
        onClick={() => navigate(paths.login)}
      />
    </div>
  )
}

export default ErrorRoute
