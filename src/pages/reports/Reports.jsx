import React, { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { useNotification } from '../../context/NotificationContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Reports = () => {
  const [reportType, setReportType] = useState('attendance');
  const [timeframe, setTimeframe] = useState('month');
  const { addNotification } = useNotification();
  
  // Fetch report data
  const { data: reportData, loading } = useFetch(`/reports/${reportType}?timeframe=${timeframe}`);

  const handleReportTypeChange = (e) => {
    setReportType(e.target.value);
  };

  const handleTimeframeChange = (e) => {
    setTimeframe(e.target.value);
  };

  const handleExport = () => {
    addNotification({
      type: 'info',
      message: 'Report export functionality would be implemented here'
    });
  };

  // Mock data for demonstration
  const mockAttendanceData = [
    { name: 'Jan', present: 92, absent: 5, late: 3 },
    { name: 'Feb', present: 88, absent: 7, late: 5 },
    { name: 'Mar', present: 90, absent: 6, late: 4 },
    { name: 'Apr', present: 94, absent: 3, late: 3 },
    { name: 'May', present: 91, absent: 5, late: 4 },
    { name: 'Jun', present: 89, absent: 6, late: 5 },
  ];

  const mockDepartmentData = [
    { name: 'Engineering', value: 40, color: '#0088FE' },
    { name: 'Marketing', value: 20, color: '#00C49F' },
    { name: 'Sales', value: 25, color: '#FFBB28' },
    { name: 'HR', value: 10, color: '#FF8042' },
    { name: 'Finance', value: 15, color: '#8884d8' },
  ];

  const mockSalaryData = [
    { name: 'Jan', amount: 125000 },
    { name: 'Feb', amount: 127000 },
    { name: 'Mar', amount: 128500 },
    { name: 'Apr', amount: 130000 },
    { name: 'May', amount: 132000 },
    { name: 'Jun', amount: 135000 },
  ];

  // Use mock data for now
  let displayData;
  switch (reportType) {
    case 'attendance':
      displayData = reportData || mockAttendanceData;
      break;
    case 'department':
      displayData = reportData || mockDepartmentData;
      break;
    case 'salary':
      displayData = reportData || mockSalaryData;
      break;
    default:
      displayData = [];
  }

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <div className="flex items-center">
          <select
            value={reportType}
            onChange={handleReportTypeChange}
            className="mr-4 border border-gray-300 rounded p-2"
          >
            <option value="attendance">Attendance</option>
            <option value="department">Department Distribution</option>
            <option value="salary">Salary Trends</option>
          </select>
          <select
            value={timeframe}
            onChange={handleTimeframeChange}
            className="mr-4 border border-gray-300 rounded p-2"
          >
            <option value="month">Monthly</option>
            <option value="quarter">Quarterly</option>
            <option value="year">Yearly</option>
          </select>
          <button
            onClick={handleExport}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Export Report
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          {reportType === 'attendance' && 'Attendance Report'}
          {reportType === 'department' && 'Department Distribution'}
          {reportType === 'salary' && 'Salary Trends'}
        </h2>
        
        <div className="h-96">
          {reportType === 'attendance' && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={displayData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="present" stackId="a" fill="#4ade80" name="Present" />
                <Bar dataKey="absent" stackId="a" fill="#f87171" name="Absent" />
                <Bar dataKey="late" stackId="a" fill="#facc15" name="Late" />
              </BarChart>
            </ResponsiveContainer>
          )}

          {reportType === 'department' && (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={displayData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {displayData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} employees`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}

          {reportType === 'salary' && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={displayData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend />
                <Bar dataKey="amount" fill="#6366f1" name="Total Salary" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;