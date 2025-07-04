import React, { useEffect, useState } from 'react';
import { useForm } from '../../hooks/useForm';
import Modal from '../common/Modal';
import FormInput from '../common/FormInput';
import FormSelect from '../common/FormSelect';
import Form3D from '../three/Form3D';
import GlassCard from '../common/GlassCard';
import { userApi } from '../../api/apiService';

const UserForm = ({ user, onSubmit, onClose }) => {
  const [editValues, setEditValues] = useState(null);
  const allRoles = ['ADMIN', 'HR', 'MANAGER', 'EMPLOYEE'];
  const allUserLevels = ['STANDARD', 'PREMIUM', 'ADMIN'];

  const { values, errors, handleChange, handleBlur, validateForm } = useForm(
    editValues || {
      username: user?.username || '',
      email: user?.email || '',
      password: '',
      userLevel: user?.userLevel || 'STANDARD',
      userRoles: user?.userRoles || ['EMPLOYEE'],
      role: user?.role || 'EMPLOYEE',
    },
    {
      username: { required: true },
      email: { required: true, email: true },
      password: { required: !user, minLength: 6 },
      userLevel: { required: true },
      userRoles: { required: true },
      role: { required: true },
    }
  );

  // Fetch user by email if editing
  useEffect(() => {
    if (user && user.email) {
      userApi.getByEmail(user.email)
        .then(data => {
          setEditValues({
            username: data.username || '',
            email: data.email || '',
            password: '',
            userLevel: data.userLevel || 'STANDARD',
            userRoles: data.userRoles || ['EMPLOYEE'],
            role: data.role || 'EMPLOYEE',
          });
        });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = { ...values };
      // Ensure userRoles is always an array
      if (!Array.isArray(formData.userRoles)) {
        formData.userRoles = [formData.userRoles];
      }
      if (user && user.email) {
        // Update existing user by email
        await userApi.updateByEmail(user.email, formData);
        onSubmit && onSubmit(user.email, formData);
      } else {
        // Create new user
        await userApi.create(formData);
        onSubmit && onSubmit(null, formData);
      }
    }
  };

  return (
    <Modal
      title={user ? 'Edit User' : 'Add User'}
      onClose={onClose}
      className="glass-modal"
    >
      <Form3D onSubmit={handleSubmit} className="space-y-6">
        <GlassCard className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Username"
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.username}
              required
              className="input-3d"
            />
            <FormInput
              label="Email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              required
              className="input-3d"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <FormInput
              label="Password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password}
              required={!user}
              className="input-3d"
            />
            <FormSelect
              label="User Level"
              name="userLevel"
              value={values.userLevel}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.userLevel}
              options={allUserLevels.map(level => ({ value: level, label: level }))}
              required
              className="input-3d"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <FormSelect
              label="Role"
              name="role"
              value={values.role}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.role}
              options={allRoles.map(role => ({ value: role, label: role }))}
              required
              className="input-3d"
            />
            <FormSelect
              label="User Roles"
              name="userRoles"
              value={values.userRoles}
              onChange={e => handleChange({
                target: {
                  name: 'userRoles',
                  value: Array.from(e.target.selectedOptions, option => option.value)
                }
              })}
              onBlur={handleBlur}
              error={errors.userRoles}
              options={allRoles.map(role => ({ value: role, label: role }))}
              required
              className="input-3d"
              multiple
            />
          </div>
          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              {user ? 'Update' : 'Create'}
            </button>
          </div>
        </GlassCard>
      </Form3D>
    </Modal>
  );
};

export default UserForm;