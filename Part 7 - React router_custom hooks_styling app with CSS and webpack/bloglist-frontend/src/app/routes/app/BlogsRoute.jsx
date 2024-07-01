import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import Blog from '@/features/blogs/components/Blog'
import CreateBlogForm from '@/features/blogs/components/CreateBlogForm'
import Header from '@/components/Header'
import Modal from '@/components/Modal'
import Button from '@/components/Button'
import blogKeys from '@/features/blogs/api/blogKeys'
import blogService from '@/features/blogs/api/blogs'
import styles from './BlogsRoute.module.css'

const BlogsRoute = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const blogsResult = useQuery({
    queryKey: blogKeys.all,
    queryFn: () => blogService.getAll(),
    refetchOnWindowFocus: false,
  })

  if (blogsResult.isLoading) {
    return <div>Loading...</div>
  }

  const blogs = blogsResult.data.sort((a, b) => b.likes - a.likes)
  return (
    <div>
      <Header className={styles.header}>
        <h2>Blogs</h2>
        <Button
          className={styles.createButton}
          text="Create"
          onClick={() => setIsModalOpen(true)}
        />
      </Header>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
      <Modal isModalOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
        <CreateBlogForm />
      </Modal>
    </div>
  )
}

export default BlogsRoute
