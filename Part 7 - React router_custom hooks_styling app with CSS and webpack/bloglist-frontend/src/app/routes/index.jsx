import { createBrowserRouter } from 'react-router-dom'
import ErrorRoute from './ErrorRoute'
import LandingRoute from './LandingRoute'
import AppRoute from './app/AppRoute'
import BlogRoute from './app/BlogRoute'
import BlogsRoute from './app/BlogsRoute'
import LoginRoute from './auth/LoginRoute'
import ProtectedRoutes from './app/ProtectedRoutes'
import RegisterRoute from './auth/RegisterRoute'
import UserRoute from './app/UserRoute'
import UsersRoute from './app/UsersRoute'

export const paths = {
  app: '/app',
  blogs: '/app/blogs',
  blog: '/app/blogs/:id',
  github:
    'https://github.com/spzj/full-stack-open/tree/main/Part%207%20-%20React%20router_custom%20hooks_styling%20app%20with%20CSS%20and%20webpack/bloglist-frontend',
  landing: '/',
  login: '/auth/login',
  register: '/auth/register',
  users: '/app/users',
  user: '/app/users/:id',
}

export const createRouter = () =>
  createBrowserRouter([
    {
      path: paths.landing,
      element: <LandingRoute />,
      errorElement: <ErrorRoute />,
    },
    {
      path: paths.login,
      element: <LoginRoute />,
    },
    {
      path: paths.register,
      element: <RegisterRoute />,
    },
    {
      path: paths.app,
      element: <ProtectedRoutes />,
      children: [
        {
          path: '',
          element: <AppRoute />,
          children: [
            { path: paths.blogs, element: <BlogsRoute /> },
            { path: paths.blog, element: <BlogRoute /> },
            {
              path: paths.users,
              element: <UsersRoute />,
            },
            { path: paths.user, element: <UserRoute /> },
          ],
        },
      ],
    },
  ])
