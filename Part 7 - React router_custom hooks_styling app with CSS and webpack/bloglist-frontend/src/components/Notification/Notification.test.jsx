// import { render, screen } from '@testing-library/react'
// import NotificationType from '@/constants'
// import Notification from './Notification'
// import styles from './notification.module.css'

// describe('Notification component', () => {
//   test('Renders Success Message', () => {
//     const message = 'Operation success'
//     render(<Notification type={NotificationType.SUCCESS} message={message} />)

//     const notification = screen.getByText(message)
//     expect(notification).toBeInTheDocument()
//     expect(notification).toHaveClass(`${styles.success}`)
//   })

//   test('Renders Error Message', () => {
//     const message = 'Error occurred'
//     render(<Notification type={NotificationType.ERROR} message={message} />)

//     const notification = screen.getByText(message)
//     expect(notification).toBeInTheDocument()
//     expect(notification).toHaveClass(`${styles.error}`)
//   })

//   test('Does not Render when Message is Null', () => {
//     const { container } = render(
//       <Notification type={NotificationType.SUCCESS} message={null} />
//     )

//     const notification = container.querySelector(`.${styles.container}`)
//     expect(notification).not.toBeInTheDocument()
//   })

//   test('Does not Render when Message is Empty String', () => {
//     const { container } = render(
//       <Notification type={NotificationType.SUCCESS} message="" />
//     )

//     const notification = container.querySelector(`.${styles.container}`)
//     expect(notification).not.toBeInTheDocument()
//   })
// })
