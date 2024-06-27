import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import Blog from '@/features/blogs/components/Blog'
import CreateBlogForm from '@/features/blogs/components/CreateBlogForm'
import Modal from '@/components/Modal'
import Notification from '@/components/Notification'
import Button from '@/components/ui/Button'
import blogService from '@/services/blogs'
import styles from './BlogsRoute.module.css'

const BlogsRoute = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const blogsResult = useQuery({
    queryKey: ['blogs'],
    queryFn: () => blogService.getAll(),
    refetchOnWindowFocus: false,
  })

  if (blogsResult.isLoading) {
    return <div>Loading...</div>
  }

  const blogs = blogsResult.data.sort((a, b) => b.likes - a.likes)
  return (
    <div>
      <div className={styles.headerContainer}>
        <h2>Blogs</h2>
        <Button
          className={styles.createButton}
          text="Create"
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
      <Modal isModalOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
        <CreateBlogForm />
        <Notification />
      </Modal>
    </div>
  )
}

export default BlogsRoute
