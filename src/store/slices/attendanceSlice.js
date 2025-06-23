import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as attendanceApi from '../../api/attendanceApi';

export const getAttendance = createAsyncThunk(
  'attendance/getAttendance',
  async (params, { rejectWithValue }) => {
    try {
      const response = await attendanceApi.getAttendance(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAttendanceById = createAsyncThunk(
  'attendance/getAttendanceById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await attendanceApi.getAttendanceById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createAttendance = createAsyncThunk(
  'attendance/createAttendance',
  async (attendanceData, { rejectWithValue }) => {
    try {
      const response = await attendanceApi.createAttendance(attendanceData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateAttendance = createAsyncThunk(
  'attendance/updateAttendance',
  async ({ id, attendanceData }, { rejectWithValue }) => {
    try {
      const response = await attendanceApi.updateAttendance(id, attendanceData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteAttendance = createAsyncThunk(
  'attendance/deleteAttendance',
  async (id, { rejectWithValue }) => {
    try {
      await attendanceApi.deleteAttendance(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAttendanceStats = createAsyncThunk(
  'attendance/getAttendanceStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await attendanceApi.getAttendanceStats();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAttendanceByDate = createAsyncThunk(
  'attendance/getAttendanceByDate',
  async (date, { rejectWithValue }) => {
    try {
      const response = await attendanceApi.getAttendanceByDate(date);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAttendanceByEmployee = createAsyncThunk(
  'attendance/getAttendanceByEmployee',
  async ({ employeeId, params }, { rejectWithValue }) => {
    try {
      const response = await attendanceApi.getAttendanceByEmployee(employeeId, params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  attendance: [],
  selectedAttendance: null,
  stats: null,
  loading: false,
  error: null,
  totalCount: 0,
  currentPage: 1,
  itemsPerPage: 10,
};

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedAttendance: (state) => {
      state.selectedAttendance = null;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Attendance
      .addCase(getAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.attendance = action.payload.data;
        state.totalCount = action.payload.total;
      })
      .addCase(getAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch attendance records';
      })
      // Get Attendance by ID
      .addCase(getAttendanceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAttendanceById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedAttendance = action.payload;
      })
      .addCase(getAttendanceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch attendance record';
      })
      // Create Attendance
      .addCase(createAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.attendance.push(action.payload);
      })
      .addCase(createAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to create attendance record';
      })
      // Update Attendance
      .addCase(updateAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAttendance.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.attendance.findIndex(att => att.id === action.payload.id);
        if (index !== -1) {
          state.attendance[index] = action.payload;
        }
        if (state.selectedAttendance?.id === action.payload.id) {
          state.selectedAttendance = action.payload;
        }
      })
      .addCase(updateAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update attendance record';
      })
      // Delete Attendance
      .addCase(deleteAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.attendance = state.attendance.filter(att => att.id !== action.payload);
      })
      .addCase(deleteAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to delete attendance record';
      })
      // Get Attendance Stats
      .addCase(getAttendanceStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAttendanceStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(getAttendanceStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch attendance stats';
      })
      // Get Attendance by Date
      .addCase(getAttendanceByDate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAttendanceByDate.fulfilled, (state, action) => {
        state.loading = false;
        state.attendance = action.payload;
      })
      .addCase(getAttendanceByDate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch attendance by date';
      })
      // Get Attendance by Employee
      .addCase(getAttendanceByEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAttendanceByEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.attendance = action.payload.data;
        state.totalCount = action.payload.total;
      })
      .addCase(getAttendanceByEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch employee attendance';
      });
  },
});

export const { clearError, clearSelectedAttendance, setCurrentPage, setItemsPerPage } = attendanceSlice.actions;
export default attendanceSlice.reducer; 