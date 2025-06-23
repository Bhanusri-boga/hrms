import React from 'react';
import { useForm } from '../../hooks/useForm';
import Modal from '../common/Modal';
import FormInput from '../common/FormInput';
import FormSelect from '../common/FormSelect';

const EmployeeForm = ({ employee, onSubmit, onClose }) => {
  const { values, errors, handleChange, handleBlur, handleSubmit } = useForm({
    initialValues: {
      name: employee?.name || '',
      email: employee?.email || '',
      phone: employee?.phone || '',
      position: employee?.position || '',
      department: employee?.department || '',
      joinDate: employee?.joinDate || '',
      salary: employee?.salary || '',
      status: employee?.status || 'active'
    },
    validationRules: {
      name: { required: true, minLength: 2 },
      email: { required: true, email: true },
      phone: { required: true, phone: true },
      position: { required: true },
      department: { required: true },
      joinDate: { required: true },
      salary: { required: true }
    },
    onSubmit: (formValues) => {
      onSubmit(formValues);
    }
  });

  const departments = [
    'IT',
    'HR',
    'Finance',
    'Marketing',
    'Operations',
    'Sales',
    'Research'
  ];

  const positions = [
    'Manager',
    'Developer',
    'Designer',
    'Analyst',
    'Coordinator',
    'Specialist',
    'Assistant'
  ];

  return (
    <Modal
      isOpen={true}
      title={employee ? 'Edit Employee' : 'Add Employee'}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Name"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.name}
          required
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
        />

        <FormInput
          label="Phone"
          name="phone"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.phone}
          required
        />

        <FormSelect
          label="Department"
          name="department"
          value={values.department}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.department}
          options={departments}
          required
        />

        <FormSelect
          label="Position"
          name="position"
          value={values.position}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.position}
          options={positions}
          required
        />

        <FormInput
          label="Join Date"
          name="joinDate"
          type="date"
          value={values.joinDate}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.joinDate}
          required
        />

        <FormInput
          label="Salary"
          name="salary"
          type="number"
          value={values.salary}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.salary}
          required
        />

        <FormSelect
          label="Status"
          name="status"
          value={values.status}
          onChange={handleChange}
          options={['active', 'inactive', 'on_leave']}
        />

        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {employee ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EmployeeForm; 