import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useField } from '@/hooks/useField'
import { useNotificationDispatch } from '@/providers/NotificationContext'
import { useUserValue } from '@/providers/UserContext'
import blogService from '@/services/blogs'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import styles from './CreateBlogForm.module.css'

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
    <form className={styles.form} onSubmit={postBlog}>
      <Input
        label="Title"
        type={title.type}
        value={title.value}
        onChange={title.onChange}
        autoComplete="on"
        required
      />
      <Input
        label="Author"
        type={author.type}
        value={author.value}
        onChange={author.onChange}
        autoComplete="on"
        required
      />
      <Input
        label="Url"
        type={url.type}
        value={url.value}
        onChange={url.onChange}
        autoComplete="url"
        required
      />
      <Button text="Post" type="submit" />
    </form>
  )
}

export default CreateBlogForm
