import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import userKeys from '@/features/users/api/userKeys'
import userService from '@/features/users/api/users'
import Blog from '@/features/blogs/components/Blog'
import Header from '@/components/Header'

const UserRoute = () => {
  const { id } = useParams()
  const userResult = useQuery({
    queryKey: userKeys.user(id),
    queryFn: () => userService.get(id),
    refetchOnWindowFocus: false,
    retry: false,
  })

  if (userResult.isLoading) {
    return <div>Loading...</div>
  }

  if (userResult.isError || !userResult.data) {
    return <div>User does not exist</div>
  }

  const user = userResult.data
  const blogs = user.blogs
    .map((b) => ({
      ...b,
      user: { name: user.name, username: user.username, id: user.id },
    }))
    .sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <Header>
        <h2>{user.name}</h2>
      </Header>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default UserRoute
