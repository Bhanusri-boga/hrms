import React from 'react';
import { useForm } from '../../hooks/useForm';
import Modal from '../common/Modal';
import FormInput from '../common/FormInput';
import FormSelect from '../common/FormSelect';
import Form3D from '../three/Form3D';
import GlassCard from '../common/GlassCard';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { EqualStencilFunc } from 'three';

const TimeSheetForm = ({ timeSheet, onSubmit, onClose }) => {
  const { values, errors, handleChange, handleBlur, validateForm } = useForm(
    {
      employeeId: timeSheet?.employeeId || '',
      date: timeSheet?.date || '',
      startTime: timeSheet?.startTime || '',
      endTime: timeSheet?.endTime || '',
      breakDuration: timeSheet?.breakDuration || '60',
      description: timeSheet?.description || '',
      status: timeSheet?.status || 'pending'
    },
    {
      employeeId: { required: true },
      date: { required: true },
      startTime: { required: true },
      endTime: { required: true },
      breakDuration: { required: true, min: 0 }
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(timeSheet?.id, {
        ...values,
        breakDuration: Number(values.breakDuration)
      });
    }
  };

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' }
  ];

  return (
    <Modal
      isOpen={true}
      title={timeSheet ? 'Edit Time Sheet' : 'Add Time Sheet'}
      onClose={onClose}
      className="glass-modal"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <GlassCard className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Employee ID"
              name="employeeId"
              type="number"
              value={values.employeeId}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.employeeId}
              required
              className="input-3d"
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
              className="input-3d"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <FormInput
              label="Start Time"
              name="startTime"
              type="time"
              value={values.startTime}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.startTime}
              required
              className="input-3d"
            />

            <FormInput
              label="End Time"
              name="endTime"
              type="time"
              value={values.endTime}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.endTime}
              required
              className="input-3d"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <FormInput
              label="Break Duration (minutes)"
              name="breakDuration"
              type="number"
              min="0"
              step="15"
              value={values.breakDuration}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.breakDuration}
              required
              className="input-3d"
            />
            <FormSelect
              label="Status"
              name="status"
              value={values.status}
              onChange={handleChange}
              options={statusOptions}
              className="input-3d"
            />
          </div>

          <div className="mt-6">
            <FormInput
              label="Description"
              name="description"
              type="textarea"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.description}
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
              {timeSheet ? 'Update' : 'Create'}
            </motion.button>
          </div>
        </GlassCard>
      </form>
    </Modal>
  );
};

export default TimeSheetForm;