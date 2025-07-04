import React, { useState } from 'react';
import { useNotification } from '../../context/NotificationContext';
import SalaryList from '../../components/salary/SalaryList';
import SalaryDetail from '../../components/salary/SalaryDetail';

const initialMockSalaryData = [
  {
    id: 1,
    employeeId: 1,
    payPeriodStart: '2025-04-01',
    payPeriodEnd: '2025-05-31',
    basicSalary: 15000.0,
    allowances: 5000.0,
    deductions: 2000.0,
    paymentDate: '2025-05-05',
    comments: 'Regular monthly salary',
    status: 'pending',
  },
  {
    id: 2,
    employeeId: 2,
    payPeriodStart: '2025-04-01',
    payPeriodEnd: '2025-05-31',
    basicSalary: 15000.0,
    allowances: 5000.0,
    deductions: 2000.0,
    paymentDate: '2025-05-05',
    comments: 'Regular monthly salary',
    status: 'pending',
  },
  // ... more mock data as needed
];

const Salary = () => {
  const { addNotification } = useNotification();
  const [salaries, setSalaries] = useState(initialMockSalaryData);
  const [selectedSalary, setSelectedSalary] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchEmail, setSearchEmail] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [searching, setSearching] = useState(false);

  // Handlers
  const handleView = (salary) => {
    setSelectedSalary(salary);
    setIsEditMode(false);
    setShowDetailModal(true);
  };
  const handleEdit = (salary) => {
    setSelectedSalary(salary);
    setIsEditMode(true);
    setShowDetailModal(true);
  };
  const handleDelete = (id) => {
    setSalaries(salaries.filter((s) => (s.id || s.employeeId) !== id));
    addNotification({ type: 'info', message: `Deleted salary with id ${id}` });
  };
  const handleApprove = (salary) => {
    setSalaries(salaries.map((s) => (s.id === salary.id ? { ...s, status: 'approved' } : s)));
    addNotification({ type: 'success', message: `Approved salary for employee ${salary.employeeId}` });
  };
  const handleReject = (salary) => {
    setSalaries(salaries.map((s) => (s.id === salary.id ? { ...s, status: 'rejected' } : s)));
    addNotification({ type: 'warning', message: `Rejected salary for employee ${salary.employeeId}` });
  };
  const handleSave = (updatedSalary) => {
    setSalaries(salaries.map((s) => (s.id === updatedSalary.id ? updatedSalary : s)));
    setShowDetailModal(false);
    addNotification({ type: 'success', message: 'Salary updated successfully' });
  };
  const handleCloseModal = () => {
    setShowDetailModal(false);
    setSelectedSalary(null);
    setIsEditMode(false);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchEmail) {
      setSearchResult(null);
      return;
    }
    setSearching(true);
    try {
      const filtered = salaries.filter(s =>
        (s.employeeEmail && s.employeeEmail.toLowerCase() === searchEmail.toLowerCase()) ||
        (s.employeeId && String(s.employeeId) === searchEmail)
      );
      setSearchResult(filtered);
    } catch {
      setSearchResult([]);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="w-full px-2 sm:px-4 py-6 space-y-6">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Salary Management</h1>
        <p className="text-gray-600">Manage employee salaries and payroll processing</p>
      </div>
      <form onSubmit={handleSearch} className="flex gap-2 items-center mb-4">
        <input
          type="text"
          placeholder="Search by employee email or ID..."
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
      <div className="w-full bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <SalaryList
          salaries={searchResult !== null ? searchResult : salaries}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>
      {showDetailModal && (
        <SalaryDetail
          salary={selectedSalary}
          onClose={handleCloseModal}
          onEdit={() => setIsEditMode(true)}
          onSave={handleSave}
          isEditMode={isEditMode}
        />
      )}
    </div>
  );
};

export default Salary;