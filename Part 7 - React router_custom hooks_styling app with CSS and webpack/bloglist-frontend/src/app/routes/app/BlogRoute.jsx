import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import blogKeys from '@/features/blogs/api/blogKeys'
import blogService from '@/features/blogs/api/blogs'
import Blog from '@/features/blogs/components/Blog'
import Comment from '@/features/blogs/components/Comment'
import CommentForm from '@/features/blogs/components/CommentForm'

const BlogRoute = () => {
  const { id } = useParams()
  const blogResult = useQuery({
    queryKey: blogKeys.blog(id),
    queryFn: () => blogService.get(id),
    refetchOnWindowFocus: false,
    retry: false,
  })

  if (blogResult.isLoading) {
    return <div>Loading...</div>
  }

  if (blogResult.isError || !blogResult.data) {
    return <div>Blog does not exist</div>
  }

  const blog = blogResult.data

  return (
    <div>
      <Blog blog={blog} />
      <CommentForm />
      {blog.comments.map((c) => (
        <Comment key={c.id} comment={c} />
      ))}
    </div>
  )
}

export default BlogRoute
