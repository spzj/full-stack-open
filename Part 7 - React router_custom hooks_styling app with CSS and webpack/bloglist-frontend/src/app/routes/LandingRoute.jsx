import { useNavigate } from 'react-router-dom'
import Logo from '@/assets/logo.svg?react'
import GithubIcon from '@/assets/github.svg?react'
import HomeIcon from '@/assets/home.svg?react'
import Button from '@/components/Button'
import { paths } from '@/app/routes'
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
          onClick={() => navigate(paths.login)}
        />
        <Button
          text="Github Repo"
          icon={GithubIcon}
          type="button"
          onClick={() => window.open(`${paths.github}`, '_blank')}
        />
      </div>
    </div>
  )
}

export default LandingRoute
