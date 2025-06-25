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
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Salary Management</h1>
            <p className="text-gray-600">Manage employee salaries and payroll processing</p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center">
              <label htmlFor="month-select" className="text-sm font-medium text-gray-700 mr-2">
                Month:
              </label>
              <input
                id="month-select"
                type="month"
                value={selectedMonth}
                onChange={handleMonthChange}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              />
            </div>
            <button
              onClick={handleProcessPayroll}
              className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl text-sm font-medium"
            >
              Process Payroll
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider min-w-[180px]">
                  Employee
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider min-w-[120px]">
                  Position
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider min-w-[100px]">
                  Base Salary
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider min-w-[80px]">
                  Bonus
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider min-w-[100px]">
                  Deductions
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider min-w-[100px]">
                  Net Salary
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider min-w-[80px]">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider min-w-[100px]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayData.map((salary, index) => (
                <tr key={salary.id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      {/* <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm mr-3">
                        {salary.employeeName.split(' ').map(n => n[0]).join('')}
                      </div> */}
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {salary.employeeName}
                        </div>
                        <div className="text-xs text-gray-500">ID: {salary.employeeId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900">{salary.position}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium text-gray-900">${salary.baseSalary.toLocaleString()}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-green-600 font-medium">+${salary.bonus.toLocaleString()}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-red-600 font-medium">-${salary.deductions.toLocaleString()}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm font-bold text-gray-900">${salary.netSalary.toLocaleString()}</div>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${
                        salary.status === 'paid'
                          ? 'bg-green-100 text-green-800 border border-green-200'
                          : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                      }`}
                    >
                      {salary.status.charAt(0).toUpperCase() + salary.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => {/* View details */}}
                        className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                      >
                        View
                      </button>
                      {salary.status === 'pending' && (
                        <button
                          onClick={() => {/* Process individual salary */}}
                          className="px-3 py-1 text-xs bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors font-medium"
                        >
                          Process
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Salary;