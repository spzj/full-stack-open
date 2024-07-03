import { useNavigate } from 'react-router-dom'
import { useNotificationDispatch } from '@/providers/NotificationContext'
import { useUserDispatch } from '@/providers/UserContext'
import blogService from '@/features/blogs/api/blogs'
import authService from '@/features/auth/api/auth'
import { paths } from '@/app/routes'

const storedUserKey = 'storedUser'

const useAuth = () => {
  const navigate = useNavigate()
  const userDispatch = useUserDispatch()
  const notifDispatch = useNotificationDispatch()

  const login = async (loginDetails) => {
    try {
      const user = await authService.login(loginDetails)
      window.localStorage.setItem(storedUserKey, JSON.stringify(user))
      blogService.setToken(user.token)
      userDispatch({ type: 'LOGIN', payload: user })
      navigate(paths.app)
    } catch (error) {
      notifDispatch({ type: 'ERROR', payload: 'Wrong username or password' })
    }
  }

  const logout = () => {
    window.localStorage.removeItem(storedUserKey)
    userDispatch({ type: 'LOGOUT' })
    navigate(paths.login)
  }

  const register = async (registerDetails) => {
    try {
      await authService.register(registerDetails)
      notifDispatch({ type: 'CREATE', payload: 'new account' })
      navigate(paths.login)
    } catch (error) {
      notifDispatch({ type: 'ERROR', payload: error.response.data.error })
    }
  }

  return {
    login,
    logout,
    register,
  }
}

export default useAuth
