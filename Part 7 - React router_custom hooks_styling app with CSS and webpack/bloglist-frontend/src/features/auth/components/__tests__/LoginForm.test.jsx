import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from '@/components/LoginForm'

describe('LoginForm', () => {
  test('Updates Parent State and Calls onSubmit with Complete Details', async () => {
    const testLogin = {
      username: 'testuser1',
      password: '123',
    }

    const mockHandleLogin = vi.fn()
    render(<LoginForm handleLogin={mockHandleLogin} />)

    const usernameInput = screen.getByLabelText('Username')
    const passwordInput = screen.getByLabelText('Password')
    const loginButton = screen.getByText('Log in')

    await userEvent.type(usernameInput, testLogin.username)
    await userEvent.type(passwordInput, testLogin.password)
    await userEvent.click(loginButton)

    expect(mockHandleLogin.mock.calls).toHaveLength(1)
    expect(mockHandleLogin.mock.calls[0][0]).toEqual(testLogin)
  })

  test('Does not Update Parent State or Call onSubmit with Incomplete Details', async () => {
    const mockHandleLogin = vi.fn()
    render(<LoginForm handleLogin={mockHandleLogin} />)

    const loginButton = screen.getByText('Log in')
    await userEvent.click(loginButton)

    expect(mockHandleLogin.mock.calls).toHaveLength(0)
  })
})
