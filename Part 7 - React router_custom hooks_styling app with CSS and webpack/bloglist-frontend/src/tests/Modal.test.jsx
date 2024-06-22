import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Modal from '../components/Modal'

describe('Modal', () => {
  beforeAll(() => {
    HTMLDialogElement.prototype.close = vi.fn(function mock() {
      this.open = false
    })
    HTMLDialogElement.prototype.showModal = vi.fn(function mock() {
      this.open = true
    })
  })

  test('Displayed when Open', () => {
    const mockCloseModal = vi.fn()
    const modalContent = 'Modal Content'
    render(
      <Modal openModal={true} closeModal={mockCloseModal}>
        <div>{modalContent}</div>
      </Modal>
    )

    const modal = screen.getByRole('dialog', { hidden: true })
    expect(modal.open).toBe(true)
  })

  test('Not Displayed when Closed', () => {
    const mockCloseModal = vi.fn()
    const modalContent = 'Modal Content'
    render(
      <Modal openModal={false} closeModal={mockCloseModal}>
        <div>{modalContent}</div>
      </Modal>
    )

    const modal = screen.getByRole('dialog', { hidden: true })
    expect(modal.open).toBe(false)
  })

  test('CloseModal is Called Once when X Button is Clicked', async () => {
    const mockCloseModal = vi.fn()
    const modalContent = 'Modal Content'
    render(
      <Modal openModal={true} closeModal={mockCloseModal}>
        <div>{modalContent}</div>
      </Modal>
    )

    const button = screen.getByRole('button')
    await userEvent.click(button)
    expect(mockCloseModal.mock.calls).toHaveLength(1)
  })
})
