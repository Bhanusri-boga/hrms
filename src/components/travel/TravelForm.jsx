import React from 'react';
import { useForm } from '../../hooks/useForm';
import Modal from '../common/Modal';
import FormInput from '../common/FormInput';
import FormSelect from '../common/FormSelect';

const TravelForm = ({ travel, onSubmit, onClose }) => {
  const { values, errors, handleChange, handleBlur, validateForm } = useForm(
    {
      purpose: travel?.purpose || '',
      destination: travel?.destination || '',
      startDate: travel?.startDate || '',
      endDate: travel?.endDate || '',
      transportMode: travel?.transportMode || '',
      estimatedCost: travel?.estimatedCost || '',
      advanceRequired: travel?.advanceRequired || false,
      advanceAmount: travel?.advanceAmount || '',
      status: travel?.status || 'pending',
      notes: travel?.notes || ''
    },
    {
      purpose: { required: true },
      destination: { required: true },
      startDate: { required: true },
      endDate: { required: true },
      transportMode: { required: true },
      estimatedCost: { required: true, min: 0 }
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(travel?.id, values);
    }
  };

  const transportModes = [
    'Air',
    'Train',
    'Bus',
    'Car',
    'Other'
  ];

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'completed', label: 'Completed' }
  ];

  return (
    <Modal
      title={travel ? 'Edit Travel Request' : 'New Travel Request'}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Purpose"
          name="purpose"
          value={values.purpose}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.purpose}
          required
        />

        <FormInput
          label="Destination"
          name="destination"
          value={values.destination}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.destination}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="Start Date"
            name="startDate"
            type="date"
            value={values.startDate}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.startDate}
            required
          />

          <FormInput
            label="End Date"
            name="endDate"
            type="date"
            value={values.endDate}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.endDate}
            required
          />
        </div>

        <FormSelect
          label="Transport Mode"
          name="transportMode"
          value={values.transportMode}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.transportMode}
          options={transportModes}
          required
        />

        <FormInput
          label="Estimated Cost"
          name="estimatedCost"
          type="number"
          min="0"
          step="0.01"
          value={values.estimatedCost}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.estimatedCost}
          required
        />

        <div className="flex items-center">
          <input
            type="checkbox"
            id="advanceRequired"
            name="advanceRequired"
            checked={values.advanceRequired}
            onChange={(e) => handleChange({
              target: {
                name: 'advanceRequired',
                value: e.target.checked
              }
            })}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="advanceRequired" className="ml-2 block text-sm text-gray-900">
            Advance Required
          </label>
        </div>

        {values.advanceRequired && (
          <FormInput
            label="Advance Amount"
            name="advanceAmount"
            type="number"
            min="0"
            step="0.01"
            value={values.advanceAmount}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.advanceAmount}
          />
        )}

        <FormSelect
          label="Status"
          name="status"
          value={values.status}
          onChange={handleChange}
          options={statusOptions}
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
            {travel ? 'Update' : 'Submit'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default TravelForm; 