import React from 'react';
import { formatDate, formatPhoneNumber, formatCurrency } from '../../utils/formatUtils';
import Modal from '../common/Modal';

const EmployeeDetail = ({ employee, onClose, onEdit }) => {
  if (!employee) return null;

  return (
    <Modal title="Employee Details" onClose={onClose} isOpen={true}>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <img
            src={employee.avatar || 'https://via.placeholder.com/100'}
            alt={employee.name}
            className="h-24 w-24 rounded-full"
          />
          <div>
            <h3 className="text-lg font-medium text-gray-900">{employee.name}</h3>
            <p className="text-sm text-gray-500">{employee.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Position</h4>
            <p className="mt-1 text-sm text-gray-900">{employee.position}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">Department</h4>
            <p className="mt-1 text-sm text-gray-900">{employee.department}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">Phone</h4>
            <p className="mt-1 text-sm text-gray-900">
              {formatPhoneNumber(employee.phone)}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">Join Date</h4>
            <p className="mt-1 text-sm text-gray-900">
              {formatDate(employee.joinDate)}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">Salary</h4>
            <p className="mt-1 text-sm text-gray-900">
              {formatCurrency(employee.salary)}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">Status</h4>
            <p className="mt-1 text-sm text-gray-900">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  employee.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : employee.status === 'inactive'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {employee.status}
              </span>
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Additional Information</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h5 className="text-xs font-medium text-gray-500">Emergency Contact</h5>
              <p className="mt-1 text-sm text-gray-900">
                {employee.emergencyContact?.name || 'Not specified'}
              </p>
              <p className="text-sm text-gray-500">
                {employee.emergencyContact?.phone || ''}
              </p>
            </div>

            <div>
              <h5 className="text-xs font-medium text-gray-500">Address</h5>
              <p className="mt-1 text-sm text-gray-900">
                {employee.address || 'Not specified'}
              </p>
            </div>
          </div>
        </div>

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

export default EmployeeDetail; 