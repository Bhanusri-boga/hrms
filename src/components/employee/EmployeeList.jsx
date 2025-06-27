import React from 'react';
import { formatDate, formatPhoneNumber } from '../../utils/formatUtils';

const EmployeeList = ({ employees, onEdit, onView, onDelete }) => {
  if (!employees?.length) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 dark:text-gray-400">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium">No employees found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Get started by creating a new employee.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
          <tr>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider min-w-[80px]">ID</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider min-w-[180px]">Employee</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider min-w-[120px]">Department</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider min-w-[120px]">Position</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider min-w-[120px]">Contact</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider min-w-[100px]">Join Date</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider min-w-[80px]">Status</th>
            <th className="px-3 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider min-w-[160px]">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employees.map((employee, index) => (
            <tr
              key={employee.employeeId || employee.id}
              className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}
            >
              <td className="px-3 py-4">
                {/* <div className="text-sm font-medium text-indigo-600">
                  #{employee.employeeId}
                </div> */}
              </td>
              <td className="px-3 py-4">
                <div className="flex items-center">
                  {/* <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-xs mr-3 flex-shrink-0">
                    {(employee.firstName?.charAt(0) || '') + (employee.lastName?.charAt(0) || '')}
                  </div> */}
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {employee.firstName} {employee.lastName}
                    </div>
                    <div className="text-xs text-gray-500 truncate">{employee.workEmail || employee.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-3 py-4">
                <div className="text-sm text-gray-900 truncate">{employee.departmentName || employee.department}</div>
              </td>
              <td className="px-3 py-4">
                <div className="text-sm text-gray-900 truncate">{employee.jobTitleName || employee.jobTitle}</div>
              </td>
              <td className="px-3 py-4">
                <div className="text-sm text-gray-900">{formatPhoneNumber(employee.mobilePhone || employee.phone)}</div>
              </td>
              <td className="px-3 py-4">
                <div className="text-sm text-gray-900">{formatDate(employee.joinedDate || employee.joinDate)}</div>
              </td>
              <td className="px-3 py-4">
                <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                  (employee.status || 'Active') === 'Active' 
                    ? 'bg-green-100 text-green-800 border border-green-200'
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                  {employee.status || 'Active'}
                </span>
              </td>
              <td className="px-3 py-4 text-right">
                <div className="flex justify-end space-x-1">
                  <button
                    onClick={() => onView(employee)}
                    className="px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors font-medium"
                    title="View Employee"
                  >
                    View
                  </button>
                  <button
                    onClick={() => onEdit(employee)}
                    className="px-2 py-1 text-xs bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100 transition-colors font-medium"
                    title="Edit Employee"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(employee.employeeId || employee.id)}
                    className="px-2 py-1 text-xs bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors font-medium"
                    title="Delete Employee"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;