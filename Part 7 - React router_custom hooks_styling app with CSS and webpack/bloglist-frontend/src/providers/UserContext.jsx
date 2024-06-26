import { createContext, useContext, useReducer } from 'react'
import PropTypes from 'prop-types'
import blogService from '@/services/blogs'

const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

const UserContext = createContext()

export const useUserValue = () => {
  const userAndDispatch = useContext(UserContext)
  return userAndDispatch[0]
}

export const useUserDispatch = () => {
  const userAndDispatch = useContext(UserContext)
  return userAndDispatch[1]
}

const getUser = () => {
  const storedUser = window.localStorage.getItem('storedUser')
  if (!storedUser) {
    return null
  }
  const parsedUser = JSON.parse(storedUser)
  blogService.setToken(parsedUser.token)
  return parsedUser
}

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, getUser())

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  )
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default UserContext
