import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

// Pages
import Login from '../pages/auth/Login';
import Dashboard from '../pages/Dashboard';
import Users from '../pages/Users';
import Employees from '../pages/employees/EmployeeList';
import EmployeeDetails from '../pages/employees/EmployeeDetails';
import Attendance from '../pages/attendance/AttendancePage';
import LeaveRequests from '../pages/leave/LeaveRequestsPage';
import TimeSheets from '../pages/TimeSheets';
import Salary from '../pages/salary/Salary';
import Travel from '../pages/travel/Travel';
import Documents from '../pages/documents/DocumentsPage';
import Reports from '../pages/reports/Reports';
import Settings from '../pages/settings/Settings';
import Profile from '../pages/profile/Profile';
import NotFound from '../pages/NotFound';
import Unauthorized from '../pages/Unauthorized';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import NavMenu3DDemo from '../pages/NavMenu3DDemo';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/employees/:id" element={<EmployeeDetails />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/leave" element={<LeaveRequests />} />
        <Route path="/timesheets" element={<TimeSheets />} />
        <Route path="/salary" element={<Salary />} />
        <Route path="/travel" element={<Travel />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/users" element={<Users />} />
        <Route path="/nav-menu-3d-demo" element={<NavMenu3DDemo />} />
      </Route>

      {/* Special Routes */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default AppRoutes; 