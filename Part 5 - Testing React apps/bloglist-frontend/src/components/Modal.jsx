import { useEffect, useRef } from "react";

const Modal = ({ openModal, closeModal, children }) => {
  const ref = useRef();

  useEffect(() => {
    openModal ? ref.current?.showModal() : ref.current?.close();
  }, [openModal]);

  return (
    <dialog ref={ref} onCancel={closeModal}>
      <button onClick={closeModal}>X</button>
      {children}
    </dialog>
  );
};

export default Modal;
