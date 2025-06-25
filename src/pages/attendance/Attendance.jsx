import React, { useState, useEffect } from 'react';
import { useNotification } from '../../context/NotificationContext';
import { attendanceService, employeeService } from '../../api';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import AttendanceList from '../../components/attendance/AttendanceList';
import AttendanceForm from '../../components/attendance/AttendanceForm';

const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const { addNotification } = useNotification();

  const fetchEmployees = async () => {
    try {
      const response = await employeeService.getEmployees();
      if (response?.data) {
        setEmployees(response.data);
      }
    } catch (err) {
      console.error('Error fetching employees:', err);
      if (!import.meta.env.DEV) {
        addNotification({
          type: 'error',
          message: err.message || 'Failed to fetch employees'
        });
      }
    }
  };

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const response = await attendanceService.getDailyAttendance(selectedDate);
      if (response?.data) {
        setAttendanceData(response.data);
      } else {
        setAttendanceData([]);
      }
    } catch (err) {
      console.error('Attendance fetch error:', err);
      if (!import.meta.env.DEV) {
        addNotification({
          type: 'error',
          message: err.message || 'Failed to fetch attendance data'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    fetchAttendance();
  }, [selectedDate]);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const displayData = attendanceData?.length > 0 ? attendanceData : employees.map(employee => ({
    id: `${employee.id}-${selectedDate}`,
    employeeId: employee.id,
    employeeName: employee.name,
    status: 'not_marked',
    checkIn: null,
    checkOut: null
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full flex flex-col"
    >
      <div className="flex-none p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Attendance Management</h1>
        <div className="flex items-center space-x-4">
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="bg-white dark:bg-gray-800 shadow">
          <div className="overflow-x-auto">
            <AttendanceList
              attendance={displayData}
              onEdit={handleEdit}
              onView={handleView}
              onDelete={handleDelete}
              dark
            />
          </div>
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
    </motion.div>
  );
};

export default Attendance;