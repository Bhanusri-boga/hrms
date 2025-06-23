import React from 'react';
import Modal from '../common/Modal';
import { formatDate, formatDuration } from '../../utils/formatUtils';

const TimeSheetDetail = ({ timesheet, onClose }) => {
  console.log('TimeSheetDetail rendered with timesheet:', timesheet);
  if (!timesheet) {
    console.log('No timesheet data provided');
    return null;
  }

  return (
    <Modal isOpen={true} onClose={onClose} title="Timesheet Details">
      <div className="space-y-4">
        <div>
          <strong>Employee:</strong> {timesheet.employee?.name || timesheet.employeeName}
        </div>
        <div>
          <strong>Project:</strong> {timesheet.project}
        </div>
        <div>
          <strong>Task:</strong> {timesheet.task}
        </div>
        <div>
          <strong>Date:</strong> {formatDate(timesheet.date)}
        </div>
        <div>
          <strong>Hours:</strong> {formatDuration(timesheet.hours) || timesheet.hours}
        </div>
        <div>
          <strong>Status:</strong> {timesheet.status}
        </div>
        {timesheet.notes && (
          <div>
            <strong>Notes:</strong> {timesheet.notes}
          </div>
        )}
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