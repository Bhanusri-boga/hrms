import React from 'react';
import { formatDate, formatCurrency } from '../../utils/formatUtils';
import Modal from '../common/Modal';

const SalaryDetail = ({ salary, onClose, onEdit }) => {
  if (!salary) return null;

  return (
    <Modal title="Salary Details" onClose={onClose}>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <img
            src={salary.employee.avatar || 'https://via.placeholder.com/100'}
            alt={salary.employee.name}
            className="h-24 w-24 rounded-full"
          />
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              {salary.employee.name}
            </h3>
            <p className="text-sm text-gray-500">{salary.employee.position}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Month</h4>
            <p className="mt-1 text-sm text-gray-900">
              {formatDate(salary.month, 'MMMM yyyy')}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">Status</h4>
            <p className="mt-1">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  salary.status === 'paid'
                    ? 'bg-green-100 text-green-800'
                    : salary.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {salary.status}
              </span>
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-sm font-medium text-gray-500 mb-4">Salary Breakdown</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Basic Salary</span>
              <span className="text-sm font-medium text-gray-900">
                {formatCurrency(salary.basicSalary)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Allowances</span>
              <span className="text-sm font-medium text-gray-900">
                {formatCurrency(salary.allowances)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Deductions</span>
              <span className="text-sm font-medium text-red-600">
                -{formatCurrency(salary.deductions)}
              </span>
            </div>

            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-900">Net Salary</span>
                <span className="text-sm font-medium text-gray-900">
                  {formatCurrency(salary.netSalary)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {salary.notes && (
          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Notes</h4>
            <p className="text-sm text-gray-600">{salary.notes}</p>
          </div>
        )}

        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
          <button
            type="button"
            onClick={onEdit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Edit
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SalaryDetail; 