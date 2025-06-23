import React from 'react';
import { useAuth } from '../hooks/useAuth';
import BackgroundScene from '../components/three/BackgroundScene';
import Card3D from '../components/three/Card3D';
import Chart3D from '../components/three/Chart3D';

const TestDashboard = () => {
  const { user } = useAuth();

  // Sample data for department distribution chart
  const departmentData = [
    { label: 'HR', value: 15, color: '#4285F4' },
    { label: 'IT', value: 25, color: '#EA4335' },
    { label: 'Finance', value: 20, color: '#FBBC05' },
    { label: 'Sales', value: 30, color: '#34A853' },
    { label: 'Ops', value: 10, color: '#8E44AD' }
  ];

  // Sample data for monthly attendance chart
  const attendanceData = [
    { label: 'Jan', value: 92, color: '#4285F4' },
    { label: 'Feb', value: 88, color: '#EA4335' },
    { label: 'Mar', value: 95, color: '#FBBC05' },
    { label: 'Apr', value: 90, color: '#34A853' },
    { label: 'May', value: 85, color: '#8E44AD' }
  ];

  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      {/* 3D Background */}
      <BackgroundScene className="fixed" />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="mb-8 backdrop-blur-sm bg-black/30 p-6 rounded-lg">
          <h1 className="text-3xl font-bold text-white">
            Welcome back, {user?.name || 'User'}!
          </h1>
          <p className="mt-1 text-sm text-gray-300">
            Here's what's happening with your HRMS today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Employee Stats Card */}
          <div className="backdrop-blur-sm bg-white/10 p-6 rounded-lg shadow-lg border border-white/20">
            <h2 className="text-lg font-semibold mb-4 text-white">Employee Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              <Card3D 
                title="Total Employees" 
                value="120" 
                color="#4285F4" 
                textColor="#ffffff" 
              />
              <Card3D 
                title="New This Month" 
                value="5" 
                color="#34A853" 
                textColor="#ffffff" 
              />
            </div>
          </div>

          {/* Attendance Today Card */}
          <div className="backdrop-blur-sm bg-white/10 p-6 rounded-lg shadow-lg border border-white/20">
            <h2 className="text-lg font-semibold mb-4 text-white">Attendance Today</h2>
            <div className="grid grid-cols-3 gap-2">
              <Card3D 
                title="Present" 
                value="95" 
                color="#34A853" 
                textColor="#ffffff" 
              />
              <Card3D 
                title="Absent" 
                value="10" 
                color="#EA4335" 
                textColor="#ffffff" 
              />
              <Card3D 
                title="Late" 
                value="15" 
                color="#FBBC05" 
                textColor="#ffffff" 
              />
            </div>
          </div>

          {/* Pending Approvals Card */}
          <div className="backdrop-blur-sm bg-white/10 p-6 rounded-lg shadow-lg border border-white/20">
            <h2 className="text-lg font-semibold mb-4 text-white">Pending Approvals</h2>
            <div className="grid grid-cols-2 gap-4">
              <Card3D 
                title="Leave Requests" 
                value="8" 
                color="#8E44AD" 
                textColor="#ffffff" 
              />
              <Card3D 
                title="Travel Requests" 
                value="3" 
                color="#4285F4" 
                textColor="#ffffff" 
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Department Distribution Chart */}
          <div className="backdrop-blur-sm bg-white/10 p-6 rounded-lg shadow-lg border border-white/20 h-96">
            <h2 className="text-lg font-semibold mb-4 text-white">Department Distribution</h2>
            <Chart3D 
              data={departmentData} 
              title="Employees by Department" 
              className="h-80" 
            />
          </div>

          {/* Monthly Attendance Chart */}
          <div className="backdrop-blur-sm bg-white/10 p-6 rounded-lg shadow-lg border border-white/20 h-96">
            <h2 className="text-lg font-semibold mb-4 text-white">Monthly Attendance</h2>
            <Chart3D 
              data={attendanceData} 
              title="Attendance Rate (%)" 
              className="h-80" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDashboard;