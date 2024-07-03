import { formatTimestamp } from '@/utils/format'
import styles from './Comment.module.css'

const Comment = ({ comment }) => {
  return (
    <article className={styles.comment}>
      <header className={styles.header}>
        <span>Anonymous</span>
        <span className={styles.separator}>·</span>
        <span>{formatTimestamp(comment.timestamp)}</span>
      </header>
      <div className={styles.content}>{comment.content}</div>
    </article>
  )
}

export default Comment
