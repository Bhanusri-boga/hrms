import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { timeSheetApi } from '../../api/apiService';

export const getTimeSheets = createAsyncThunk(
  'timeSheets/getTimeSheets',
  async (params, { rejectWithValue }) => {
    try {
      const response = await timeSheetApi.getTimeSheets(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTimeSheetById = createAsyncThunk(
  'timeSheets/getTimeSheetById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await timeSheetApi.getTimeSheetById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createTimeSheet = createAsyncThunk(
  'timeSheets/createTimeSheet',
  async (timeSheetData, { rejectWithValue }) => {
    try {
      const response = await timeSheetApi.createTimeSheet(timeSheetData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTimeSheet = createAsyncThunk(
  'timeSheets/updateTimeSheet',
  async ({ id, timeSheetData }, { rejectWithValue }) => {
    try {
      const response = await timeSheetApi.updateTimeSheet(id, timeSheetData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTimeSheet = createAsyncThunk(
  'timeSheets/deleteTimeSheet',
  async (id, { rejectWithValue }) => {
    try {
      await timeSheetApi.deleteTimeSheet(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTimeSheetStats = createAsyncThunk(
  'timeSheets/getTimeSheetStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await timeSheetApi.getTimeSheetStats();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTimeSheetByEmployee = createAsyncThunk(
  'timeSheets/getTimeSheetByEmployee',
  async ({ employeeId, params }, { rejectWithValue }) => {
    try {
      const response = await timeSheetApi.getTimeSheetByEmployee(employeeId, params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const approveTimeSheet = createAsyncThunk(
  'timeSheets/approveTimeSheet',
  async (id, { rejectWithValue }) => {
    try {
      const response = await timeSheetApi.approveTimeSheet(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const rejectTimeSheet = createAsyncThunk(
  'timeSheets/rejectTimeSheet',
  async ({ id, reason }, { rejectWithValue }) => {
    try {
      const response = await timeSheetApi.rejectTimeSheet(id, reason);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  timeSheets: [],
  selectedTimeSheet: null,
  stats: null,
  loading: false,
  error: null,
  totalCount: 0,
  currentPage: 1,
  itemsPerPage: 10,
};

const timeSheetSlice = createSlice({
  name: 'timeSheets',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedTimeSheet: (state) => {
      state.selectedTimeSheet = null;
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
      // Get TimeSheets
      .addCase(getTimeSheets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTimeSheets.fulfilled, (state, action) => {
        state.loading = false;
        state.timeSheets = action.payload.data;
        state.totalCount = action.payload.total;
      })
      .addCase(getTimeSheets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch timesheets';
      })
      // Get TimeSheet by ID
      .addCase(getTimeSheetById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTimeSheetById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedTimeSheet = action.payload;
      })
      .addCase(getTimeSheetById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch timesheet';
      })
      // Create TimeSheet
      .addCase(createTimeSheet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTimeSheet.fulfilled, (state, action) => {
        state.loading = false;
        state.timeSheets.push(action.payload);
      })
      .addCase(createTimeSheet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to create timesheet';
      })
      // Update TimeSheet
      .addCase(updateTimeSheet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTimeSheet.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.timeSheets.findIndex(ts => ts.id === action.payload.id);
        if (index !== -1) {
          state.timeSheets[index] = action.payload;
        }
        if (state.selectedTimeSheet?.id === action.payload.id) {
          state.selectedTimeSheet = action.payload;
        }
      })
      .addCase(updateTimeSheet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update timesheet';
      })
      // Delete TimeSheet
      .addCase(deleteTimeSheet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTimeSheet.fulfilled, (state, action) => {
        state.loading = false;
        state.timeSheets = state.timeSheets.filter(ts => ts.id !== action.payload);
      })
      .addCase(deleteTimeSheet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to delete timesheet';
      })
      // Get TimeSheet Stats
      .addCase(getTimeSheetStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTimeSheetStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(getTimeSheetStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch timesheet stats';
      })
      // Get TimeSheet by Employee
      .addCase(getTimeSheetByEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTimeSheetByEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.timeSheets = action.payload.data;
        state.totalCount = action.payload.total;
      })
      .addCase(getTimeSheetByEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch employee timesheets';
      })
      // Approve TimeSheet
      .addCase(approveTimeSheet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approveTimeSheet.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.timeSheets.findIndex(ts => ts.id === action.payload.id);
        if (index !== -1) {
          state.timeSheets[index] = action.payload;
        }
        if (state.selectedTimeSheet?.id === action.payload.id) {
          state.selectedTimeSheet = action.payload;
        }
      })
      .addCase(approveTimeSheet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to approve timesheet';
      })
      // Reject TimeSheet
      .addCase(rejectTimeSheet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rejectTimeSheet.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.timeSheets.findIndex(ts => ts.id === action.payload.id);
        if (index !== -1) {
          state.timeSheets[index] = action.payload;
        }
        if (state.selectedTimeSheet?.id === action.payload.id) {
          state.selectedTimeSheet = action.payload;
        }
      })
      .addCase(rejectTimeSheet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to reject timesheet';
      });
  },
});

export const { clearError, clearSelectedTimeSheet, setCurrentPage, setItemsPerPage } = timeSheetSlice.actions;
export default timeSheetSlice.reducer; 