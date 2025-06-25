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
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
            <p className="text-gray-600">Generate and analyze comprehensive HR reports</p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center gap-3">
              <select
                value={reportType}
                onChange={handleReportTypeChange}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              >
                <option value="attendance">Attendance Report</option>
                <option value="department">Department Distribution</option>
                <option value="salary">Salary Trends</option>
              </select>
              <select
                value={timeframe}
                onChange={handleTimeframeChange}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              >
                <option value="month">Monthly</option>
                <option value="quarter">Quarterly</option>
                <option value="year">Yearly</option>
              </select>
            </div>
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl text-sm font-medium flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            {reportType === 'attendance' && 'Attendance Analytics'}
            {reportType === 'department' && 'Department Distribution'}
            {reportType === 'salary' && 'Salary Trends Analysis'}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {reportType === 'attendance' && 'Track employee attendance patterns and trends'}
            {reportType === 'department' && 'View employee distribution across departments'}
            {reportType === 'salary' && 'Analyze salary expenditure over time'}
          </p>
        </div>
        
        <div className="p-6">
          <div className="h-96">
            {reportType === 'attendance' && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={displayData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="present" stackId="a" fill="#10b981" name="Present" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="absent" stackId="a" fill="#ef4444" name="Absent" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="late" stackId="a" fill="#f59e0b" name="Late" radius={[4, 4, 0, 0]} />
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
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    stroke="#fff"
                    strokeWidth={2}
                  >
                    {displayData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => `${value} employees`}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
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
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    formatter={(value) => `$${value.toLocaleString()}`}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="amount" fill="url(#colorGradient)" name="Total Salary" radius={[4, 4, 0, 0]} />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;