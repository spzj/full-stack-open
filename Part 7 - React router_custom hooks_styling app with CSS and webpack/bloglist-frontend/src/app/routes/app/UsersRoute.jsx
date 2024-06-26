import { useQuery } from '@tanstack/react-query'
import userService from '@/services/users'

const UsersRoute = () => {
  const usersResult = useQuery({
    queryKey: ['users'],
    queryFn: () => userService.getAll(),
    refetchOnWindowFocus: false,
  })

  if (usersResult.isLoading) {
    return <div>Loading...</div>
  }

  const users = usersResult.data
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <p>{user.name}</p>
          <p>{user.username}</p>
          <p>{user.blogs.length}</p>
        </div>
      ))}
    </div>
  )
}

export default UsersRoute
