import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import RoleRedirect from './RoleRedirect';

// Pages
import Login from '../pages/auth/Login';
import Dashboard from '../pages/Dashboard';
import Layout from '../components/common/Layout';
import Users from '../pages/Users';
import Employees from '../pages/employees/EmployeeList';
import EmployeeDetails from '../pages/employees/EmployeeDetails';
import Attendance from '../pages/attendance/AttendancePage';
import LeaveRequests from '../pages/LeaveRequestsPage'
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
import VerifyEmail from '../pages/auth/VerifyEmail';
import Register from '../pages/auth/Register';
import VerifyEmailHandler from '../pages/auth/VerifyEmailHandler';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<RoleRedirect />} />
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* All authenticated users can access these pages */}
      <Route element={<PrivateRoute />}>
        <Route element={<Layout />}>
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
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/verify-email-handler" element={<VerifyEmailHandler />} />
        </Route>
      </Route>

      {/* Shared or fallback routes */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default AppRoutes; 