import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Employees from './pages/Employees';
import AttendancePage from './pages/attendance/AttendancePage';
import TimeSheetsPage from './pages/timesheets/TimeSheetsPage';
import DocumentsPage from './pages/documents/DocumentsPage';
import Salary from './pages/salary/Salary';
import Travel from './pages/travel/Travel';
import Reports from './pages/reports/Reports';
import Settings from './pages/settings/Settings';
import NotFound from './pages/NotFound';
import Layout from './components/common/Layout';
import Attendance from './pages/attendance/Attendance';
import TimeSheets from './pages/TimeSheets';
import Documents from './pages/documents/Documents';
import Profile from './pages/profile/Profile';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route element={<PublicRoute isAuthenticated={isAuthenticated} />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/timesheets" element={<TimeSheets />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/salary" element={<Salary />} />
          <Route path="/travel" element={<Travel />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App; 