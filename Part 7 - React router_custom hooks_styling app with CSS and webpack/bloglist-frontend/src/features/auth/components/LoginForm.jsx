import { useField } from '@/hooks/useField'
import useAuth from '@/hooks/useAuth'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Notification from '@/components/Notification'
import styles from './Form.module.css'

const LoginForm = () => {
  const password = useField('password')
  const username = useField('text')
  const auth = useAuth()

  const attemptLogin = async (event) => {
    event.preventDefault()
    await auth.login({ username: username.value, password: password.value })
    username.reset()
    password.reset()
  }

  return (
    <form className={styles.form} onSubmit={attemptLogin}>
      <Input
        label="Username"
        type={username.type}
        value={username.value}
        onChange={username.onChange}
        autoComplete="username"
        required
      />
      <Input
        label="Password"
        type={password.type}
        value={password.value}
        onChange={password.onChange}
        autoComplete="current-password"
        required
      />
      <Button className={styles.button} text="Log in" type="submit" />
      <Notification className={styles.notification} />
    </form>
  )
}

export default LoginForm
