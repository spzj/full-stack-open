import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'

import XIcon from '@/assets/x.svg?react'
import styles from './Modal.module.css'

const Modal = ({ openModal, closeModal, children }) => {
  const ref = useRef()

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal()
      document.documentElement.style.overflow = 'hidden'
      document.body.scroll = 'no'
    } else {
      ref.current?.close()
      document.documentElement.style.overflow = 'scroll'
      document.body.scroll = 'yes'
    }
  }, [openModal])

  return (
    <dialog
      className={styles.modal}
      role="dialog"
      ref={ref}
      onCancel={closeModal}
    >
      <button
        aria-label="Close Modal"
        type="button"
        className={styles.button}
        onClick={closeModal}
      >
        <XIcon className={styles.icon} />
      </button>
      {children}
    </dialog>
  )
}

Modal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default Modal
