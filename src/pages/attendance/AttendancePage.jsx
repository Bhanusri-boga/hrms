import React, { useState, useEffect, useCallback } from 'react';
import { attendanceService } from '../../api';
import { useNotification } from '../../context/NotificationContext';
import GlassCard from '../../components/common/GlassCard';
import Loader from '../../components/common/Loader';
import AttendanceList from '../../components/attendance/AttendanceList';
import AttendanceForm from '../../components/attendance/AttendanceForm';

const AttendancePage = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const { addNotification } = useNotification();

  const fetchAttendance = useCallback(async () => {
    try {
      const response = await attendanceService.getDailyAttendance(new Date());
      setAttendance(response.data);
    } catch (error) {
      addNotification('error', 'Failed to fetch attendance data');
    }
  }, [addNotification]);

  const fetchStats = useCallback(async () => {
    try {
      const response = await attendanceService.getAttendanceReport();
      setStats(response.data);
    } catch (error) {
      addNotification('error', 'Failed to fetch attendance stats');
    } finally {
      setLoading(false);
    }
  }, [addNotification]);

  useEffect(() => {
    fetchAttendance();
    fetchStats();
  }, [fetchAttendance, fetchStats]);

  const handleEdit = (record) => {
    setSelectedAttendance(record);
    setIsEditMode(true);
    setShowModal(true);
  };
  const handleView = (record) => {
    setSelectedAttendance(record);
    setIsEditMode(false);
    setShowModal(true);
  };
  const handleDelete = async () => {
    addNotification('info', 'Delete not implemented');
  };
  const handleModalClose = () => {
    setShowModal(false);
    setSelectedAttendance(null);
    setIsEditMode(false);
  };
  const handleModalSubmit = async () => {
    addNotification('success', 'Attendance updated');
    setShowModal(false);
    setSelectedAttendance(null);
    setIsEditMode(false);
    fetchAttendance();
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Attendance Management</h1>
            <p className="text-gray-600">Track and manage employee attendance records</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Mark Attendance
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-lg text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-600">Present Today</h3>
              <p className="text-2xl font-bold text-gray-900">{stats?.present || 0}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-red-500 to-red-600 rounded-lg text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-600">Absent Today</h3>
              <p className="text-2xl font-bold text-gray-900">{stats?.absent || 0}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-600">On Leave</h3>
              <p className="text-2xl font-bold text-gray-900">{stats?.onLeave || 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <AttendanceList
            attendance={attendance}
            onEdit={handleEdit}
            onView={handleView}
            onDelete={handleDelete}
          />
        </div>
      </div>
      {showModal && (
        <AttendanceForm
          attendance={selectedAttendance}
          employees={[]}
          onSubmit={handleModalSubmit}
          onClose={handleModalClose}
          readOnly={!isEditMode}
        />
      )}
    </div>
  );
};

export default AttendancePage;