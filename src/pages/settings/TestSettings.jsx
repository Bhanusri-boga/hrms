import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../context/TestNotificationContext';

const TestSettings = () => {
  const { user } = useAuth();
  const { addNotification } = useNotification();
  const [activeTab, setActiveTab] = useState('account');
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true,
    newAnnouncements: true,
    taskReminders: true,
    systemUpdates: false
  });

  const [themeSettings, setThemeSettings] = useState({
    theme: 'light',
    fontSize: 'medium',
    compactMode: false
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm({
      ...passwordForm,
      [name]: value
    });
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings({
      ...notificationSettings,
      [name]: checked
    });
  };

  const handleThemeChange = (e) => {
    const { name, value, type, checked } = e.target;
    setThemeSettings({
      ...themeSettings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      addNotification({
        type: 'error',
        message: 'New passwords do not match'
      });
      return;
    }
    
    try {
      addNotification({
        type: 'success',
        message: 'Password updated successfully'
      });
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      addNotification({
        type: 'error',
        message: error.message || 'Failed to update password'
      });
    }
  };

  const handleNotificationSubmit = (e) => {
    e.preventDefault();
    // This would save notification settings to the backend
    addNotification({
      type: 'success',
      message: 'Notification settings updated successfully'
    });
  };

  const handleThemeSubmit = (e) => {
    e.preventDefault();
    // This would save theme settings to the backend
    addNotification({
      type: 'success',
      message: 'Display settings updated successfully'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/4 bg-gray-50 p-6 border-r border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Settings</h2>
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('account')}
                className={`w-full text-left px-4 py-2 rounded ${
                  activeTab === 'account' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Account Settings
              </button>
              <button
                onClick={() => setActiveTab('password')}
                className={`w-full text-left px-4 py-2 rounded ${
                  activeTab === 'password' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Change Password
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full text-left px-4 py-2 rounded ${
                  activeTab === 'notifications' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Notification Settings
              </button>
              <button
                onClick={() => setActiveTab('display')}
                className={`w-full text-left px-4 py-2 rounded ${
                  activeTab === 'display' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Display Settings
              </button>
            </nav>
          </div>
          
          <div className="md:w-3/4 p-6">
            {activeTab === 'account' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
                <div className="mb-6">
                  <p className="text-gray-700 mb-2">
                    <span className="font-medium">Email:</span> {user?.email || 'john.doe@example.com'}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <span className="font-medium">Name:</span> {user?.name || 'John Doe'}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Account Type:</span> {user?.role || 'Employee'}
                  </p>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-md font-medium text-gray-900 mb-2">Danger Zone</h4>
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    onClick={() => {
                      addNotification({
                        type: 'info',
                        message: 'Account deletion would be implemented here'
                      });
                    }}
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'password' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
                <form onSubmit={handlePasswordSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordForm.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordForm.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordForm.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Update Password
                  </button>
                </form>
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Settings</h3>
                <form onSubmit={handleNotificationSubmit}>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="emailNotifications"
                        name="emailNotifications"
                        checked={notificationSettings.emailNotifications}
                        onChange={handleNotificationChange}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                      <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-700">
                        Email Notifications
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="pushNotifications"
                        name="pushNotifications"
                        checked={notificationSettings.pushNotifications}
                        onChange={handleNotificationChange}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                      <label htmlFor="pushNotifications" className="ml-2 block text-sm text-gray-700">
                        Push Notifications
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="weeklyDigest"
                        name="weeklyDigest"
                        checked={notificationSettings.weeklyDigest}
                        onChange={handleNotificationChange}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                      <label htmlFor="weeklyDigest" className="ml-2 block text-sm text-gray-700">
                        Weekly Digest
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="newAnnouncements"
                        name="newAnnouncements"
                        checked={notificationSettings.newAnnouncements}
                        onChange={handleNotificationChange}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                      <label htmlFor="newAnnouncements" className="ml-2 block text-sm text-gray-700">
                        New Announcements
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="taskReminders"
                        name="taskReminders"
                        checked={notificationSettings.taskReminders}
                        onChange={handleNotificationChange}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                      <label htmlFor="taskReminders" className="ml-2 block text-sm text-gray-700">
                        Task Reminders
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="systemUpdates"
                        name="systemUpdates"
                        checked={notificationSettings.systemUpdates}
                        onChange={handleNotificationChange}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                      <label htmlFor="systemUpdates" className="ml-2 block text-sm text-gray-700">
                        System Updates
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Save Notification Settings
                  </button>
                </form>
              </div>
            )}
            
            {activeTab === 'display' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Display Settings</h3>
                <form onSubmit={handleThemeSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Theme
                    </label>
                    <select
                      name="theme"
                      value={themeSettings.theme}
                      onChange={handleThemeChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="system">System Default</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Font Size
                    </label>
                    <select
                      name="fontSize"
                      value={themeSettings.fontSize}
                      onChange={handleThemeChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    >
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </select>
                  </div>
                  <div className="mb-6">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="compactMode"
                        name="compactMode"
                        checked={themeSettings.compactMode}
                        onChange={handleThemeChange}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                      <label htmlFor="compactMode" className="ml-2 block text-sm text-gray-700">
                        Compact Mode
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Save Display Settings
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestSettings;