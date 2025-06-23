import React, { useState, useEffect, useCallback } from 'react';
import { attendanceService } from '../../api';
import { useNotification } from '../../context/NotificationContext';
import GlassCard from '../../components/common/GlassCard';
import Loader from '../../components/common/Loader';

const AttendancePage = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
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

  const handleMarkAttendance = async (employeeId, status) => {
    try {
      await attendanceService.markAttendance({ employeeId, status });
      addNotification('success', 'Attendance marked successfully');
      await Promise.all([fetchAttendance(), fetchStats()]);
    } catch (error) {
      addNotification('error', 'Failed to mark attendance');
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Attendance Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <GlassCard>
          <h3 className="text-lg font-semibold mb-2">Present Today</h3>
          <p className="text-3xl font-bold text-green-600">{stats?.present || 0}</p>
        </GlassCard>

        <GlassCard>
          <h3 className="text-lg font-semibold mb-2">Absent Today</h3>
          <p className="text-3xl font-bold text-red-600">{stats?.absent || 0}</p>
        </GlassCard>

        <GlassCard>
          <h3 className="text-lg font-semibold mb-2">On Leave</h3>
          <p className="text-3xl font-bold text-yellow-600">{stats?.onLeave || 0}</p>
        </GlassCard>
      </div>

      <GlassCard>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {attendance.map((record) => (
                <tr key={record.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {record.employeeName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(record.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        record.status === 'present'
                          ? 'bg-green-100 text-green-800'
                          : record.status === 'absent'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleMarkAttendance(record.employeeId, 'present')}
                      className="text-green-600 hover:text-green-900 mr-4"
                    >
                      Mark Present
                    </button>
                    <button
                      onClick={() => handleMarkAttendance(record.employeeId, 'absent')}
                      className="text-red-600 hover:text-red-900"
                    >
                      Mark Absent
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};

export default AttendancePage;