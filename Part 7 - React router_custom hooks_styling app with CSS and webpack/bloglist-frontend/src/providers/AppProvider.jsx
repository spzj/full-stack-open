import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PropTypes from 'prop-types'

import { NotificationContextProvider } from './NotificationContext'
import { UserContextProvider } from './UserContext'

const queryClient = new QueryClient()

export const AppProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <NotificationContextProvider>{children}</NotificationContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  )
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
