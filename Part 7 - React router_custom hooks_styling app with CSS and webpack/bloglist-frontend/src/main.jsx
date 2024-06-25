import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppProvider } from './providers/AppProvider'
import LoginRoute from './app/routes/LoginRoute'
import ProtectedRoutes from './app/routes/ProtectedRoutes'
import App from './app/App'

const router = createBrowserRouter([
  {
    element: <AppProvider />,
    children: [
      {
        path: '/',
        element: <LoginRoute />,
      },
      {
        path: '/app',
        element: <ProtectedRoutes />,
        children: [{ path: '', element: <App /> }],
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
