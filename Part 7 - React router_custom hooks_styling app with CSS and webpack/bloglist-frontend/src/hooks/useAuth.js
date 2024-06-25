import { useNavigate } from 'react-router-dom'
import { useNotificationDispatch } from '../providers/NotificationContext'
import { useUserDispatch } from '../providers/UserContext'
import blogService from '../services/blogs'
import loginService from '../services/login'

const storedUserKey = 'storedUser'

const useAuth = () => {
  const navigate = useNavigate()
  const userDispatch = useUserDispatch()
  const notifDispatch = useNotificationDispatch()

  const login = async (loginDetails) => {
    try {
      const user = await loginService.login(loginDetails)
      window.localStorage.setItem(storedUserKey, JSON.stringify(user))
      blogService.setToken(user.token)
      userDispatch({ type: 'LOGIN', payload: user })
      navigate('/app')
    } catch (error) {
      notifDispatch({ type: 'ERROR', payload: 'Wrong username or password' })
    }
  }

  const logout = () => {
    window.localStorage.removeItem(storedUserKey)
    userDispatch({ type: 'LOGOUT' })
    navigate('/')
  }

  return {
    login,
    logout,
  }
}

export default useAuth
