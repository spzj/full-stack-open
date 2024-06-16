import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'
import styles from '../styles/blog.module.css'

describe('Blog', () => {
  const user = {
    username: 'user1',
    name: 'User 1',
    id: '666e6d165874229ed85b7e74',
  }

  const blog = {
    title: 'Testing React apps',
    author: 'Full Stack Open',
    url: 'https://fullstackopen.com/en/part5/testing_react_apps',
    likes: '50',
    user: user,
  }

  test('Renders Title and Likes but not Author and Url by Default', () => {
    const mockUpdateLikes = vi.fn()
    const mockDeleteBlog = vi.fn()
    const { container } = render(
      <Blog
        blog={blog}
        user={user}
        updateLikes={mockUpdateLikes}
        deleteBlog={mockDeleteBlog}
      />
    )

    const div = container.querySelector(`.${styles.blog}`)
    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.likes)
    expect(div).not.toHaveTextContent(blog.author)
    expect(div).not.toHaveTextContent(blog.url)
  })

  test('Click Show More Button Toggles Display of Author and Url', async () => {
    const mockUpdateLikes = vi.fn()
    const mockDeleteBlog = vi.fn()
    const { container } = render(
      <Blog
        blog={blog}
        user={user}
        updateLikes={mockUpdateLikes}
        deleteBlog={mockDeleteBlog}
      />
    )
    const div = container.querySelector(`.${styles.blog}`)
    const showButton = container.querySelector(`.${styles.showButton}`)
    await userEvent.click(showButton)

    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.likes)
    expect(div).toHaveTextContent(blog.author)
    expect(div).toHaveTextContent(blog.url)

    await userEvent.click(showButton)
    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.likes)
    expect(div).not.toHaveTextContent(blog.author)
    expect(div).not.toHaveTextContent(blog.url)
  })

  test('updateLikes is Called Once with Each Like Button Click', async () => {
    const mockUpdateLikes = vi.fn()
    const mockDeleteBlog = vi.fn()
    const { container } = render(
      <Blog
        blog={blog}
        user={user}
        updateLikes={mockUpdateLikes}
        deleteBlog={mockDeleteBlog}
      />
    )
    const likeButton = container.querySelector(`.${styles.likeButton}`)
    const numOfCalls = 2
    for (let i = 0; i < numOfCalls; i++) {
      await userEvent.click(likeButton)
    }

    expect(mockUpdateLikes.mock.calls).toHaveLength(numOfCalls)
  })

  test('deleteBlog is Called Once when Delete Button is Clicked', async () => {
    const mockUpdateLikes = vi.fn()
    const mockDeleteBlog = vi.fn()
    const { container } = render(
      <Blog
        blog={blog}
        user={user}
        updateLikes={mockUpdateLikes}
        deleteBlog={mockDeleteBlog}
      />
    )
    const deleteButton = container.querySelector(`.${styles.deleteButton}`)
    await userEvent.click(deleteButton)

    expect(mockDeleteBlog.mock.calls).toHaveLength(1)
  })
})
