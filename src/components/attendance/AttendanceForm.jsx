import React from 'react';
import { useForm } from '../../hooks/useForm';
import Modal from '../common/Modal';
import FormInput from '../common/FormInput';
import FormSelect from '../common/FormSelect';

const AttendanceForm = ({ attendance, employees, onSubmit, onClose }) => {
  const { values, errors, handleChange, handleBlur, validateForm } = useForm(
    {
      employeeId: attendance?.employeeId || '',
      date: attendance?.date || '',
      checkIn: attendance?.checkIn || '',
      checkOut: attendance?.checkOut || '',
      status: attendance?.status || 'present',
      notes: attendance?.notes || ''
    },
    {
      employeeId: { required: true },
      date: { required: true },
      status: { required: true }
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(attendance?.id, values);
    }
  };

  const statusOptions = [
    { value: 'present', label: 'Present' },
    { value: 'absent', label: 'Absent' },
    { value: 'late', label: 'Late' },
    { value: 'half_day', label: 'Half Day' },
    { value: 'leave', label: 'On Leave' }
  ];

  return (
    <Modal
      title={attendance ? 'Edit Attendance' : 'Add Attendance'}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormSelect
          label="Employee"
          name="employeeId"
          value={values.employeeId}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.employeeId}
          options={employees.map(emp => ({
            value: emp.id,
            label: emp.name
          }))}
          required
        />

        <FormInput
          label="Date"
          name="date"
          type="date"
          value={values.date}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.date}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="Check In"
            name="checkIn"
            type="datetime-local"
            value={values.checkIn}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.checkIn}
          />

          <FormInput
            label="Check Out"
            name="checkOut"
            type="datetime-local"
            value={values.checkOut}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.checkOut}
          />
        </div>

        <FormSelect
          label="Status"
          name="status"
          value={values.status}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.status}
          options={statusOptions}
          required
        />

        <FormInput
          label="Notes"
          name="notes"
          type="textarea"
          value={values.notes}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.notes}
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
            {attendance ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AttendanceForm; 