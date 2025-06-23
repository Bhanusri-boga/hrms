import React, { useState, useEffect } from 'react'
import { attendanceService } from '../api'
import { useNotification } from '../context/NotificationContext'

const Attendance = () => {
  const [attendance, setAttendance] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState(null)
  const { addNotification } = useNotification()

  useEffect(() => {
    fetchAttendance()
    fetchStats()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchAttendance = async () => {
    try {
      const response = await attendanceService.getDailyAttendance(new Date())
      setAttendance(response.data)
    } catch (error) {
      addNotification('Error fetching attendance data', 'error')
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const data = await attendanceService.getStats()
      setStats(data)
    } catch (error) {
      addNotification('Error fetching attendance stats', 'error')
    }
  }

  const handleMarkAttendance = async (employeeId, status) => {
    try {
      await attendanceService.markAttendance({ employeeId, status })
      addNotification('Attendance marked successfully', 'success')
      fetchAttendance()
      fetchStats()
    } catch (error) {
      addNotification('Error marking attendance', 'error')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-8">Attendance Management</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <h3 className="text-lg font-semibold mb-2">Present Today</h3>
          <p className="text-3xl font-bold text-indigo-600">
            {stats?.presentToday || 0}
          </p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <h3 className="text-lg font-semibold mb-2">Absent Today</h3>
          <p className="text-3xl font-bold text-red-600">
            {stats?.absentToday || 0}
          </p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <h3 className="text-lg font-semibold mb-2">On Leave</h3>
          <p className="text-3xl font-bold text-yellow-600">
            {stats?.onLeave || 0}
          </p>
        </motion.div>
      </div>

      {/* Attendance List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
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
          <tbody className="bg-white divide-y divide-gray-200">
            {attendance.map((record) => (
              <motion.tr
                key={record.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ backgroundColor: '#f9fafb' }}
              >
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
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
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
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

export default Attendance 