import { Navigate, Outlet } from 'react-router-dom'
import { useUserValue } from '@/providers/UserContext'

const ProtectedRoutes = () => {
  const user = useUserValue()
  return user ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutes
