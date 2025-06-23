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

const TimeSheetForm = ({ timeSheet, projects, onSubmit, onClose }) => {
  const { values, errors, handleChange, handleBlur, validateForm } = useForm(
    {
      projectId: timeSheet?.projectId || '',
      task: timeSheet?.task || '',
      date: timeSheet?.date || '',
      hours: timeSheet?.hours || '',
      description: timeSheet?.description || '',
      status: timeSheet?.status || 'pending'
    },
    {
      projectId: { required: true },
      task: { required: true },
      date: { required: true },
      hours: { required: true, min: 0.5, max: 24 }
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(timeSheet?.id, values);
    }
  };

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' }
  ];

  return (
    <Modal
      title={timeSheet ? 'Edit Time Sheet' : 'Add Time Sheet'}
      onClose={onClose}
      className="glass-modal"
    >
      <Form3D onSubmit={handleSubmit} className="space-y-6">
        <GlassCard className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormSelect
              label="Project"
              name="projectId"
              value={values.projectId}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.projectId}
              options={projects.map(project => ({
                value: project.id,
                label: project.name
              }))}
              required
              className="input-3d"
            />

            <FormInput
              label="Task"
              name="task"
              value={values.task}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.task}
              required
              className="input-3d"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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

            <FormInput
              label="Hours"
              name="hours"
              type="number"
              min="0.5"
              max="24"
              step="0.5"
              value={values.hours}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.hours}
              required
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

          <div className="mt-6">
            <FormSelect
              label="Status"
              name="status"
              value={values.status}
              onChange={handleChange}
              options={statusOptions}
              className="input-3d"
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
      </Form3D>
    </Modal>
  );
};

export default TimeSheetForm;