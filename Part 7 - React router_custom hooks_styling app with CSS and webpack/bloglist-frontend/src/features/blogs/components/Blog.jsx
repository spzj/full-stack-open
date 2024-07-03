import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

import useClickHandler from '@/hooks/useClickHandler'
import { useUserValue } from '@/providers/UserContext'
import CommentIcon from '@/assets/comments.svg?react'
import DeleteIcon from '@/assets/delete.svg?react'
import HeartIcon from '@/assets/heart.svg?react'
import ProfileIcon from '@/assets/profile.svg?react'
import { paths } from '@/app/routes'
import EngagementButton from './EngagementButton'
import blogKeys from '../api/blogKeys'
import blogService from '@/features/blogs/api/blogs'
import { formatTimestamp } from '@/utils/format'
import styles from './Blog.module.css'

const Blog = ({ blog }) => {
  const queryClient = useQueryClient()
  const user = useUserValue()
  const navigate = useNavigate()
  const params = useParams()

  const updateLikeMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => queryClient.invalidateQueries(blogKeys.all),
    onError: (error) => {
      console.log(error)
    },
  })

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => queryClient.invalidateQueries(blogKeys.all),
    onError: (error) => {
      console.log(error)
    },
  })

  const handleBlogClick = (event) => {
    // Elements that do not navigate to individual blog view on click
    if (
      event.target.closest(`.${styles.profileIcon}`) ||
      event.target.closest(`.${styles.user}`) ||
      event.target.closest(`.${styles.username}`) ||
      event.target.closest(`.${styles.url}`) ||
      event.target.closest(`.${styles.likeButton}`) ||
      event.target.closest(`.${styles.deleteButton}`)
    )
      return

    if (!params.id || params.id !== blog.id) {
      navigate(paths.blogs + `/${blog.id}`)
    }
  }

  const { handleMouseDown, handleMouseMove, handleMouseUp } =
    useClickHandler(handleBlogClick)

  const handleUserClick = () => {
    if (!params.id || params.id !== blog.user.id) {
      navigate(paths.users + `/${blog.user.id}`)
    }
  }

  const handleLikeClick = () => {
    blog.likes++
    updateLikeMutation.mutate({ likes: blog.likes, id: blog.id })
  }

  const handleDeleteClick = () => {
    if (confirm('Delete blog post?')) {
      deleteBlogMutation.mutate(blog.id)
    }
  }

  return (
    <article
      className={styles.blog}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div>
        <ProfileIcon className={styles.profileIcon} onClick={handleUserClick} />
      </div>
      <div className={styles.body}>
        <header>
          <span className={styles.user} onClick={handleUserClick}>
            {blog.user.name}
          </span>
          <span className={styles.username} onClick={handleUserClick}>
            @{blog.user.username}
          </span>
          <span className={styles.separator}>·</span>
          <span className={styles.timestamp}>
            {formatTimestamp(blog.timestamp)}
          </span>
        </header>
        <div className={styles.content}>
          <h4>{blog.title}</h4>
          <p>{blog.author}</p>
          <a
            className={styles.url}
            href={blog.url}
            target="_blank"
            rel="noopener noreferrer"
          >
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
            count={blog.comments.length}
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
