import React from 'react';
// import { formatDateTime } from '../../utils/formatUtils';

const AttendanceList = ({ attendance, onMark, dark }) => (
  <table className={`w-full divide-y divide-gray-200 ${dark ? 'dark:divide-gray-700' : ''}`}>
    <thead className={dark ? 'bg-gray-50 dark:bg-gray-700 sticky top-0' : 'bg-gradient-to-r from-gray-50 to-gray-100'}>
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Employee</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">In Time</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Out Time</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Note</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
      </tr>
    </thead>
    <tbody className={`bg-white ${dark ? 'dark:bg-gray-800' : ''} divide-y divide-gray-200 ${dark ? 'dark:divide-gray-700' : ''}`}>
      {attendance.map((record, index) => (
        <tr key={record.id} className={dark ? '' : `hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className={`text-sm font-medium ${dark ? 'text-gray-900 dark:text-white' : 'text-gray-900'}`}>{record.employeeName}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
            {record.inTime ? new Date(record.inTime).toLocaleString() : '-'}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
            {record.outTime ? new Date(record.outTime).toLocaleString() : '-'}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
            {record.note || '-'}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
              ${record.status === 'PRESENT' ? 'bg-green-100 text-green-800' : 
                record.status === 'ABSENT' ? 'bg-red-100 text-red-800' : 
                record.status === 'LATE' ? 'bg-yellow-100 text-yellow-800' : 
                'bg-gray-100 text-gray-800'}`}>
              {record.status}
            </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => onMark(record.employeeId, 'PRESENT')}
                className={`px-3 py-1 text-xs bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors font-medium ${dark ? '' : ''}`}
              >
                Present
              </button>
              <button
                onClick={() => onMark(record.employeeId, 'ABSENT')}
                className={`px-3 py-1 text-xs bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium ${dark ? '' : ''}`}
              >
                Absent
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default AttendanceList;