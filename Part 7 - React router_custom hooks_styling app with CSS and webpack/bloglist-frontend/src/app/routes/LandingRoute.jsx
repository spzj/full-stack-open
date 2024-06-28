import { useNavigate } from 'react-router-dom'
import Logo from '@/assets/logo.svg?react'
import GithubIcon from '@/assets/github.svg?react'
import HomeIcon from '@/assets/home.svg?react'
import Button from '@/components/Button'
import styles from './LandingRoute.module.css'

const LandingRoute = () => {
  const navigate = useNavigate()
  return (
    <div className={styles.container}>
      <Logo className={styles.logo} />
      <h1>Bloglist</h1>
      <p>An application to share blogs</p>
      <div className={styles.buttons}>
        <Button
          text="Get Started"
          icon={HomeIcon}
          type="button"
          onClick={() => navigate('/auth/login')}
        />
        <Button
          text="Github Repo"
          icon={GithubIcon}
          type="button"
          onClick={() =>
            window.open(
              'https://github.com/spzj/full-stack-open/tree/main/Part%207%20-%20React%20router_custom%20hooks_styling%20app%20with%20CSS%20and%20webpack/bloglist-frontend',
              '_blank'
            )
          }
        />
      </div>
    </div>
  )
}

export default LandingRoute
