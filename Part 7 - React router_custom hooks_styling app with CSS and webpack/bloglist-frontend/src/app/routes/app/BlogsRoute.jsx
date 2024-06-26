import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import Blog from '@/components/Blog'
import CreateBlogForm from '@/components/CreateBlogForm'
import Modal from '@/components/Modal'
import Notification from '@/components/Notification'
import Button from '@/components/ui/Button'
import blogService from '@/services/blogs'
import styles from '@/styles/app.module.css'

const BlogsRoute = () => {
  const [openModal, setOpenModal] = useState(false)
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
      <div className={styles.headerSticky}>
        <div className={styles.headerContainer}>
          <h2>Blogs</h2>
          <Button text="Create" onClick={() => setOpenModal(true)} />
        </div>
      </div>
      <div className={styles.blogs}>
        {blogs.map((blog) => (
          <div className={styles.blogContainer} key={blog.id}>
            <Blog blog={blog} />
          </div>
        ))}
      </div>
      <Modal openModal={openModal} closeModal={() => setOpenModal(false)}>
        <CreateBlogForm />
        <Notification />
      </Modal>
    </div>
  )
}

export default BlogsRoute
