import React from 'react';
import { formatDate, formatPhoneNumber } from '../../utils/formatUtils';
import Modal from '../common/Modal';

const EmployeeDetail = ({ employee, onClose, onEdit }) => {
  if (!employee) return null;

  return (
    <Modal title="Employee Details" onClose={onClose} isOpen={true}>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <img
            src={employee.profileImage || 'https://via.placeholder.com/100'}
            alt={employee.firstName || 'Profile'}
            className="h-24 w-24 rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              {employee.firstName} {employee.middleName} {employee.lastName}
            </h3>
            <p className="text-sm text-gray-500">{employee.workEmail || employee.privateEmail}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div><strong>Employee ID:</strong> {employee.employeeId}</div>
          <div><strong>First Name:</strong> {employee.firstName}</div>
          <div><strong>Middle Name:</strong> {employee.middleName}</div>
          <div><strong>Last Name:</strong> {employee.lastName}</div>
          <div><strong>Nationality:</strong> {employee.nationality}</div>
          <div><strong>Birthday:</strong> {formatDate(employee.birthday)}</div>
          <div><strong>Gender:</strong> {employee.gender}</div>
          <div><strong>Marital Status:</strong> {employee.maritalStatus}</div>
          <div><strong>SSN Num:</strong> {employee.ssnNum}</div>
          <div><strong>NIC Num:</strong> {employee.nicNum}</div>
          <div><strong>Other ID:</strong> {employee.otherId}</div>
          <div><strong>Employment Status:</strong> {employee.employmentStatus}</div>
          <div><strong>Job Title:</strong> {employee.jobTitle}</div>
          <div><strong>Pay Grade:</strong> {employee.payGrade}</div>
          <div><strong>Work Station ID:</strong> {employee.workStationId}</div>
          <div><strong>Address 1:</strong> {employee.address1}</div>
          <div><strong>Address 2:</strong> {employee.address2}</div>
          <div><strong>City:</strong> {employee.city}</div>
          <div><strong>Country:</strong> {employee.country}</div>
          <div><strong>Province:</strong> {employee.province}</div>
          <div><strong>Postal Code:</strong> {employee.postalCode}</div>
          <div><strong>Home Phone:</strong> {formatPhoneNumber(employee.homePhone)}</div>
          <div><strong>Mobile Phone:</strong> {formatPhoneNumber(employee.mobilePhone)}</div>
          <div><strong>Work Phone:</strong> {formatPhoneNumber(employee.workPhone)}</div>
          <div><strong>Work Email:</strong> {employee.workEmail}</div>
          <div><strong>Private Email:</strong> {employee.privateEmail}</div>
          <div><strong>Joined Date:</strong> {formatDate(employee.joinedDate)}</div>
          <div><strong>Confirmation Date:</strong> {formatDate(employee.confirmationDate)}</div>
          <div><strong>Department:</strong> {employee.department}</div>
          <div><strong>Supervisor:</strong> {employee.supervisor}</div>
          <div><strong>Tech Lead:</strong> {employee.indirectSupervisors?.techLead}</div>
          <div><strong>HR Manager:</strong> {employee.indirectSupervisors?.hrManager}</div>
          <div><strong>Timezone:</strong> {employee.timezone}</div>
          <div><strong>Status:</strong> {employee.status || 'Active'}</div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
          <button
            type="button"
            onClick={onEdit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Edit
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EmployeeDetail;