import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import employeeReducer from './slices/employeeSlice';
import attendanceReducer from './slices/attendanceSlice';
import timeSheetReducer from './slices/timeSheetSlice';
import documentReducer from './slices/documentSlice';
import salaryReducer from './slices/salarySlice';
import travelReducer from './slices/travelSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    employee: employeeReducer,
    attendance: attendanceReducer,
    timeSheets: timeSheetReducer,
    documents: documentReducer,
    salaries: salaryReducer,
    travel: travelReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store; 