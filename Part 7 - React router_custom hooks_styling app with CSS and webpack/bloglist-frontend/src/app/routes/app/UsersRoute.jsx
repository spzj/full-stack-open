import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Header from '@/components/Header/Header'
import Table from '@/components/Table'
import userKeys from '@/features/users/api/userKeys'
import userService from '@/features/users/api/users'
import { paths } from '@/app/routes'
import styles from './UsersRoute.module.css'

const UsersRoute = () => {
  const usersResult = useQuery({
    queryKey: userKeys.all,
    queryFn: () => userService.getAll(),
    refetchOnWindowFocus: false,
  })
  const navigate = useNavigate()

  if (usersResult.isLoading) {
    return <div>Loading...</div>
  }

  const users = usersResult.data.map(({ blogs, ...d }) => ({
    blogs: blogs.length,
    ...d,
  }))
  const headers = ['name', 'username', 'blogs']
  const rowOnClick = (user) => navigate(`${paths.users}/${user.id}`)

  return (
    <div>
      <Header>
        <h2>Users</h2>
      </Header>
      <Table
        className={styles.table}
        data={users}
        headers={headers}
        rowOnClick={rowOnClick}
      />
    </div>
  )
}

export default UsersRoute
