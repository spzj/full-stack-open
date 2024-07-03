import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'

import XIcon from '@/assets/x.svg?react'
import styles from './Modal.module.css'

const Modal = ({ isModalOpen, closeModal, children, className, ...rest }) => {
  const ref = useRef()

  useEffect(() => {
    isModalOpen ? ref.current?.showModal() : ref.current?.close()
  }, [isModalOpen])

  return (
    <dialog
      className={`${styles.modal} ${className}`}
      ref={ref}
      onCancel={closeModal}
      {...rest}
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
  isModalOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

export default Modal
