// Import and re-export all services
export {
  authService,
  userService,
  employeeService,
  attendanceService,
  timesheetService,
  documentService,
  departmentService,
  salaryService,
  travelService,
  performanceService,
  trainingService,
  reportService,
  notificationService,
  settingsService,
} from './services';

// Export type definitions and utilities
export * from './types';

// Export base API and config
export { default as api, apiService, endpoints } from './apiService';