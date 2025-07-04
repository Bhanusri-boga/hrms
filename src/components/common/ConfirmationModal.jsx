import React from 'react';
import Modal from './Modal';
import Button from './Button';

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmButtonVariant = 'danger',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="card w-full max-w-md relative">
        <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
          <div className="py-4 text-sm text-gray-600 dark:text-gray-300">
            {children}
          </div>
          <div className="bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors duration-200">
            <Button variant="secondary" onClick={onClose}>
              {cancelText}
            </Button>
            <Button variant={confirmButtonVariant} onClick={onConfirm}>
              {confirmText}
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ConfirmationModal; 