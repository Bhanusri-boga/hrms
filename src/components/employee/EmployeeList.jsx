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
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th
              scope="col"
              className="px-2 py-1 text-left text-xxs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-2 py-1 text-left text-xxs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
            >
              Position
            </th>
            <th
              scope="col"
              className="px-2 py-1 text-left text-xxs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
            >
              Department
            </th>
            <th
              scope="col"
              className="px-2 py-1 text-left text-xxs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
            >
              Contact
            </th>
            <th
              scope="col"
              className="px-2 py-1 text-left text-xxs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
            >
              Join Date
            </th>
            <th
              scope="col"
              className="px-2 py-1 text-right text-xxs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {employees.map((employee) => (
            <tr
              key={employee.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
            >
              <td className="px-2 py-1 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-6 w-6">
                    <img
                      className="h-6 w-6 rounded-full object-cover"
                      src={employee.avatar || 'https://via.placeholder.com/40'}
                      alt={employee.name}
                    />
                  </div>
                  <div className="ml-2">
                    <div className="text-xs font-medium text-gray-900 dark:text-white">
                      {employee.name}
                    </div>
                    <div className="text-xxs text-gray-500 dark:text-gray-400">
                      {employee.email}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-2 py-1 whitespace-nowrap">
                <div className="text-xs text-gray-900 dark:text-white">
                  {employee.position}
                </div>
              </td>
              <td className="px-2 py-1 whitespace-nowrap">
                <div className="text-xs text-gray-900 dark:text-white">
                  {employee.department}
                </div>
              </td>
              <td className="px-2 py-1 whitespace-nowrap">
                <div className="text-xs text-gray-900 dark:text-white">
                  {formatPhoneNumber(employee.phone)}
                </div>
              </td>
              <td className="px-2 py-1 whitespace-nowrap">
                <div className="text-xs text-gray-900 dark:text-white">
                  {formatDate(employee.joinDate)}
                </div>
              </td>
              <td className="px-2 py-1 whitespace-nowrap text-right text-xs font-medium">
                <button
                  onClick={() => onView(employee)}
                  className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-1 focus:outline-none focus:underline"
                >
                  View
                </button>
                <button
                  onClick={() => onEdit(employee)}
                  className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-1 focus:outline-none focus:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(employee.id)}
                  className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 focus:outline-none focus:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList; 