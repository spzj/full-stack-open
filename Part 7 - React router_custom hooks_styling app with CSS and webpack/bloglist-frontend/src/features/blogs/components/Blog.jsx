import { useMutation, useQueryClient } from '@tanstack/react-query'
import PropTypes from 'prop-types'

import { useUserValue } from '@/providers/UserContext'
import CommentIcon from '@/assets/comments.svg?react'
import DeleteIcon from '@/assets/delete.svg?react'
import HeartIcon from '@/assets/heart.svg?react'
import ProfileIcon from '@/assets/profile.svg?react'
import EngagementButton from './EngagementButton'
import blogService from '@/services/blogs'
import styles from './Blog.module.css'

const Blog = ({ blog }) => {
  const queryClient = useQueryClient()
  const user = useUserValue()

  const updateLikeMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedBlog) => {
      updatedBlog.user = blog.user
      queryClient.setQueryData(['blogs'], (blogs) =>
        blogs
          .map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
          .sort((a, b) => b.likes - a.likes)
      )
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => queryClient.invalidateQueries(['blogs']),
    onError: (error) => {
      console.log(error)
    },
  })

  const handleLikeClick = () => {
    blog.likes++
    updateLikeMutation.mutate(blog)
  }
  const handleDeleteClick = () => {
    if (confirm('Delete blog post?')) {
      deleteBlogMutation.mutate(blog.id)
    }
  }

  return (
    <article className={styles.blog}>
      <div>
        <ProfileIcon className={styles.profileIcon} />
      </div>
      <div className={styles.body}>
        <header>
          <span className={styles.user}>{blog.user.name}</span>
          <span className={styles.username}>@{blog.user.username}</span>
        </header>
        <div className={styles.content}>
          <h4>{blog.title}</h4>
          <p>{blog.author}</p>
          <a className={styles.url} href={blog.url}>
            <span>{blog.url}</span>
          </a>
        </div>
        <footer className={styles.engagement}>
          <EngagementButton
            className={styles.likeButton}
            icon={HeartIcon}
            onClick={handleLikeClick}
            count={blog.likes}
          />
          <EngagementButton
            className={styles.commentButton}
            icon={CommentIcon}
            onClick={() => {}}
            count={0}
          />
          {user.username === blog.user.username && (
            <EngagementButton
              className={styles.deleteButton}
              icon={DeleteIcon}
              onClick={handleDeleteClick}
            />
          )}
        </footer>
      </div>
    </article>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
