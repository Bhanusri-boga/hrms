import React, { useState, useEffect } from 'react';
import { useNotification } from '../../context/NotificationContext';
import { attendanceService, employeeService } from '../../api';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotification();

  const fetchEmployees = async () => {
    try {
      const response = await employeeService.getEmployees();
      if (response?.data) {
        setEmployees(response.data);
      }
    } catch (err) {
      console.error('Error fetching employees:', err);
      // Don't show error notification for mock data
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
      // Don't show error notification for mock data
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

  const handleMarkAttendance = async (employeeId, status) => {
    try {
      const now = new Date();
      const inTime = now.toISOString();
      const outTime = null; // or set as needed
      const note = '';
      const response = await attendanceService.markAttendance({
        employeeId,
        inTime,
        outTime,
        note,
        status: status.toUpperCase()
      });
      if (response?.data) {
        addNotification({
          type: 'success',
          message: 'Attendance marked successfully'
        });
        fetchAttendance();
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Mark attendance error:', error);
      addNotification({
        type: 'error',
        message: error.message || 'Failed to mark attendance'
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Use mock data if no real data is available
  const displayData = attendanceData?.length > 0 ? attendanceData : employees.map(employee => ({
    id: `${employee.id}-${selectedDate}`, // Ensure unique keys
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
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    In Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Out Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Note
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {displayData.map((record) => (
                  <tr key={record.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{record.employeeName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {record.inTime ? new Date(record.inTime).toLocaleString() : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {record.outTime ? new Date(record.outTime).toLocaleString() : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {record.note || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${record.status === 'PRESENT' ? 'bg-green-100 text-green-800' : 
                          record.status === 'ABSENT' ? 'bg-red-100 text-red-800' : 
                          record.status === 'LATE' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-gray-100 text-gray-800'}`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleMarkAttendance(record.employeeId, 'PRESENT')}
                        className="text-green-600 hover:text-green-900 mr-4"
                      >
                        Present
                      </button>
                      <button
                        onClick={() => handleMarkAttendance(record.employeeId, 'ABSENT')}
                        className="text-red-600 hover:text-red-900"
                      >
                        Absent
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Attendance;