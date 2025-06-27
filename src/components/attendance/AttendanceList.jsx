import React from 'react';
import { formatDate, formatDateTime } from '../../utils/formatUtils';
import ConfirmationModal from '../common/ConfirmationModal';

const AttendanceList = ({ attendance, onEdit, onView, onDelete }) => {
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

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Employee
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              In Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Out Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Note
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {attendance?.map((record) => (
            <tr key={record.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  {/* <div className="flex-shrink-0 h-10 w-10">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={record.employee?.avatar || 'https://via.placeholder.com/40'}
                      alt={record.employee?.name || 'Employee'}
                    />
                  </div> */}
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {record.employee?.name || '-'}
                    </div>
                    <div className="text-sm text-gray-500">
                      {record.employee?.position || '-'}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {formatDate(record.date)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {record.inTime ? formatDateTime(record.inTime) : '-'}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {record.outTime ? formatDateTime(record.outTime) : '-'}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    record.status === 'PRESENT'
                      ? 'bg-green-100 text-green-800'
                      : record.status === 'ABSENT'
                      ? 'bg-red-100 text-red-800'
                      : record.status === 'LATE'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {record.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {record.note || '-'}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                {onView && (
                  <button
                    onClick={() => onView(record)}
                    className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium mr-2"
                  >
                    View
                  </button>
                )}
                {onEdit && (
                  <button
                    onClick={() => onEdit(record)}
                    className="px-3 py-1 text-xs bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors font-medium mr-2"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDeleteClick(record.id)}
                  className="px-3 py-1 text-xs bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
                >
                  Delete
                </button>
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
        Are you sure you want to delete this attendance record? This action cannot be undone.
      </ConfirmationModal>
    </div>
  );
};

export default AttendanceList; 