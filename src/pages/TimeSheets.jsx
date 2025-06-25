import React, { useState } from 'react';
import TimeSheetList from '../components/timesheet/TimeSheetList';
import TimeSheetForm from '../components/timesheet/TimeSheetForm';
import TimeSheetDetail from '../components/timesheet/TimeSheetDetail';
import ConfirmationModal from '../components/common/ConfirmationModal';
import { useNotification } from '../context/NotificationContext';

const mockTimeSheets = [
  {
    id: 1,
    employeeId: 37,
    employeeName: 'John Doe',
    date: '2025-05-29',
    startTime: '09:00:00',
    endTime: '17:00:00',
    breakDuration: 60,
    description: 'Regular work day',
    status: 'pending'
  },
  {
    id: 2,
    employeeId: 42,
    employeeName: 'Jane Smith',
    date: '2025-05-29',
    startTime: '10:00:00',
    endTime: '18:30:00',
    breakDuration: 30,
    description: 'Worked on feature X',
    status: 'approved'
  },
];

const TimeSheets = () => {
  const [timeSheets, setTimeSheets] = useState(mockTimeSheets);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTimeSheet, setEditingTimeSheet] = useState(null);
  const [viewingTimeSheet, setViewingTimeSheet] = useState(null);
  const [deletingTimeSheetId, setDeletingTimeSheetId] = useState(null);
  const { addNotification } = useNotification();

  const handleNewTimeSheet = () => {
    setEditingTimeSheet(null);
    setIsFormOpen(true);
  };

  const handleEditTimeSheet = (timesheet) => {
    setEditingTimeSheet(timesheet);
    setIsFormOpen(true);
  };

  const handleViewTimeSheet = (timesheet) => {
    setViewingTimeSheet(timesheet);
  };

  const handleCloseModals = () => {
    setIsFormOpen(false);
    setEditingTimeSheet(null);
    setViewingTimeSheet(null);
    setDeletingTimeSheetId(null);
  };

  const handleSubmit = (id, formData) => {
    if (id) {
      // Update
      setTimeSheets(timeSheets.map(ts => ts.id === id ? { ...ts, ...formData } : ts));
      addNotification({ type: 'success', message: 'Timesheet updated successfully!' });
    } else {
      // Create
      const newTimeSheet = { id: Date.now(), ...formData, status: 'pending' };
      setTimeSheets([...timeSheets, newTimeSheet]);
      addNotification({ type: 'success', message: 'Timesheet created successfully!' });
    }
    handleCloseModals();
  };
  
  const handleDeleteRequest = (id) => {
    setDeletingTimeSheetId(id);
  };
  
  const confirmDelete = () => {
    setTimeSheets(timeSheets.filter(ts => ts.id !== deletingTimeSheetId));
    addNotification({ type: 'success', message: 'Timesheet deleted successfully!' });
    handleCloseModals();
  };
  
  const handleApprove = (timesheet) => {
    setTimeSheets(timeSheets.map(ts => ts.id === timesheet.id ? { ...ts, status: 'approved' } : ts));
    addNotification({ type: 'info', message: `Timesheet for ${timesheet.employeeName || 'ID: ' + timesheet.employeeId} approved.` });
  };
  
  const handleReject = (timesheet) => {
    setTimeSheets(timeSheets.map(ts => ts.id === timesheet.id ? { ...ts, status: 'rejected' } : ts));
     addNotification({ type: 'warning', message: `Timesheet for ${timesheet.employeeName || 'ID: ' + timesheet.employeeId} rejected.` });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Timesheet Management</h1>
            <p className="text-gray-600">Track and manage employee working hours and time entries</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleNewTimeSheet}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Entry
            </button>
          </div>
        </div>
      </div>

      {/* TimeSheet List Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <TimeSheetList
          timeSheets={timeSheets}
          onView={handleViewTimeSheet}
          onEdit={handleEditTimeSheet}
          onDelete={handleDeleteRequest}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>

      {isFormOpen && (
        <TimeSheetForm
          timeSheet={editingTimeSheet}
          onSubmit={handleSubmit}
          onClose={handleCloseModals}
        />
      )}

      {viewingTimeSheet && (
        <TimeSheetDetail
          timesheet={viewingTimeSheet}
          onClose={handleCloseModals}
        />
      )}
      
      {deletingTimeSheetId && (
        <ConfirmationModal
            isOpen={true}
            title="Confirm Deletion"
            message="Are you sure you want to delete this timesheet entry?"
            onConfirm={confirmDelete}
            onCancel={handleCloseModals}
        />
      )}
    </div>
  );
};

export default TimeSheets;