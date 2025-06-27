import React from 'react';
// import { formatDate } from '../../utils/formatUtils';
// import TimeSheets from "./pages/TimeSheets";
import ConfirmationModal from '../common/ConfirmationModal';

const TimeSheetList = ({ timeSheets, onView, onEdit, onDelete, onApprove, onReject }) => {
  const [deleteId, setDeleteId] = React.useState(null);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (deleteId) onDelete(deleteId);
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

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
    <div className="overflow-x-auto">
      <table className="w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider min-w-[150px]">Employee</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider min-w-[100px]">Date</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider min-w-[120px]">Time</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider min-w-[100px]">Total Hours</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider min-w-[100px]">Status</th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider min-w-[280px]">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {timeSheets?.map((timeSheet, index) => (
            <tr key={timeSheet.id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
              <td className="px-4 py-4">
                <div className="flex items-center">
                  {/* <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm mr-3">
                    {timeSheet.employeeName?.split(' ').map(n => n[0]).join('') || 'ID'}
                  </div> */}
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {timeSheet.employeeName || `Employee ID: ${timeSheet.employeeId}`}
                    </div>
                    <div className="text-xs text-gray-500">ID: {timeSheet.employeeId}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="text-sm text-gray-900">{new Date(timeSheet.date).toLocaleDateString()}</div>
              </td>
              <td className="px-4 py-4">
                <div className="text-sm font-medium text-gray-900">
                  {timeSheet.startTime} - {timeSheet.endTime}
                </div>
                <div className="text-xs text-gray-500">
                  Break: {timeSheet.breakDuration} min
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="text-sm font-bold text-indigo-600">
                  {calculateTotalHours(timeSheet.startTime, timeSheet.endTime, timeSheet.breakDuration)}
                </div>
              </td>
              <td className="px-4 py-4">
                <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${
                  timeSheet.status === 'approved'
                    ? 'bg-green-100 text-green-800 border border-green-200'
                    : timeSheet.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                  {timeSheet.status?.charAt(0).toUpperCase() + timeSheet.status?.slice(1)}
                </span>
              </td>
              <td className="px-4 py-4 text-right">
                <div className="flex justify-end space-x-1">
                  <button
                    onClick={() => onView(timeSheet)}
                    className="px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors font-medium"
                    title="View Details"
                  >
                    View
                  </button>
                  <button
                    onClick={() => onEdit(timeSheet)}
                    className="px-2 py-1 text-xs bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100 transition-colors font-medium"
                    title="Edit Timesheet"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(timeSheet.id)}
                    className="px-2 py-1 text-xs bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors font-medium"
                    title="Delete Timesheet"
                  >
                    Delete
                  </button>
                  {timeSheet.status === 'pending' && (
                    <>
                      <button
                        onClick={() => onApprove(timeSheet)}
                        className="px-2 py-1 text-xs bg-green-50 text-green-600 rounded-md hover:bg-green-100 transition-colors font-medium"
                        title="Approve Timesheet"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => onReject(timeSheet)}
                        className="px-2 py-1 text-xs bg-orange-50 text-orange-600 rounded-md hover:bg-orange-100 transition-colors font-medium"
                        title="Reject Timesheet"
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
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        confirmText="Delete"
        confirmButtonVariant="danger"
      >
        Are you sure you want to delete this timesheet entry? This action cannot be undone.
      </ConfirmationModal>
    </div>
  );
};

export default TimeSheetList; 