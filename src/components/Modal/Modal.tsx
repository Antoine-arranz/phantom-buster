import { ReactNode, useRef } from "react";
import { useClickOutside } from "../../hooks/clickOutside";

interface ModalProps {
  title: string;
  content: string;
  children: ReactNode;
  open: boolean;
  close: () => void;
}

const Modal = ({ children, open, close, title, content }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside(modalRef, () => close());

  if (!open) {
    return null;
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50'>
      <div ref={modalRef} className='bg-white p-8 rounded-md w-80'>
        <h2 className='font-bold text-xl mb-3'>{title}</h2>
        <p className='mb-2'>{content}</p>
        <div className='text-lg font-semibold mb-4 border-bcg-filter'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
