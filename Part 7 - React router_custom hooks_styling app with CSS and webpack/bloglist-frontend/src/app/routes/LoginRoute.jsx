import LoginForm from '../../components/LoginForm'
import Notification from '../../components/Notification'
import styles from '../../styles/app.module.css'

const LoginRoute = () => {
  return (
    <div className={styles.loginContainer}>
      <LoginForm />
      <Notification />
    </div>
  )
}

export default LoginRoute
