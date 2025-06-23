import React from 'react';
import { formatDate } from '../../utils/formatUtils';
import Modal from '../common/Modal';

const UserDetail = ({ user, onClose, onEdit }) => {
  if (!user) return null;

  return (
    <Modal title="User Details" onClose={onClose}>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <img
            src={user.avatar || 'https://via.placeholder.com/100'}
            alt={user.name}
            className="h-24 w-24 rounded-full"
          />
          <div>
            <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
            <p className="text-sm text-gray-500">@{user.username}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Email</h4>
            <p className="mt-1 text-sm text-gray-900">{user.email}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">Role</h4>
            <p className="mt-1">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  user.role === 'admin'
                    ? 'bg-purple-100 text-purple-800'
                    : user.role === 'manager'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {user.role}
              </span>
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">Status</h4>
            <p className="mt-1">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  user.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : user.status === 'inactive'
                    ? 'bg-gray-100 text-gray-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {user.status}
              </span>
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">Last Login</h4>
            <p className="mt-1 text-sm text-gray-900">
              {user.lastLogin ? formatDate(user.lastLogin) : 'Never'}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-sm font-medium text-gray-500 mb-4">Account Information</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Created At</span>
              <span className="text-sm text-gray-900">
                {formatDate(user.createdAt)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Last Updated</span>
              <span className="text-sm text-gray-900">
                {formatDate(user.updatedAt)}
              </span>
            </div>

            {user.lastPasswordChange && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Last Password Change</span>
                <span className="text-sm text-gray-900">
                  {formatDate(user.lastPasswordChange)}
                </span>
              </div>
            )}
          </div>
        </div>

        {user.permissions && (
          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-sm font-medium text-gray-500 mb-4">Permissions</h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(user.permissions).map(([key, value]) => (
                <div key={key} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={value}
                    readOnly
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </label>
                </div>
              ))}
            </div>
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

export default UserDetail; 