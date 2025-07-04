import React, { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { useNotification } from '../../context/NotificationContext';
import { employeeApi } from '../../api/apiService';
import EmployeeListComponent from '../../components/employee/EmployeeList';
import EmployeeForm from '../../components/employee/EmployeeForm';
import EmployeeDetail from '../../components/employee/EmployeeDetail';

const EmployeeList = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const { addNotification } = useNotification();
  const [searchEmail, setSearchEmail] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [searching, setSearching] = useState(false);

  const { data: employees, loading, refetch } = useFetch('/employees');

  const handleCreateEmployee = async (employeeData) => {
    try {
      await employeeApi.create(employeeData);
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
      await employeeApi.update(id, employeeData);
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
      await employeeApi.delete(id);
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

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchEmail) {
      setSearchResult(null);
      return;
    }
    setSearching(true);
    try {
      const allEmployees = await employeeApi.getAll();
      const filtered = allEmployees?.data?.filter(emp => emp.email === searchEmail) || [];
      setSearchResult(filtered);
    } catch {
      setSearchResult([]);
    } finally {
      setSearching(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col h-full w-full min-w-0 px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4 w-full">
        <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
        <form onSubmit={handleSearch} className="flex gap-2 items-center">
          <input
            type="email"
            placeholder="Search by email..."
            value={searchEmail}
            onChange={e => setSearchEmail(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 text-sm"
            disabled={searching}
          >
            {searching ? 'Searching...' : 'Search'}
          </button>
          {searchResult && (
            <button
              type="button"
              className="ml-2 text-gray-500 underline text-xs"
              onClick={() => { setSearchResult(null); setSearchEmail(''); }}
            >
              Clear
            </button>
          )}
        </form>
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
        employees={searchResult !== null ? searchResult : employees}
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