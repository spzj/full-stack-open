import { useNotificationDispatch } from '../providers/NotificationContext'
import { useUserDispatch } from '../providers/UserContext'
import blogService from '../services/blogs'
import loginService from '../services/login'

const storedUserKey = 'storedUser'

const useAuth = () => {
  const userDispatch = useUserDispatch()
  const notifDispatch = useNotificationDispatch()

  const login = async (loginDetails) => {
    try {
      const user = await loginService.login(loginDetails)
      window.localStorage.setItem(storedUserKey, JSON.stringify(user))
      blogService.setToken(user.token)
      userDispatch({ type: 'LOGIN', payload: user })
    } catch (error) {
      notifDispatch({ type: 'ERROR', payload: 'Wrong username or password' })
    }
  }

  const logout = () => {
    window.localStorage.removeItem(storedUserKey)
    userDispatch({ type: 'LOGOUT' })
  }

  const getUserFromLocalStorage = () => {
    const storedUser = window.localStorage.getItem(storedUserKey)
    if (storedUser) {
      const user = JSON.parse(storedUser)
      userDispatch({ type: 'LOGIN', payload: user })
      blogService.setToken(user.token)
    }
  }

  return {
    login,
    logout,
    getUserFromLocalStorage,
  }
}

export default useAuth
