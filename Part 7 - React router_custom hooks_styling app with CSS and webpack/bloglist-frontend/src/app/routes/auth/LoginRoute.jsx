import { Navigate } from 'react-router-dom'
import { useUserValue } from '@/providers/UserContext'
import LoginForm from '@/components/LoginForm'
import Notification from '@/components/Notification'
import styles from '@/styles/app.module.css'

const LoginRoute = () => {
  const user = useUserValue()

  if (user) {
    return <Navigate to="/app" replace />
  }

  return (
    <div className={styles.loginContainer}>
      <LoginForm />
      <Notification />
    </div>
  )
}

export default LoginRoute
