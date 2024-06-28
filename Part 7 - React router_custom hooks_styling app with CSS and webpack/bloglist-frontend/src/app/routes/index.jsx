import { createBrowserRouter } from 'react-router-dom'
import ErrorRoute from './ErrorRoute'
import LandingRoute from './LandingRoute'
import AppRoute from './app/AppRoute'
import BlogsRoute from './app/BlogsRoute'
import LoginRoute from './auth/LoginRoute'
import ProtectedRoutes from './app/ProtectedRoutes'
import UserRoute from './app/UserRoute'
import UsersRoute from './app/UsersRoute'

export const createRouter = () =>
  createBrowserRouter([
    {
      path: '/',
      element: <LandingRoute />,
      errorElement: <ErrorRoute />,
    },
    {
      path: '/auth/login',
      element: <LoginRoute />,
    },
    {
      path: '/app',
      element: <ProtectedRoutes />,
      children: [
        {
          path: '',
          element: <AppRoute />,
          children: [
            { path: 'blogs', element: <BlogsRoute /> },
            {
              path: 'users',
              element: <UsersRoute />,
            },
            { path: 'users/:id', element: <UserRoute /> },
          ],
        },
      ],
    },
  ])
