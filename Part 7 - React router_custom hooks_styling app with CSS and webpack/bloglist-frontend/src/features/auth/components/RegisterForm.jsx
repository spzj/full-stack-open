import { useField } from '@/hooks/useField'
import useAuth from '@/hooks/useAuth'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Notification from '@/components/Notification'
import styles from './Form.module.css'

const RegisterForm = () => {
  const name = useField('text')
  const password = useField('password')
  const username = useField('text')
  const auth = useAuth()

  const handleSubmit = async (event) => {
    event.preventDefault()
    await auth.register({
      name: name.value,
      username: username.value,
      password: password.value,
    })
    name.reset()
    password.reset()
    username.reset()
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        label="Name"
        type={name.type}
        value={name.value}
        onChange={name.onChange}
        autoComplete="name"
        required
      />
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
        autoComplete="new-password"
        required
      />
      <Button className={styles.button} text="Create Account" type="submit" />
      <Notification className={styles.notification} />
    </form>
  )
}

export default RegisterForm
