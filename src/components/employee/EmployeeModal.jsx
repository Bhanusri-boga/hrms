import React, { useState, useEffect } from 'react';
import EmployeeDetail from './EmployeeDetail';
import EmployeeForm from './EmployeeForm';

const EmployeeModal = ({
  employee,
  mode,
  onClose,
  onSubmit,
  isModalOpen,
}) => {
  const [currentMode, setCurrentMode] = useState(mode);

  useEffect(() => {
    setCurrentMode(mode);
  }, [mode]);

  if (!isModalOpen) {
    return null;
  }

  const handleFormSubmit = async (data) => {
    await onSubmit(data);
    // After successful submission, let the parent handle closing or switching mode
  };

  const switchToEditMode = () => {
    setCurrentMode('edit');
  };

  const switchToViewMode = () => {
    if (employee) {
      setCurrentMode('view');
    } else {
      onClose(); // If it's a new employee, cancel closes the modal
    }
  };

  return (
    <>
      {currentMode === 'view' && employee && (
        <EmployeeDetail
          employee={employee}
          onClose={onClose}
          onEdit={switchToEditMode}
          isModal={true}
        />
      )}
      {currentMode === 'edit' && (
        <EmployeeForm
          employee={employee}
          onSubmit={handleFormSubmit}
          onClose={onClose}
          onCancel={employee ? switchToViewMode : onClose}
          isModal={true}
        />
      )}
    </>
  );
};

export default EmployeeModal; 