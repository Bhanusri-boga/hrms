import React, { useState } from 'react';
import { formatDate, formatCurrency } from '../../utils/formatUtils';

const SalaryDetail = ({ salary, onClose, onEdit, onSave, onApprove, onReject, isEditMode }) => {
  const [form, setForm] = useState(salary);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(form);
  };

  if (!salary) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative flex flex-col max-h-[90vh]">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-lg font-bold mb-4">{isEditMode ? 'Edit Salary' : 'Salary Details'}</h2>
        <div className="flex-1 overflow-y-auto pr-2">
          <div className="mb-2">
            <span className="font-semibold">Employee ID:</span>{' '}
            {isEditMode ? (
              <input name="employeeId" value={form.employeeId} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
            ) : (
              salary.employeeId
            )}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Pay Period:</span>{' '}
            {isEditMode ? (
              <>
                <input type="date" name="payPeriodStart" value={form.payPeriodStart} onChange={handleChange} className="border rounded px-2 py-1 mr-2" />
                to
                <input type="date" name="payPeriodEnd" value={form.payPeriodEnd} onChange={handleChange} className="border rounded px-2 py-1 ml-2" />
              </>
            ) : (
              <>{formatDate(salary.payPeriodStart)} - {formatDate(salary.payPeriodEnd)}</>
            )}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Basic Salary:</span>{' '}
            {isEditMode ? (
              <input name="basicSalary" type="number" value={form.basicSalary} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
            ) : (
              formatCurrency(salary.basicSalary)
            )}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Allowances:</span>{' '}
            {isEditMode ? (
              <input name="allowances" type="number" value={form.allowances} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
            ) : (
              formatCurrency(salary.allowances)
            )}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Deductions:</span>{' '}
            {isEditMode ? (
              <input name="deductions" type="number" value={form.deductions} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
            ) : (
              formatCurrency(salary.deductions)
            )}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Net Salary:</span>{' '}
            {formatCurrency((form.basicSalary || 0) + (form.allowances || 0) - (form.deductions || 0))}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Payment Date:</span>{' '}
            {isEditMode ? (
              <input name="paymentDate" type="date" value={form.paymentDate} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
            ) : (
              formatDate(salary.paymentDate)
            )}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Status:</span>{' '}
            <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${
              salary.status === 'approved'
                ? 'bg-green-100 text-green-800 border border-green-200'
                : salary.status === 'rejected'
                ? 'bg-red-100 text-red-800 border border-red-200'
                : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
            }`}>
              {salary.status ? salary.status.charAt(0).toUpperCase() + salary.status.slice(1) : 'Pending'}
            </span>
          </div>
          {isEditMode ? (
            <div className="mb-2">
              <span className="font-semibold">Comments:</span>{' '}
              <input name="comments" value={form.comments} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
            </div>
          ) : (
            salary.comments && (
              <div className="mb-2">
                <span className="font-semibold">Comments:</span>{' '}
                {salary.comments}
              </div>
            )
          )}
        </div>
        <div className="flex justify-end mt-4 space-x-2">
          {!isEditMode && (
            <>
              <button
                className="px-3 py-1 text-xs bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors font-medium"
                onClick={() => onApprove && onApprove(salary)}
              >
                Approve
              </button>
              <button
                className="px-3 py-1 text-xs bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition-colors font-medium"
                onClick={() => onReject && onReject(salary)}
              >
                Reject
              </button>
              <button
                className="px-3 py-1 text-xs bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors font-medium"
                onClick={onEdit}
              >
                Edit
              </button>
            </>
          )}
          {isEditMode && (
            <button
              className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium"
              onClick={handleSave}
            >
              Save
            </button>
          )}
          <button
            className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalaryDetail;