import React from 'react';
import { useForm } from '../../hooks/useForm';
import Modal from '../common/Modal';
import FormInput from '../common/FormInput';
import FormSelect from '../common/FormSelect';

const AttendanceForm = ({ attendance, employees, onSubmit, onClose, readOnly }) => {
  const { values, errors, handleChange, handleBlur, validateForm } = useForm(
    {
      employeeId: attendance?.employeeId || '',
      inTime: attendance?.inTime || '',
      outTime: attendance?.outTime || '',
      date: attendance?.date || '',
      status: attendance?.status || 'PRESENT',
      note: attendance?.note || ''
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
    { value: 'PRESENT', label: 'Present' },
    { value: 'ABSENT', label: 'Absent' },
    { value: 'LATE', label: 'Late' },
    { value: 'HALF_DAY', label: 'Half Day' },
    { value: 'LEAVE', label: 'On Leave' }
  ];

  return (
    <Modal
      isOpen={true}
      title={attendance ? (readOnly ? 'View Attendance' : 'Edit Attendance') : 'Add Attendance'}
      onClose={onClose}
      size="md"
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
          disabled={readOnly}
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
          disabled={readOnly}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="In Time"
            name="inTime"
            type="datetime-local"
            value={values.inTime}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.inTime}
            disabled={readOnly}
          />

          <FormInput
            label="Out Time"
            name="outTime"
            type="datetime-local"
            value={values.outTime}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.outTime}
            disabled={readOnly}
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
          disabled={readOnly}
        />

        <FormInput
          label="Note"
          name="note"
          type="textarea"
          value={values.note}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.note}
          disabled={readOnly}
        />

        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            {readOnly ? 'Close' : 'Cancel'}
          </button>
          {!readOnly && (
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {attendance ? 'Update' : 'Create'}
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default AttendanceForm; 