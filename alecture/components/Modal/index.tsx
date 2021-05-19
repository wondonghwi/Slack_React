import React, { useCallback } from 'react';
import { CloseModalButton, CreateModal } from '@components/Modal/styles';

interface ModalProps {
  children: React.ReactNode;
  show: boolean;
  onCloseModal: () => void;
}

const Modal = ({ children, show, onCloseModal }: ModalProps) => {
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  if (!show) {
    return null;
  }

  return (
    <CreateModal onClick={onCloseModal}>
      <div onClick={stopPropagation}>
        <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>
        {children}
      </div>
    </CreateModal>
  );
};

export default Modal;
