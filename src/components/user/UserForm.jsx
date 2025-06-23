import React from 'react';
import { useForm } from '../../hooks/useForm';
import Modal from '../common/Modal';
import FormInput from '../common/FormInput';
import FormSelect from '../common/FormSelect';
import Form3D from '../three/Form3D';
import GlassCard from '../common/GlassCard';
import { motion } from 'framer-motion';

const UserForm = ({ user, roles, departments, onSubmit, onClose }) => {
  const { values, errors, handleChange, handleBlur, validateForm } = useForm(
    {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      roleId: user?.roleId || '',
      departmentId: user?.departmentId || '',
      address: user?.address || '',
      password: '',
      confirmPassword: ''
    },
    {
      firstName: { required: true },
      lastName: { required: true },
      email: { required: true, email: true },
      phone: { required: true },
      roleId: { required: true },
      departmentId: { required: true },
      address: { required: true },
      password: { required: !user, minLength: 6 },
      confirmPassword: {
        required: !user,
        minLength: 6,
        match: { field: 'password', message: 'Passwords do not match' }
      }
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = { ...values };
      if (user && !formData.password) {
        delete formData.password;
        delete formData.confirmPassword;
      }
      onSubmit(user?.id, formData);
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
              label="First Name"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.firstName}
              required
              className="input-3d"
            />

            <FormInput
              label="Last Name"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.lastName}
              required
              className="input-3d"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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

            <FormInput
              label="Phone"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.phone}
              className="input-3d"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <FormSelect
              label="Role"
              name="roleId"
              value={values.roleId}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.roleId}
              options={roles.map(role => ({
                value: role.id,
                label: role.name
              }))}
              required
              className="input-3d"
            />

            <FormSelect
              label="Department"
              name="departmentId"
              value={values.departmentId}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.departmentId}
              options={departments.map(dept => ({
                value: dept.id,
                label: dept.name
              }))}
              required
              className="input-3d"
            />
          </div>

          <div className="mt-6">
            <FormInput
              label="Address"
              name="address"
              type="textarea"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.address}
              className="input-3d h-24"
            />
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <motion.button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              className="btn-primary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {user ? 'Update' : 'Create'}
            </motion.button>
          </div>
        </GlassCard>
      </Form3D>
    </Modal>
  );
};

export default UserForm;