import { useState } from "react";

const useModal = (): {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
} => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    openModal,
    closeModal,
  };
};

export default useModal;
