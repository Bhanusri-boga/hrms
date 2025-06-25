import React from 'react';
// import { formatDate } from '../../utils/formatUtils';
// import TimeSheets from "./pages/TimeSheets";

const TimeSheetList = ({ timeSheets, onView, onEdit, onDelete, onApprove, onReject }) => {
  
  const calculateTotalHours = (startTime, endTime, breakDuration) => {
    if (!startTime || !endTime) return 'N/A';
    
    const start = new Date(`1970-01-01T${startTime}`);
    const end = new Date(`1970-01-01T${endTime}`);
    
    let diff = (end.getTime() - start.getTime()) / 1000 / 60; // difference in minutes
    diff -= breakDuration || 0;
    
    const hours = Math.floor(diff / 60);
    const minutes = Math.round(diff % 60);
    
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Employee
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Time
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Hours
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {timeSheets?.map((timeSheet) => (
            <tr key={timeSheet.id} className="hover:bg-gray-50">
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {timeSheet.employeeName || `ID: ${timeSheet.employeeId}`}
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{new Date(timeSheet.date).toLocaleDateString()}</div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {timeSheet.startTime} - {timeSheet.endTime}
                </div>
                <div className="text-xs text-gray-500">
                  Break: {timeSheet.breakDuration} min
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{calculateTotalHours(timeSheet.startTime, timeSheet.endTime, timeSheet.breakDuration)}</div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
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
              
              <td className="px-4 py-4  whitespace-nowrap text-right text-sm font-medium">
              <div className="flex justify-end space-x-2">
              
                <button
                  onClick={() => onView(timeSheet)}
                  className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                >
                  View
                </button>
                <button
                  onClick={() => onEdit(timeSheet)}
                  className="px-3 py-1 text-xs bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(timeSheet.id)}
                  className="px-3 py-1 text-xs bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
                >
                  Delete
                </button>
                {timeSheet.status === 'pending' && (
                  <>
                    <button
                      onClick={() => onApprove(timeSheet)}
                      className="px-3 py-1 text-xs bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors font-medium"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => onReject(timeSheet)}
                      className="px-3 py-1 text-xs bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition-colors font-medium"
                    >
                      Reject
                    </button>
                  </>
                )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimeSheetList; 