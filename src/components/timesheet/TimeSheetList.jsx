import React from 'react';
// import { formatDate } from '../../utils/formatUtils';
// import TimeSheets from "./pages/TimeSheets";

const TimeSheetList = ({ timeSheets, onView, onEdit, onDelete, onApprove, onReject }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Employee
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Month
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Hours
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Entries
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
          {timeSheets?.map((timeSheet) => (
            <tr key={timeSheet.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {timeSheet.employeeName}
                </div>
                <div className="text-xs text-gray-500">
                  {timeSheet.employeeId}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{timeSheet.month}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{timeSheet.totalHours}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {timeSheet.entries?.length || 0} entries
                </div>
                <div className="text-xs text-gray-500">
                  {timeSheet.entries && timeSheet.entries[0]?.description}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    timeSheet.status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : timeSheet.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {timeSheet.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => {
                    console.log('View button clicked for:', timeSheet);
                    onView(timeSheet);
                  }}
                  className="text-blue-600 hover:text-blue-900 mr-2"
                >
                  View
                </button>
                <button
                  onClick={() => onEdit(timeSheet)}
                  className="text-indigo-600 hover:text-indigo-900 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(timeSheet.id)}
                  className="text-red-600 hover:text-red-900 mr-2"
                >
                  Delete
                </button>
                {timeSheet.status === 'pending' && (
                  <>
                    <button
                      onClick={() => onApprove(timeSheet)}
                      className="text-green-600 hover:text-green-900 mr-2"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => onReject(timeSheet)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimeSheetList; 