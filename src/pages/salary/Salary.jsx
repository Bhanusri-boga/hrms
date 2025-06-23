import React, { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { useNotification } from '../../context/NotificationContext';

const Salary = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const { addNotification } = useNotification();
  
  // Fetch salary data for the selected month
  const { data: salaryData, loading, refetch } = useFetch(`/salaries?month=${selectedMonth}`);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleProcessPayroll = async () => {
    try {
      // This would be an API call to process payroll
      // await processPayroll(selectedMonth);
      
      addNotification({
        type: 'success',
        message: 'Payroll processed successfully'
      });
      refetch();
    } catch (error) {
      addNotification({
        type: 'error',
        message: error.message || 'Failed to process payroll'
      });
    }
  };

  // Mock data for demonstration
  const mockSalaryData = [
    { 
      id: 1, 
      employeeId: 101, 
      employeeName: 'John Doe', 
      position: 'Senior Developer',
      baseSalary: 5000,
      bonus: 500,
      deductions: 750,
      netSalary: 4750,
      status: 'paid',
      paymentDate: '2023-05-28'
    },
    { 
      id: 2, 
      employeeId: 102, 
      employeeName: 'Jane Smith', 
      position: 'Project Manager',
      baseSalary: 6000,
      bonus: 800,
      deductions: 900,
      netSalary: 5900,
      status: 'paid',
      paymentDate: '2023-05-28'
    },
    { 
      id: 3, 
      employeeId: 103, 
      employeeName: 'Michael Johnson', 
      position: 'UI/UX Designer',
      baseSalary: 4500,
      bonus: 300,
      deductions: 675,
      netSalary: 4125,
      status: 'pending',
      paymentDate: null
    },
    { 
      id: 4, 
      employeeId: 104, 
      employeeName: 'Emily Davis', 
      position: 'QA Engineer',
      baseSalary: 4200,
      bonus: 200,
      deductions: 630,
      netSalary: 3770,
      status: 'pending',
      paymentDate: null
    },
  ];

  // Use mock data for now
  const displayData = salaryData || mockSalaryData;

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Salary Management</h1>
        <div className="flex items-center">
          <label htmlFor="month-select" className="mr-2 text-gray-700">
            Select Month:
          </label>
          <input
            id="month-select"
            type="month"
            value={selectedMonth}
            onChange={handleMonthChange}
            className="border border-gray-300 rounded p-2 mr-4"
          />
          <button
            onClick={handleProcessPayroll}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Process Payroll
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Position
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Base Salary
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bonus
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Deductions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Net Salary
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayData.map((salary) => (
              <tr key={salary.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {salary.employeeName}
                  </div>
                  <div className="text-sm text-gray-500">ID: {salary.employeeId}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{salary.position}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${salary.baseSalary.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${salary.bonus.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${salary.deductions.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">${salary.netSalary.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      salary.status === 'paid'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {salary.status.charAt(0).toUpperCase() + salary.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => {/* View details */}}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    View
                  </button>
                  {salary.status === 'pending' && (
                    <button
                      onClick={() => {/* Process individual salary */}}
                      className="text-green-600 hover:text-green-900"
                    >
                      Process
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Salary;