import { RouterProvider } from 'react-router-dom'
import { createRouter } from './routes'
import { AppProvider } from '@/providers/AppProvider'

const router = createRouter()

const App = () => {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  )
}

export default App
