import React from 'react';
import Modal from '../common/Modal';
import { formatDate } from '../../utils/formatUtils';

const DetailItem = ({ label, value }) => (
  <div className="grid grid-cols-3 gap-4 py-2">
    <dt className="text-sm font-medium text-gray-500">{label}</dt>
    <dd className="text-sm text-gray-900 col-span-2">{value || '-'}</dd>
  </div>
);

const TimeSheetDetail = ({ timesheet, onClose }) => {
  if (!timesheet) return null;

  const calculateTotalHours = (startTime, endTime, breakDuration) => {
    if (!startTime || !endTime) return 'N/A';
    
    const start = new Date(`1970-01-01T${startTime}`);
    const end = new Date(`1970-01-01T${endTime}`);
    
    let diff = (end.getTime() - start.getTime()) / 1000 / 60; // difference in minutes
    diff -= breakDuration || 0;
    
    const hours = Math.floor(diff / 60);
    const minutes = Math.round(diff % 60);
    
    return `${hours}h ${minutes}m`;
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Timesheet Details">
      <div className="space-y-2">
        <dl className="divide-y divide-gray-200">
          <DetailItem label="Employee" value={timesheet.employee?.name || `ID: ${timesheet.employeeId}`} />
          <DetailItem label="Date" value={formatDate(timesheet.date)} />
          <DetailItem label="Start Time" value={timesheet.startTime} />
          <DetailItem label="End Time" value={timesheet.endTime} />
          <DetailItem label="Break Duration" value={`${timesheet.breakDuration} minutes`} />
          <DetailItem label="Total Hours" value={calculateTotalHours(timesheet.startTime, timesheet.endTime, timesheet.breakDuration)} />
          <DetailItem label="Status" value={timesheet.status} />
          <DetailItem label="Description" value={timesheet.description || timesheet.notes} />
        </dl>
        <div className="flex justify-end pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TimeSheetDetail; 