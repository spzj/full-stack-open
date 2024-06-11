import { useEffect, useRef } from "react";

const Modal = ({ openModal, closeModal, children }) => {
  const ref = useRef();

  useEffect(() => {
    openModal ? ref.current?.showModal() : ref.current?.close();
  }, [openModal]);

  return (
    <dialog ref={ref} onCancel={closeModal} className="relative p-5 rounded-md w-full bottom-[10%] md:w-[70%] lg:bottom-[35%]">
      <button onClick={closeModal} className="mr-2 absolute top-0 right-0 font-bold text-slate-400">X</button>
      {children}
    </dialog>
  );
};

export default Modal;
