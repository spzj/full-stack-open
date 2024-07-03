import { Link } from 'react-router-dom'
import Logo from '@/assets/logo.svg?react'
import RegisterForm from '@/features/auth/components/RegisterForm'
import { paths } from '@/app/routes'
import styles from './RegisterRoute.module.css'

const RegisterRoute = () => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <Logo className={styles.logo} />
        <h2>Register for Bloglist</h2>
        <RegisterForm />
        <Link className={styles.link} to={paths.login}>
          Back to login
        </Link>
      </div>
    </div>
  )
}

export default RegisterRoute
