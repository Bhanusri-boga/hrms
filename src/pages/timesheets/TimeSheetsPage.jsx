import React, { useState, useEffect, useCallback } from 'react';
import { timesheetService } from '../../api';
import { useNotification } from '../../context/NotificationContext';
import GlassCard from '../../components/common/GlassCard';
import Loader from '../../components/common/Loader';

const TimeSheetsPage = () => {
  const [timeSheets, setTimeSheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const { addNotification } = useNotification();

  const fetchTimeSheets = useCallback(async () => {
    try {
      const response = await timesheetService.getTimesheets();
      setTimeSheets(response.data);
    } catch (error) {
      addNotification('error', 'Failed to fetch timesheets');
    }
  }, [addNotification]);

  const fetchStats = useCallback(async () => {
    try {
      // We'll use the timesheet service to get stats
      const response = await timesheetService.getTimesheets({ 
        params: { stats: true } 
      });
      setStats(response.data);
    } catch (error) {
      addNotification('error', 'Failed to fetch timesheet statistics');
    } finally {
      setLoading(false);
    }
  }, [addNotification]);

  useEffect(() => {
    fetchTimeSheets();
    fetchStats();
  }, [fetchTimeSheets, fetchStats]);

  const handleApproveTimesheet = async (id) => {
    try {
      await timesheetService.approveTimesheet(id);
      addNotification('success', 'Timesheet approved successfully');
      await fetchTimeSheets();
    } catch (error) {
      addNotification('error', 'Failed to approve timesheet');
    }
  };

  const handleRejectTimesheet = async (id) => {
    try {
      await timesheetService.rejectTimesheet(id);
      addNotification('success', 'Timesheet rejected');
      await fetchTimeSheets();
    } catch (error) {
      addNotification('error', 'Failed to reject timesheet');
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Timesheet Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <GlassCard>
          <h3 className="text-lg font-semibold mb-2">Pending Approval</h3>
          <p className="text-3xl font-bold text-yellow-600">{stats?.pending || 0}</p>
        </GlassCard>

        <GlassCard>
          <h3 className="text-lg font-semibold mb-2">Approved</h3>
          <p className="text-3xl font-bold text-green-600">{stats?.approved || 0}</p>
        </GlassCard>

        <GlassCard>
          <h3 className="text-lg font-semibold mb-2">Rejected</h3>
          <p className="text-3xl font-bold text-red-600">{stats?.rejected || 0}</p>
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
                  Week
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hours
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {timeSheets.map((timesheet) => (
                <tr key={timesheet.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {timesheet.employeeName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(timesheet.weekStart).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        timesheet.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : timesheet.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {timesheet.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {timesheet.totalHours}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {timesheet.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleApproveTimesheet(timesheet.id)}
                          className="text-green-600 hover:text-green-900 mr-4"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleRejectTimesheet(timesheet.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Reject
                        </button>
                      </>
                    )}
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

export default TimeSheetsPage;