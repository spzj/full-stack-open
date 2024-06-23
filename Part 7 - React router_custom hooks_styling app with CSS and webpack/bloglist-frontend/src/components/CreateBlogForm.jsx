import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useField } from '../hooks'
import { useNotificationDispatch } from '../providers/NotificationContext'
import { useUserValue } from '../providers/UserContext'
import blogService from '../services/blogs'
import formStyles from '../styles/form.module.css'

const CreateBlogForm = () => {
  const author = useField('text')
  const title = useField('text')
  const url = useField('url')
  const user = useUserValue()
  const notifDispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      newBlog.user = user
      queryClient.setQueryData(['blogs'], (blogs) => [...blogs, newBlog])
      notifDispatch({ type: 'CREATE', payload: `${newBlog.title}` })
    },
    onError: (error) => {
      console.log(error)
      notifDispatch({ type: 'ERROR', payload: 'Blog failed to be created' })
    },
  })

  const postBlog = (event) => {
    event.preventDefault()
    const blogDetails = {
      title: title.value,
      author: author.value,
      url: url.value,
      likes: 0,
    }

    newBlogMutation.mutate(blogDetails)
    author.reset()
    title.reset()
    url.reset()
  }
  return (
    <form id="create-blog-form" className={formStyles.form} onSubmit={postBlog}>
      <div>
        <input
          name="title"
          id="title"
          type={title.type}
          value={title.value}
          onChange={title.onChange}
          autoComplete="on"
          required
        ></input>
        <label htmlFor="title">Title</label>
      </div>
      <div>
        <input
          name="author"
          id="author"
          type={author.type}
          value={author.value}
          onChange={author.onChange}
          autoComplete="on"
          required
        ></input>
        <label htmlFor="author">Author</label>
      </div>
      <div>
        <input
          name="url"
          id="url"
          type={url.type}
          value={url.value}
          onChange={url.onChange}
          autoComplete="url"
          required
        ></input>
        <label htmlFor="url">Url</label>
      </div>
      <button aria-label="Post Blog" type="submit">
        Post
      </button>
    </form>
  )
}

export default CreateBlogForm
