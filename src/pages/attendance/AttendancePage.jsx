import React, { useState, useEffect, useCallback } from 'react';
import { attendanceService, employeeService } from '../../api';
import { useNotification } from '../../context/NotificationContext';
import GlassCard from '../../components/common/GlassCard';
import Loader from '../../components/common/Loader';
import AttendanceList from '../../components/attendance/AttendanceList';
import AttendanceForm from '../../components/attendance/AttendanceForm';
import { mockEmployees, mockAttendance } from '../../api/mockData';

const AttendancePage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const { addNotification } = useNotification();
  const [searchEmail, setSearchEmail] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [searching, setSearching] = useState(false);

  // Fetch employees for fallback and AttendanceForm
  const fetchEmployees = useCallback(async () => {
    if (import.meta.env.DEV) {
      setEmployees(mockEmployees);
      return;
    }
    try {
      const response = await employeeService.getEmployees();
      if (response?.data) {
        setEmployees(response.data);
      }
    } catch (err) {
      console.error('Error fetching employees:', err);
      addNotification({ type: 'error', message: err.message || 'Failed to fetch employees' });
    }
  }, [addNotification]);

  // Fetch attendance for selected date
  const fetchAttendance = useCallback(async () => {
    setLoading(true);
    if (import.meta.env.DEV) {
      setAttendance(mockAttendance);
      setLoading(false);
      return;
    }
    try {
      const response = await attendanceService.getDailyAttendance(selectedDate);
      setAttendance(response?.data || []);
    } catch (error) {
      addNotification('error', 'Failed to fetch attendance data');
      setAttendance([]);
    } finally {
      setLoading(false);
    }
  }, [addNotification, selectedDate]);

  // Fetch stats (unchanged)
  const fetchStats = useCallback(async () => {
    try {
      const response = await attendanceService.getAttendanceReport();
      setStats(response.data);
    } catch (error) {
      addNotification('error', 'Failed to fetch attendance stats');
    }
  }, [addNotification]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  useEffect(() => {
    fetchAttendance();
    fetchStats();
  }, [fetchAttendance, fetchStats]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

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

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchEmail) {
      setSearchResult(null);
      return;
    }
    setSearching(true);
    try {
      const filtered = displayData.filter(record => record.employeeName && record.employeeName.toLowerCase().includes(searchEmail.toLowerCase()) || record.employeeId === searchEmail || record.email === searchEmail);
      setSearchResult(filtered);
    } catch {
      setSearchResult([]);
    } finally {
      setSearching(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  // Fallback: if no attendance data, show all employees as 'not_marked'
  const displayData = attendance?.length > 0 ? attendance : employees.map(employee => ({
    id: `${employee.id}-${selectedDate}`,
    employeeId: employee.id,
    employeeName: employee.name,
    status: 'not_marked',
    checkIn: null,
    checkOut: null
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <form onSubmit={handleSearch} className="flex gap-2 items-center mb-4">
        <input
          type="text"
          placeholder="Search by employee email..."
          value={searchEmail}
          onChange={e => setSearchEmail(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 text-sm"
          disabled={searching}
        >
          {searching ? 'Searching...' : 'Search'}
        </button>
        {searchResult && (
          <button
            type="button"
            className="ml-2 text-gray-500 underline text-xs"
            onClick={() => { setSearchResult(null); setSearchEmail(''); }}
          >
            Clear
          </button>
        )}
      </form>
      {/* Header Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Attendance Management</h1>
            <p className="text-gray-600">Track and manage employee attendance records</p>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
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
            attendance={searchResult !== null ? searchResult : displayData}
            onEdit={handleEdit}
            onView={handleView}
            onDelete={handleDelete}
          />
        </div>
      </div>
      {showModal && (
        <AttendanceForm
          attendance={selectedAttendance}
          employees={employees}
          onSubmit={handleModalSubmit}
          onClose={handleModalClose}
          readOnly={!isEditMode}
        />
      )}
    </div>
  );
};

export default AttendancePage;