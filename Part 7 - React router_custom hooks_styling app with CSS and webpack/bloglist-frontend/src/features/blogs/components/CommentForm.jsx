import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import { useField } from '@/hooks/useField'
import blogKeys from '@/features/blogs/api/blogKeys'
import blogService from '@/features/blogs/api/blogs'
import Button from '@/components/Button'
import Input from '@/components/Input'
import styles from './CommentForm.module.css'

const CommentForm = () => {
  const comment = useField('text')
  const { id } = useParams()
  const queryClient = useQueryClient()
  const newCommentMutation = useMutation({
    mutationFn: blogService.comment,
    onSuccess: () => queryClient.invalidateQueries(blogKeys.all),
    onError: (error) => {
      console.log(error)
    },
  })

  const postComment = (event) => {
    event.preventDefault()
    newCommentMutation.mutate({ id, content: comment.value })
    comment.reset()
  }

  return (
    <form className={styles.commentContainer} onSubmit={postComment}>
      <Input
        className={styles.input}
        label="Comment"
        type={comment.type}
        value={comment.value}
        onChange={comment.onChange}
        required
      />
      <Button className={styles.button} text="Send" type="submit" />
    </form>
  )
}

export default CommentForm
