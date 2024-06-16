import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlogForm from '../components/CreateBlogForm'

describe('CreateBlogForm', () => {
  test('Updates Parent State and Calls onSubmit with Complete Details', async () => {
    const testBlog = {
      title: 'Test Title',
      author: 'Test Author',
      url: 'https://test.com',
    }

    const mockCreateBlog = vi.fn()
    render(<CreateBlogForm createBlog={mockCreateBlog} />)

    const titleInput = screen.getByLabelText('Title')
    const authorInput = screen.getByLabelText('Author')
    const urlInput = screen.getByLabelText('Url')
    const createButton = screen.getByText('Create')

    await userEvent.type(titleInput, testBlog.title)
    await userEvent.type(authorInput, testBlog.author)
    await userEvent.type(urlInput, testBlog.url)
    await userEvent.click(createButton)

    expect(mockCreateBlog.mock.calls).toHaveLength(1)
    expect(mockCreateBlog.mock.calls[0][0]).toEqual(testBlog)
  })

  test('Does not Update Parent State or Call onSubmit with Incomplete Details', async () => {
    const mockCreateBlog = vi.fn()
    render(<CreateBlogForm createBlog={mockCreateBlog} />)

    const createButton = screen.getByText('Create')
    await userEvent.click(createButton)

    expect(mockCreateBlog.mock.calls).toHaveLength(0)
  })
})
