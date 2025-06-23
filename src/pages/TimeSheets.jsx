import React, { useState, useEffect } from 'react'
import { getMockTimesheets } from '../api/mockData'
import { useNotification } from '../context/NotificationContext'
import GlassCard from '../components/common/GlassCard'
import Loader from '../components/common/Loader'
import TimeSheetList from '../components/timesheet/TimeSheetList'
import TimeSheetDetail from '../components/timesheet/TimeSheetDetail'

const TimeSheets = () => {
  const [timeSheets, setTimeSheets] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState(null)
  const [selectedTimeSheet, setSelectedTimeSheet] = useState(null)
  const [showDetail, setShowDetail] = useState(false)
  const { addNotification } = useNotification()

  useEffect(() => {
    // Force mock data for testing
    const mockData = getMockTimesheets('2025-06');
    setTimeSheets(mockData);
    setLoading(false);
    // Optionally, set mock stats
    setStats({
      pendingApproval: mockData.filter(ts => ts.status === 'pending').length,
      approved: mockData.filter(ts => ts.status === 'approved').length,
      rejected: mockData.filter(ts => ts.status === 'rejected').length,
    });
  }, []);

  const handleView = (timesheet) => {
    setSelectedTimeSheet(timesheet)
    setShowDetail(true)
  }

  const handleCloseDetail = () => {
    setSelectedTimeSheet(null)
    setShowDetail(false)
  }

  const handleApprove = (timesheet) => {
    addNotification('Timesheet approved successfully', 'success')
    // For mock, just update status locally
    setTimeSheets(prev => prev.map(ts => ts.id === timesheet.id ? { ...ts, status: 'approved' } : ts));
    setStats(prev => ({
      ...prev,
      pendingApproval: prev.pendingApproval - 1,
      approved: prev.approved + 1
    }));
  }

  const handleReject = (timesheet) => {
    addNotification('Timesheet rejected successfully', 'success')
    setTimeSheets(prev => prev.map(ts => ts.id === timesheet.id ? { ...ts, status: 'rejected' } : ts));
    setStats(prev => ({
      ...prev,
      pendingApproval: prev.pendingApproval - 1,
      rejected: prev.rejected + 1
    }));
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Timesheet Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <GlassCard>
          <h3 className="text-lg font-semibold mb-2">Pending Approval</h3>
          <p className="text-3xl font-bold text-yellow-600">
            {stats?.pendingApproval || 0}
          </p>
        </GlassCard>
        <GlassCard>
          <h3 className="text-lg font-semibold mb-2">Approved</h3>
          <p className="text-3xl font-bold text-green-600">
            {stats?.approved || 0}
          </p>
        </GlassCard>
        <GlassCard>
          <h3 className="text-lg font-semibold mb-2">Rejected</h3>
          <p className="text-3xl font-bold text-red-600">
            {stats?.rejected || 0}
          </p>
        </GlassCard>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <TimeSheetList
          timeSheets={timeSheets}
          onView={handleView}
          onEdit={() => {}}
          onDelete={() => {}}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>

      {showDetail && selectedTimeSheet && ( 
        <TimeSheetDetail timesheet={selectedTimeSheet} onClose={handleCloseDetail} />
      )}
    </div>
  )
}

export default TimeSheets