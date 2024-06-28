import { Outlet } from 'react-router-dom'
import BlogsIcon from '@/assets/blogs.svg?react'
import Logo from '@/assets/logo.svg?react'
import LogoutIcon from '@/assets/log-out.svg?react'
import UsersIcon from '@/assets/users.svg?react'
import NavItem from '@/components/NavItem'
import useAuth from '@/hooks/useAuth'
import styles from './AppRoute.module.css'

const AppRoute = () => {
  const auth = useAuth()
  const handleLogout = () => auth.logout()

  return (
    <div className={styles.container}>
      <nav className={styles.navBar}>
        <NavItem to="/" icon={Logo} text="Bloglist" />
        <NavItem to="/app/blogs" icon={BlogsIcon} text="Blogs" />
        <NavItem to="/app/users" icon={UsersIcon} text="Users" />
        <NavItem
          to="/auth/login"
          onClick={handleLogout}
          icon={LogoutIcon}
          text="Logout"
        />
      </nav>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  )
}

export default AppRoute
