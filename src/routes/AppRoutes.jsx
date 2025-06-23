import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

// Pages
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Users from '../pages/Users';
import Employees from '../pages/Employees';
import Attendance from '../pages/Attendance';
import TimeSheets from '../pages/TimeSheets';
import Documents from '../pages/Documents';
import Salary from '../pages/Salary';
import Travel from '../pages/Travel';
import Reports from '../pages/Reports';
import Settings from '../pages/Settings';
import NotFound from '../pages/NotFound';
import Unauthorized from '../pages/Unauthorized';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/users"
        element={
          <PrivateRoute requiredRoles={['admin']}>
            <Users />
          </PrivateRoute>
        }
      />

      <Route
        path="/employees"
        element={
          <PrivateRoute requiredRoles={['admin', 'manager']}>
            <Employees />
          </PrivateRoute>
        }
      />

      <Route
        path="/attendance"
        element={
          <PrivateRoute>
            <Attendance />
          </PrivateRoute>
        }
      />

      <Route
        path="/timesheets"
        element={
          <PrivateRoute>
            <TimeSheets />
          </PrivateRoute>
        }
      />

      <Route
        path="/documents"
        element={
          <PrivateRoute>
            <Documents />
          </PrivateRoute>
        }
      />

      <Route
        path="/salary"
        element={
          <PrivateRoute requiredRoles={['admin', 'manager']}>
            <Salary />
          </PrivateRoute>
        }
      />

      <Route
        path="/travel"
        element={
          <PrivateRoute>
            <Travel />
          </PrivateRoute>
        }
      />

      <Route
        path="/reports"
        element={
          <PrivateRoute requiredRoles={['admin', 'manager']}>
            <Reports />
          </PrivateRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        }
      />

      {/* Special Routes */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default AppRoutes; 