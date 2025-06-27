import React from 'react';
import { formatDate } from '../../utils/formatUtils';
import ConfirmationModal from '../common/ConfirmationModal';

const TravelList = ({ travels, onView, onEdit, onDelete, onApprove, onReject }) => {
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
    <div className="overflow-x-auto">
      <table className="w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Employee
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Purpose
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Destination
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Dates
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider min-w-[120px]">
              Status
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider min-w-[210px]">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {travels?.map((travel, index) => (
            <tr
              key={travel.id}
              className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}
            >
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    {/* <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={'https://via.placeholder.com/40'}
                        alt={travel.employeeName}
                      />
                    </div> */}
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {travel.employeeName}
                    </div>
                    <div className="text-sm text-gray-500">
                      ID: {travel.employeeId}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{travel.purpose}</div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{travel.destination}</div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {formatDate(travel.startDate)} - {formatDate(travel.endDate)}
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    travel.status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : travel.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : travel.status === 'rejected'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800 border-gray-200'
                  }`}
                >
                  {travel.status.charAt(0).toUpperCase() + travel.status.slice(1)}
                </span>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-right">
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => onView(travel)}
                    className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                  >
                    View
                  </button>
                  <button
                    onClick={() => onEdit(travel)}
                    className="px-3 py-1 text-xs bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(travel.id)}
                    className="px-3 py-1 text-xs bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
                  >
                    Delete
                  </button>
                  {travel.status === 'pending' && (
                    <>
                      <button
                        onClick={() => onApprove(travel)}
                        className="px-3 py-1 text-xs bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors font-medium"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => onReject(travel)}
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
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        confirmText="Delete"
        confirmButtonVariant="danger"
      >
        Are you sure you want to delete this travel request? This action cannot be undone.
      </ConfirmationModal>
    </div>
  );
};

export default TravelList;