import PropTypes from 'prop-types'
import { useState } from 'react'
import formStyles from '../styles/form.module.css'

const CreateBlogForm = ({ createBlog }) => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const handleAuthorChange = (event) => setAuthor(event.target.value)
  const handleTitleChange = (event) => setTitle(event.target.value)
  const handleUrlChange = (event) => setUrl(event.target.value)

  const postBlog = (event) => {
    event.preventDefault()
    createBlog({ title, author, url })

    setAuthor('')
    setTitle('')
    setUrl('')
  }
  return (
    <form id="create-blog-form" className={formStyles.form} onSubmit={postBlog}>
      <div>
        <input
          name="title"
          id="title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={handleTitleChange}
          required
        ></input>
        <label htmlFor="title">Title</label>
      </div>
      <div>
        <input
          name="author"
          id="author"
          type="text"
          autoComplete="off"
          value={author}
          onChange={handleAuthorChange}
          required
        ></input>
        <label htmlFor="author">Author</label>
      </div>
      <div>
        <input
          name="url"
          id="url"
          type="url"
          autoComplete="url"
          value={url}
          onChange={handleUrlChange}
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

CreateBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default CreateBlogForm
