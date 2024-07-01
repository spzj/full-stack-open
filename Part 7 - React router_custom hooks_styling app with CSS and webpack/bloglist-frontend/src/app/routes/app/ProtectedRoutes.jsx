import { Navigate, Outlet } from 'react-router-dom'
import { useUserValue } from '@/providers/UserContext'
import { paths } from '@/app/routes'

const ProtectedRoutes = () => {
  const user = useUserValue()
  return user ? <Outlet /> : <Navigate to={paths.login} />
}

export default ProtectedRoutes
