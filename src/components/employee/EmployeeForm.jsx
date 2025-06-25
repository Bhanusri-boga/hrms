import React from 'react';
import { useForm } from '../../hooks/useForm';
import Modal from '../common/Modal';
import FormInput from '../common/FormInput';
import FormSelect from '../common/FormSelect';

const genderOptions = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Other' }
];
const maritalStatusOptions = [
  { value: 'Single', label: 'Single' },
  { value: 'Married', label: 'Married' },
  { value: 'Divorced', label: 'Divorced' },
  { value: 'Widowed', label: 'Widowed' }
];
// Replace these with your actual data or fetch from API
const nationalityOptions = [
  { value: 1, label: 'Indian' },
  { value: 2, label: 'American' }
];
const employmentStatusOptions = [
  { value: 1, label: 'Full Time' },
  { value: 2, label: 'Part Time' }
];
const jobTitleOptions = [
  { value: 1, label: 'Developer' },
  { value: 2, label: 'Manager' }
];
const payGradeOptions = [
  { value: 1, label: 'Grade 1' },
  { value: 2, label: 'Grade 2' }
];
const provinceOptions = [
  { value: 1, label: 'Telangana' },
  { value: 2, label: 'Andhra Pradesh' }
];
const departmentOptions = [
  { value: 1, label: 'Engineering' },
  { value: 2, label: 'HR' }
];

const EmployeeForm = ({ employee, onSubmit, onClose }) => {
  const { values, errors, handleChange, handleBlur, handleSubmit } = useForm({
    initialValues: {
      employeeId: employee?.employeeId || '',
      firstName: employee?.firstName || '',
      middleName: employee?.middleName || '',
      lastName: employee?.lastName || '',
      nationality: employee?.nationality || '',
      birthday: employee?.birthday || '',
      gender: employee?.gender || '',
      maritalStatus: employee?.maritalStatus || '',
      ssnNum: employee?.ssnNum || '',
      nicNum: employee?.nicNum || '',
      otherId: employee?.otherId || '',
      employmentStatus: employee?.employmentStatus || '',
      jobTitle: employee?.jobTitle || '',
      payGrade: employee?.payGrade || '',
      workStationId: employee?.workStationId || '',
      address1: employee?.address1 || '',
      address2: employee?.address2 || '',
      city: employee?.city || '',
      country: employee?.country || '',
      province: employee?.province || '',
      postalCode: employee?.postalCode || '',
      homePhone: employee?.homePhone || '',
      mobilePhone: employee?.mobilePhone || '',
      workPhone: employee?.workPhone || '',
      workEmail: employee?.workEmail || '',
      privateEmail: employee?.privateEmail || '',
      joinedDate: employee?.joinedDate || '',
      confirmationDate: employee?.confirmationDate || '',
      department: employee?.department || '',
      supervisor: employee?.supervisor || '',
      indirectSupervisors: employee?.indirectSupervisors || { techLead: '', hrManager: '' },
      timezone: employee?.timezone || '',
      profileImage: employee?.profileImage || ''
    },
    validationRules: {
      employeeId: { required: true },
      firstName: { required: true },
      lastName: { required: true },
      nationality: { required: true },
      birthday: { required: true },
      gender: { required: true },
      maritalStatus: { required: true },
      employmentStatus: { required: true },
      jobTitle: { required: true },
      payGrade: { required: true },
      department: { required: true },
      joinedDate: { required: true }
    },
    onSubmit: (formValues) => {
      onSubmit(formValues);
    }
  });

  return (
    <Modal
      isOpen={true}
      title={employee ? 'Edit Employee' : 'Add Employee'}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput label="Employee ID" name="employeeId" value={values.employeeId} onChange={handleChange} onBlur={handleBlur} error={errors.employeeId} required />
        <FormInput label="First Name" name="firstName" value={values.firstName} onChange={handleChange} onBlur={handleBlur} error={errors.firstName} required />
        <FormInput label="Middle Name" name="middleName" value={values.middleName} onChange={handleChange} onBlur={handleBlur} error={errors.middleName} />
        <FormInput label="Last Name" name="lastName" value={values.lastName} onChange={handleChange} onBlur={handleBlur} error={errors.lastName} required />
        <FormSelect label="Nationality" name="nationality" value={values.nationality} onChange={handleChange} onBlur={handleBlur} error={errors.nationality} options={nationalityOptions} required />
        <FormInput label="Birthday" name="birthday" type="date" value={values.birthday} onChange={handleChange} onBlur={handleBlur} error={errors.birthday} required />
        <FormSelect label="Gender" name="gender" value={values.gender} onChange={handleChange} onBlur={handleBlur} error={errors.gender} options={genderOptions} required />
        <FormSelect label="Marital Status" name="maritalStatus" value={values.maritalStatus} onChange={handleChange} onBlur={handleBlur} error={errors.maritalStatus} options={maritalStatusOptions} required />
        <FormInput label="SSN Number" name="ssnNum" value={values.ssnNum} onChange={handleChange} onBlur={handleBlur} error={errors.ssnNum} />
        <FormInput label="NIC Number" name="nicNum" value={values.nicNum} onChange={handleChange} onBlur={handleBlur} error={errors.nicNum} />
        <FormInput label="Other ID" name="otherId" value={values.otherId} onChange={handleChange} onBlur={handleBlur} error={errors.otherId} />
        <FormSelect label="Employment Status" name="employmentStatus" value={values.employmentStatus} onChange={handleChange} onBlur={handleBlur} error={errors.employmentStatus} options={employmentStatusOptions} required />
        <FormSelect label="Job Title" name="jobTitle" value={values.jobTitle} onChange={handleChange} onBlur={handleBlur} error={errors.jobTitle} options={jobTitleOptions} required />
        <FormSelect label="Pay Grade" name="payGrade" value={values.payGrade} onChange={handleChange} onBlur={handleBlur} error={errors.payGrade} options={payGradeOptions} required />
        <FormInput label="Work Station ID" name="workStationId" value={values.workStationId} onChange={handleChange} onBlur={handleBlur} error={errors.workStationId} />
        <FormInput label="Address 1" name="address1" value={values.address1} onChange={handleChange} onBlur={handleBlur} error={errors.address1} />
        <FormInput label="Address 2" name="address2" value={values.address2} onChange={handleChange} onBlur={handleBlur} error={errors.address2} />
        <FormInput label="City" name="city" value={values.city} onChange={handleChange} onBlur={handleBlur} error={errors.city} />
        <FormInput label="Country" name="country" value={values.country} onChange={handleChange} onBlur={handleBlur} error={errors.country} />
        <FormSelect label="Province" name="province" value={values.province} onChange={handleChange} onBlur={handleBlur} error={errors.province} options={provinceOptions} />
        <FormInput label="Postal Code" name="postalCode" value={values.postalCode} onChange={handleChange} onBlur={handleBlur} error={errors.postalCode} />
        <FormInput label="Home Phone" name="homePhone" value={values.homePhone} onChange={handleChange} onBlur={handleBlur} error={errors.homePhone} />
        <FormInput label="Mobile Phone" name="mobilePhone" value={values.mobilePhone} onChange={handleChange} onBlur={handleBlur} error={errors.mobilePhone} />
        <FormInput label="Work Phone" name="workPhone" value={values.workPhone} onChange={handleChange} onBlur={handleBlur} error={errors.workPhone} />
        <FormInput label="Work Email" name="workEmail" value={values.workEmail} onChange={handleChange} onBlur={handleBlur} error={errors.workEmail} />
        <FormInput label="Private Email" name="privateEmail" value={values.privateEmail} onChange={handleChange} onBlur={handleBlur} error={errors.privateEmail} />
        <FormInput label="Joined Date" name="joinedDate" type="date" value={values.joinedDate} onChange={handleChange} onBlur={handleBlur} error={errors.joinedDate} required />
        <FormInput label="Confirmation Date" name="confirmationDate" type="date" value={values.confirmationDate} onChange={handleChange} onBlur={handleBlur} error={errors.confirmationDate} />
        <FormSelect label="Department" name="department" value={values.department} onChange={handleChange} onBlur={handleBlur} error={errors.department} options={departmentOptions} required />
        <FormInput label="Supervisor" name="supervisor" value={values.supervisor} onChange={handleChange} onBlur={handleBlur} error={errors.supervisor} />
        <FormInput label="Tech Lead" name="indirectSupervisors.techLead" value={values.indirectSupervisors?.techLead || ''} onChange={handleChange} onBlur={handleBlur} error={errors['indirectSupervisors.techLead']} />
        <FormInput label="HR Manager" name="indirectSupervisors.hrManager" value={values.indirectSupervisors?.hrManager || ''} onChange={handleChange} onBlur={handleBlur} error={errors['indirectSupervisors.hrManager']} />
        <FormInput label="Timezone" name="timezone" value={values.timezone} onChange={handleChange} onBlur={handleBlur} error={errors.timezone} />
        <FormInput label="Profile Image URL" name="profileImage" value={values.profileImage} onChange={handleChange} onBlur={handleBlur} error={errors.profileImage} />

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