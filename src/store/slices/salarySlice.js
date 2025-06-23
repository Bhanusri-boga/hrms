import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as salaryApi from '../../api/salaryApi';

export const getSalaries = createAsyncThunk(
  'salaries/getSalaries',
  async (params, { rejectWithValue }) => {
    try {
      const response = await salaryApi.getSalaries(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSalaryById = createAsyncThunk(
  'salaries/getSalaryById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await salaryApi.getSalaryById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createSalary = createAsyncThunk(
  'salaries/createSalary',
  async (salaryData, { rejectWithValue }) => {
    try {
      const response = await salaryApi.createSalary(salaryData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateSalary = createAsyncThunk(
  'salaries/updateSalary',
  async ({ id, salaryData }, { rejectWithValue }) => {
    try {
      const response = await salaryApi.updateSalary(id, salaryData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteSalary = createAsyncThunk(
  'salaries/deleteSalary',
  async (id, { rejectWithValue }) => {
    try {
      await salaryApi.deleteSalary(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSalaryStats = createAsyncThunk(
  'salaries/getSalaryStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await salaryApi.getSalaryStats();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSalaryByEmployee = createAsyncThunk(
  'salaries/getSalaryByEmployee',
  async ({ employeeId, params }, { rejectWithValue }) => {
    try {
      const response = await salaryApi.getSalaryByEmployee(employeeId, params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const generatePayslip = createAsyncThunk(
  'salaries/generatePayslip',
  async (salaryId, { rejectWithValue }) => {
    try {
      const response = await salaryApi.generatePayslip(salaryId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSalaryComponents = createAsyncThunk(
  'salaries/getSalaryComponents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await salaryApi.getSalaryComponents();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const calculateSalary = createAsyncThunk(
  'salaries/calculateSalary',
  async (data, { rejectWithValue }) => {
    try {
      const response = await salaryApi.calculateSalary(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  salaries: [],
  selectedSalary: null,
  stats: null,
  components: [],
  loading: false,
  error: null,
  totalCount: 0,
  currentPage: 1,
  itemsPerPage: 10,
};

const salarySlice = createSlice({
  name: 'salaries',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedSalary: (state) => {
      state.selectedSalary = null;
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
      // Get Salaries
      .addCase(getSalaries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSalaries.fulfilled, (state, action) => {
        state.loading = false;
        state.salaries = action.payload.data;
        state.totalCount = action.payload.total;
      })
      .addCase(getSalaries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch salaries';
      })
      // Get Salary by ID
      .addCase(getSalaryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSalaryById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedSalary = action.payload;
      })
      .addCase(getSalaryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch salary';
      })
      // Create Salary
      .addCase(createSalary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSalary.fulfilled, (state, action) => {
        state.loading = false;
        state.salaries.push(action.payload);
      })
      .addCase(createSalary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to create salary';
      })
      // Update Salary
      .addCase(updateSalary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSalary.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.salaries.findIndex(sal => sal.id === action.payload.id);
        if (index !== -1) {
          state.salaries[index] = action.payload;
        }
        if (state.selectedSalary?.id === action.payload.id) {
          state.selectedSalary = action.payload;
        }
      })
      .addCase(updateSalary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update salary';
      })
      // Delete Salary
      .addCase(deleteSalary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSalary.fulfilled, (state, action) => {
        state.loading = false;
        state.salaries = state.salaries.filter(sal => sal.id !== action.payload);
      })
      .addCase(deleteSalary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to delete salary';
      })
      // Get Salary Stats
      .addCase(getSalaryStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSalaryStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(getSalaryStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch salary stats';
      })
      // Get Salary by Employee
      .addCase(getSalaryByEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSalaryByEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.salaries = action.payload.data;
        state.totalCount = action.payload.total;
      })
      .addCase(getSalaryByEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch employee salaries';
      })
      // Generate Payslip
      .addCase(generatePayslip.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generatePayslip.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(generatePayslip.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to generate payslip';
      })
      // Get Salary Components
      .addCase(getSalaryComponents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSalaryComponents.fulfilled, (state, action) => {
        state.loading = false;
        state.components = action.payload;
      })
      .addCase(getSalaryComponents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch salary components';
      })
      // Calculate Salary
      .addCase(calculateSalary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(calculateSalary.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedSalary = action.payload;
      })
      .addCase(calculateSalary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to calculate salary';
      });
  },
});

export const { clearError, clearSelectedSalary, setCurrentPage, setItemsPerPage } = salarySlice.actions;
export default salarySlice.reducer; 