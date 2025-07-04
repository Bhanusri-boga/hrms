import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { employeeApi } from '../../api/apiService';

export const getEmployees = createAsyncThunk(
  'employees/getEmployees',
  async (params, { rejectWithValue }) => {
    try {
      const response = await employeeApi.getEmployees(params);
      return response;
    } catch (error) {
      console.error('Error in getEmployees:', error);
      return rejectWithValue({
        message: error.message || 'Failed to fetch employees',
        status: error.status,
        data: error.data
      });
    }
  }
);

export const getEmployeeById = createAsyncThunk(
  'employees/getEmployeeById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await employeeApi.getEmployeeById(id);
      return response;
    } catch (error) {
      console.error('Error in getEmployeeById:', error);
      return rejectWithValue({
        message: error.message || 'Failed to fetch employee details',
        status: error.status,
        data: error.data
      });
    }
  }
);

export const createEmployee = createAsyncThunk(
  'employees/createEmployee',
  async (employeeData, { rejectWithValue }) => {
    try {
      const response = await employeeApi.createEmployee(employeeData);
      return response;
    } catch (error) {
      console.error('Error in createEmployee:', error);
      return rejectWithValue({
        message: error.message || 'Failed to create employee',
        status: error.status,
        data: error.data
      });
    }
  }
);

export const updateEmployee = createAsyncThunk(
  'employees/updateEmployee',
  async ({ id, employeeData }, { rejectWithValue }) => {
    try {
      const response = await employeeApi.updateEmployee(id, employeeData);
      return response;
    } catch (error) {
      console.error('Error in updateEmployee:', error);
      return rejectWithValue({
        message: error.message || 'Failed to update employee',
        status: error.status,
        data: error.data
      });
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  'employees/deleteEmployee',
  async (id, { rejectWithValue }) => {
    try {
      await employeeApi.deleteEmployee(id);
      return id;
    } catch (error) {
      console.error('Error in deleteEmployee:', error);
      return rejectWithValue({
        message: error.message || 'Failed to delete employee',
        status: error.status,
        data: error.data
      });
    }
  }
);

export const getEmployeeStats = createAsyncThunk(
  'employees/getEmployeeStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await employeeApi.getEmployeeStats();
      return response;
    } catch (error) {
      console.error('Error in getEmployeeStats:', error);
      return rejectWithValue({
        message: error.message || 'Failed to fetch employee stats',
        status: error.status,
        data: error.data
      });
    }
  }
);

const initialState = {
  employees: [],
  selectedEmployee: null,
  stats: null,
  loading: false,
  error: null,
  totalCount: 0,
  currentPage: 1,
  itemsPerPage: 10,
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedEmployee: (state) => {
      state.selectedEmployee = null;
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
      // Get Employees
      .addCase(getEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload.data || action.payload;
        state.totalCount = action.payload.total || action.payload.length;
      })
      .addCase(getEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch employees';
        console.error('Get Employees Error:', action.payload);
      })
      // Get Employee by ID
      .addCase(getEmployeeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmployeeById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedEmployee = action.payload;
      })
      .addCase(getEmployeeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch employee';
        console.error('Get Employee by ID Error:', action.payload);
      })
      // Create Employee
      .addCase(createEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees.push(action.payload);
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to create employee';
        console.error('Create Employee Error:', action.payload);
      })
      // Update Employee
      .addCase(updateEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.employees.findIndex(emp => emp.id === action.payload.id);
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
        if (state.selectedEmployee?.id === action.payload.id) {
          state.selectedEmployee = action.payload;
        }
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update employee';
        console.error('Update Employee Error:', action.payload);
      })
      // Delete Employee
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = state.employees.filter(emp => emp.id !== action.payload);
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to delete employee';
        console.error('Delete Employee Error:', action.payload);
      })
      // Get Employee Stats
      .addCase(getEmployeeStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmployeeStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(getEmployeeStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch employee stats';
        console.error('Get Employee Stats Error:', action.payload);
      });
  },
});

export const { clearError, clearSelectedEmployee, setCurrentPage, setItemsPerPage } = employeeSlice.actions;
export default employeeSlice.reducer; 