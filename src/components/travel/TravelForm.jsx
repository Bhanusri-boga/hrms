import React from 'react';
import { useForm } from '../../hooks/useForm';
import Modal from '../common/Modal';
import FormInput from '../common/FormInput';
import FormSelect from '../common/FormSelect';

const travelTypeOptions = [
  { value: 'BUSINESS', label: 'Business' },
  { value: 'TRAINING', label: 'Training' },
  { value: 'CONFERENCE', label: 'Conference' },
  { value: 'OTHER', label: 'Other' }
];

const modeOfTravelOptions = [
  { value: 'FLIGHT', label: 'Flight' },
  { value: 'TRAIN', label: 'Train' },
  { value: 'BUS', label: 'Bus' },
  { value: 'CAR', label: 'Car' },
  { value: 'OTHER', label: 'Other' }
];

const TravelForm = ({ travel, onSubmit, onClose }) => {
  const initialValues = travel ? {
    employeeId: travel.employeeId,
    travelType: travel.travelType,
    purpose: travel.purpose,
    startDate: travel.startDate || travel.departureDate,
    endDate: travel.endDate || travel.returnDate,
    destination: travel.destination,
    modeOfTravel: travel.modeOfTravel,
    estimatedCost: travel.estimatedCost,
    advanceAmount: travel.advanceAmount || 0,
    comments: travel.comments || travel.notes || ''
  } : {
    employeeId: '',
    travelType: 'BUSINESS',
    purpose: '',
    startDate: '',
    endDate: '',
    destination: '',
    modeOfTravel: 'FLIGHT',
    estimatedCost: '',
    advanceAmount: '',
    comments: ''
  };

  const validate = (values) => {
    const errors = {};
    if (!values.employeeId) errors.employeeId = 'Required';
    if (!values.purpose) errors.purpose = 'Required';
    if (!values.startDate) errors.startDate = 'Required';
    if (!values.endDate) errors.endDate = 'Required';
    if (!values.destination) errors.destination = 'Required';
    if (!values.estimatedCost) errors.estimatedCost = 'Required';
    if (values.advanceAmount && Number(values.advanceAmount) > Number(values.estimatedCost)) {
      errors.advanceAmount = 'Cannot exceed estimated cost';
    }
    if (new Date(values.endDate) < new Date(values.startDate)) {
      errors.endDate = 'End date must be after start date';
    }
    return errors;
  };

  const { values, errors, handleChange, handleBlur, handleSubmit } = useForm({
    initialValues,
    onSubmit: (formData) => {
      onSubmit(travel?.id, {
        ...formData,
        estimatedCost: Number(formData.estimatedCost),
        advanceAmount: Number(formData.advanceAmount) || 0
      });
    },
    validate
  });

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={travel ? 'Edit Travel Request' : 'New Travel Request'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Employee ID"
          name="employeeId"
          type="number"
          value={values.employeeId}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.employeeId}
          required
        />

        <FormSelect
          label="Travel Type"
          name="travelType"
          value={values.travelType}
          onChange={handleChange}
          onBlur={handleBlur}
          options={travelTypeOptions}
          required
        />

        <FormInput
          label="Purpose"
          name="purpose"
          value={values.purpose}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.purpose}
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

        <FormInput
          label="Destination"
          name="destination"
          value={values.destination}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.destination}
          required
        />

        <FormSelect
          label="Mode of Travel"
          name="modeOfTravel"
          value={values.modeOfTravel}
          onChange={handleChange}
          onBlur={handleBlur}
          options={modeOfTravelOptions}
          required
        />

        <div className="grid grid-cols-2 gap-4">
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
        </div>

        <FormInput
          label="Comments"
          name="comments"
          type="textarea"
          value={values.comments}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <div className="flex justify-end space-x-2 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
          >
            {travel ? 'Update Request' : 'Submit Request'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default TravelForm; 