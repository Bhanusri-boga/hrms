import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import EmployeeList from '../components/employee/EmployeeList';
import EmployeeModal from '../components/employee/EmployeeModal';
import ConfirmationModal from '../components/common/ConfirmationModal';
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from '../store/slices/employeeSlice';

const Employees = () => {
  const dispatch = useDispatch();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [modalMode, setModalMode] = useState(null); // 'view' or 'edit'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  const { employees, loading, error } = useSelector((state) => state.employee);

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  const handleModalSubmit = async (employeeData) => {
    try {
      if (employeeData.id) {
        await dispatch(updateEmployee({ id: employeeData.id, employeeData })).unwrap();
        toast.success('Employee updated successfully');
        // Optionally refresh the selected employee
        setSelectedEmployee({ ...employeeData });
        setModalMode('view');
      } else {
        await dispatch(createEmployee(employeeData)).unwrap();
        toast.success('Employee created successfully');
        closeModal();
      }
      dispatch(getEmployees());
    } catch (err) {
      console.error('Error submitting form:', err);
      toast.error(err.message || 'Failed to save employee');
    }
  };

  const handleDeleteEmployee = (employeeId) => {
    setEmployeeToDelete(employeeId);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteEmployee = async () => {
    if (employeeToDelete) {
      try {
        await dispatch(deleteEmployee(employeeToDelete)).unwrap();
        toast.success('Employee deleted successfully');
      } catch (err) {
        console.error('Error deleting employee:', err);
        toast.error(err.message || 'Failed to delete employee');
      } finally {
        setShowDeleteConfirm(false);
        setEmployeeToDelete(null);
      }
    }
  };

  const openModal = (mode, employee = null) => {
    setSelectedEmployee(employee);
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
    setModalMode(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">Loading employees...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-500 mb-2">
            <svg className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">Error Loading Employees</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{error}</p>
          <button
            onClick={() => dispatch(getEmployees())}
            className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-indigo-500"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 py-2">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-base font-bold text-gray-900 dark:text-white">Employees</h1>
          <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
            Manage your organization's employees
          </p>
        </div>
        <button
          onClick={() => openModal('edit')}
          className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-indigo-500"
        >
          Add Employee
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <EmployeeList
          employees={employees}
          onEdit={(employee) => openModal('edit', employee)}
          onView={(employee) => openModal('view', employee)}
          onDelete={handleDeleteEmployee}
        />
      </div>

      <EmployeeModal
        isModalOpen={isModalOpen}
        employee={selectedEmployee}
        mode={modalMode}
        onClose={closeModal}
        onSubmit={handleModalSubmit}
      />

      <ConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={confirmDeleteEmployee}
        title="Confirm Deletion"
        confirmText="Delete"
        confirmButtonVariant="danger"
      >
        Are you sure you want to delete this employee? This action cannot be undone.
      </ConfirmationModal>
    </div>
  );
};

export default Employees; 