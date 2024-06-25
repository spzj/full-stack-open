import { Outlet } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { NotificationContextProvider } from './NotificationContext'
import { UserContextProvider } from './UserContext'

const queryClient = new QueryClient()

export const AppProvider = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <NotificationContextProvider>
          <Outlet />
        </NotificationContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  )
}
