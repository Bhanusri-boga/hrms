import React, { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { useNotification } from '../../context/NotificationContext';
import EmployeeListComponent from '../../components/employee/EmployeeList';
import EmployeeForm from '../../components/employee/EmployeeForm';
import EmployeeDetail from '../../components/employee/EmployeeDetail';
import { createEmployee, updateEmployee, deleteEmployee } from '../../api/employeeApi';

const EmployeeList = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const { addNotification } = useNotification();

  const { data: employees, loading, refetch } = useFetch('/employees');

  const handleCreateEmployee = async (employeeData) => {
    try {
      await createEmployee(employeeData);
      addNotification({
        type: 'success',
        message: 'Employee created successfully'
      });
      setIsFormOpen(false);
      refetch();
    } catch (error) {
      addNotification({
        type: 'error',
        message: error.message || 'Failed to create employee'
      });
    }
  };

  const handleUpdateEmployee = async (id, employeeData) => {
    try {
      await updateEmployee(id, employeeData);
      addNotification({
        type: 'success',
        message: 'Employee updated successfully'
      });
      setIsFormOpen(false);
      refetch();
    } catch (error) {
      addNotification({
        type: 'error',
        message: error.message || 'Failed to update employee'
      });
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await deleteEmployee(id);
      addNotification({
        type: 'success',
        message: 'Employee deleted successfully'
      });
      refetch();
    } catch (error) {
      addNotification({
        type: 'error',
        message: error.message || 'Failed to delete employee'
      });
    }
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setIsFormOpen(true);
  };

  const handleView = (employee) => {
    setSelectedEmployee(employee);
    setIsDetailOpen(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
        <button
          onClick={() => {
            setSelectedEmployee(null);
            setIsFormOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Employee
        </button>
      </div>

      <EmployeeListComponent
        employees={employees}
        onEdit={handleEdit}
        onView={handleView}
        onDelete={handleDeleteEmployee}
      />

      {isFormOpen && (
        <EmployeeForm
          employee={selectedEmployee}
          onSubmit={selectedEmployee ? handleUpdateEmployee : handleCreateEmployee}
          onClose={() => setIsFormOpen(false)}
        />
      )}

      {isDetailOpen && (
        <EmployeeDetail
          employee={selectedEmployee}
          onClose={() => setIsDetailOpen(false)}
          onEdit={() => {
            setIsDetailOpen(false);
            setIsFormOpen(true);
          }}
        />
      )}
    </div>
  );
};

export default EmployeeList;