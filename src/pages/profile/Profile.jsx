import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { userApi } from '../../api/apiService';
import { authApi } from '../../api/authApi';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const { addNotification } = useNotification();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: '', username: '', email: '', userLevel: '',
    userRoles: [], status: '', emailVerified: false,
    lastLogin: '', createdAt: '', updatedAt: ''
  });
  const [fetchedUser, setFetchedUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await authApi.getCurrentUser();
        setFetchedUser(data);
        setFormData({ ...data });
      } catch {
        setFormData({ ...user });
      }
    };
    fetchUser();
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare payload as per backend schema
      const payload = {
        username: formData.username,
        email: formData.email,
        password: formData.password, // Only include if you allow password change here
        userLevel: formData.userLevel,
        userRoles: Array.isArray(formData.userRoles) ? formData.userRoles : [formData.userRoles],
        role: formData.role || (Array.isArray(formData.userRoles) ? formData.userRoles[0] : formData.userRoles)
      };
      const updatedUser = await userApi.updateByEmail(formData.email, payload);
      await updateUserProfile(updatedUser);
      setIsEditing(false);
      addNotification({ type: 'success', message: 'Profile updated successfully' });
    } catch (error) {
      addNotification({ type: 'error', message: error.message || 'Failed to update profile' });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (user) setFormData({ ...user });
  };

  const displayUser = fetchedUser || user;
  if (!user) return <div className="text-center text-gray-600">Loading profile...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-3">

          {/* Left Panel */}
          <div className="bg-gradient-to-br from-indigo-100 to-white p-8 border-r">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">{displayUser.username}</h2>
            <p className="text-gray-500 text-sm">{displayUser.email}</p>
            <ul className="mt-4 space-y-1 text-sm text-gray-600">
              <li><strong>ID:</strong> {displayUser.id}</li>
              <li><strong>Level:</strong> {displayUser.userLevel}</li>
              <li><strong>Roles:</strong> {Array.isArray(displayUser.userRoles) ? displayUser.userRoles.join(', ') : displayUser.userRoles}</li>
              <li><strong>Status:</strong> {displayUser.status}</li>
              <li><strong>Email Verified:</strong> {displayUser.emailVerified ? 'Yes' : 'No'}</li>
              <li><strong>Last Login:</strong> {displayUser.lastLogin ? new Date(displayUser.lastLogin).toLocaleString() : 'N/A'}</li>
              <li><strong>Created At:</strong> {displayUser.createdAt ? new Date(displayUser.createdAt).toLocaleString() : 'N/A'}</li>
              <li><strong>Updated At:</strong> {displayUser.updatedAt ? new Date(displayUser.updatedAt).toLocaleString() : 'N/A'}</li>
            </ul>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="mt-6 w-full py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Edit Profile
              </button>
            )}
          </div>

          {/* Right Panel */}
          <div className="col-span-2 p-8">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Edit Your Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700">Username</label>
                    <input
                      type="text" name="username" value={formData.username}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Email</label>
                    <input
                      type="email" name="email" value={formData.email}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">User Level</label>
                    <input
                      type="text" name="userLevel" value={formData.userLevel}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Roles</label>
                    <input
                      type="text" name="userRoles"
                      value={Array.isArray(formData.userRoles) ? formData.userRoles.join(', ') : formData.userRoles}
                      onChange={e => setFormData({ ...formData, userRoles: e.target.value.split(',').map(r => r.trim()) })}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Status</label>
                    <input
                      type="text" name="status" value={formData.status}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox" name="emailVerified" checked={formData.emailVerified}
                      onChange={handleInputChange}
                      className="checkbox"
                    />
                    <label className="text-sm text-gray-700">Email Verified</label>
                  </div>
                </div>
                <div className="flex justify-end space-x-4">
                  <button type="button" onClick={handleCancel} className="btn btn-outline">Cancel</button>
                  <button type="submit" className="btn btn-primary">Save Changes</button>
                </div>
              </form>
            ) : (
              <div className="text-center text-gray-500">
                <p className="mb-2">Click edit to update your profile information.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
