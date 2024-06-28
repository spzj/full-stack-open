import { Navigate } from 'react-router-dom'
import { useUserValue } from '@/providers/UserContext'
import Logo from '@/assets/logo.svg?react'
import LoginForm from '@/features/auth/components/LoginForm'
import styles from './LoginRoute.module.css'

const LoginRoute = () => {
  const user = useUserValue()

  if (user) {
    return <Navigate to="/app" replace />
  }

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <Logo className={styles.logo} />
        <h2>Log in to Bloglist</h2>
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginRoute
