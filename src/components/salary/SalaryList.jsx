import { formatDate, formatCurrency } from '../../utils/formatUtils';
import React from 'react';
import ConfirmationModal from '../common/ConfirmationModal';

const SalaryList = ({ salaries, onView, onEdit, onDelete, onApprove, onReject }) => {
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
      <table className="w-full min-w-[900px] divide-y divide-gray-200 text-sm">
        <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
          <tr>
            <th className="px-2 py-2 text-left font-medium text-gray-600 uppercase tracking-wider min-w-[80px]">Emp ID</th>
            <th className="px-2 py-2 text-left font-medium text-gray-600 uppercase tracking-wider min-w-[100px]">Pay Period</th>
            <th className="px-2 py-2 text-left font-medium text-gray-600 uppercase tracking-wider min-w-[80px]">Basic</th>
            <th className="px-2 py-2 text-left font-medium text-gray-600 uppercase tracking-wider min-w-[80px]">Allowances</th>
            <th className="px-2 py-2 text-left font-medium text-gray-600 uppercase tracking-wider min-w-[80px]">Deductions</th>
            <th className="px-2 py-2 text-left font-medium text-gray-600 uppercase tracking-wider min-w-[80px]">Net</th>
            <th className="px-2 py-2 text-left font-medium text-gray-600 uppercase tracking-wider min-w-[100px]">Payment</th>
            <th className="px-2 py-2 text-left font-medium text-gray-600 uppercase tracking-wider min-w-[80px]">Status</th>
            <th className="px-2 py-2 text-right font-medium text-gray-600 uppercase tracking-wider min-w-[180px]">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {salaries?.map((salary, index) => {
            const netSalary = (salary.basicSalary || 0) + (salary.allowances || 0) - (salary.deductions || 0);
            return (
              <tr key={salary.id || salary.employeeId} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                <td className="px-2 py-2">{salary.employeeId}</td>
                <td className="px-2 py-2">{formatDate(salary.payPeriodStart)} - {formatDate(salary.payPeriodEnd)}</td>
                <td className="px-2 py-2">{formatCurrency(salary.basicSalary)}</td>
                <td className="px-2 py-2">{formatCurrency(salary.allowances)}</td>
                <td className="px-2 py-2">{formatCurrency(salary.deductions)}</td>
                <td className="px-2 py-2 font-medium">{formatCurrency(netSalary)}</td>
                <td className="px-2 py-2">{formatDate(salary.paymentDate)}</td>
                <td className="px-2 py-2">
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                    salary.status === 'approved'
                      ? 'bg-green-100 text-green-800 border border-green-200'
                      : salary.status === 'rejected'
                      ? 'bg-red-100 text-red-800 border border-red-200'
                      : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                  }`}>
                    {salary.status ? salary.status.charAt(0).toUpperCase() + salary.status.slice(1) : 'Pending'}
                  </span>
                </td>
                <td className="px-2 py-2 text-right">
                  <div className="flex justify-end space-x-1">
                    <button onClick={() => onView(salary)} className="px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded hover:bg-blue-100 font-medium">View</button>
                    <button onClick={() => onEdit(salary)} className="px-2 py-1 text-xs bg-indigo-50 text-indigo-600 rounded hover:bg-indigo-100 font-medium">Edit</button>
                    <button onClick={() => handleDeleteClick(salary.id || salary.employeeId)} className="px-2 py-1 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100 font-medium">Delete</button>
                    <button onClick={() => onApprove && onApprove(salary)} className="px-2 py-1 text-xs bg-green-50 text-green-600 rounded hover:bg-green-100 font-medium">Approve</button>
                    <button onClick={() => onReject && onReject(salary)} className="px-2 py-1 text-xs bg-yellow-50 text-yellow-600 rounded hover:bg-yellow-100 font-medium">Reject</button>
                  </div>
                </td>
              </tr>
            );
          })}
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
        Are you sure you want to delete this salary record? This action cannot be undone.
      </ConfirmationModal>
    </div>
  );
};

export default SalaryList;