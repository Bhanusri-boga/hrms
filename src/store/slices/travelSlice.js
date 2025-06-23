import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as travelApi from '../../api/travelApi';

export const getTravelRequests = createAsyncThunk(
  'travel/getTravelRequests',
  async (params, { rejectWithValue }) => {
    try {
      const response = await travelApi.getTravelRequests(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTravelRequestById = createAsyncThunk(
  'travel/getTravelRequestById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await travelApi.getTravelRequestById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createTravelRequest = createAsyncThunk(
  'travel/createTravelRequest',
  async (travelData, { rejectWithValue }) => {
    try {
      const response = await travelApi.createTravelRequest(travelData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTravelRequest = createAsyncThunk(
  'travel/updateTravelRequest',
  async ({ id, travelData }, { rejectWithValue }) => {
    try {
      const response = await travelApi.updateTravelRequest(id, travelData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTravelRequest = createAsyncThunk(
  'travel/deleteTravelRequest',
  async (id, { rejectWithValue }) => {
    try {
      await travelApi.deleteTravelRequest(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTravelStats = createAsyncThunk(
  'travel/getTravelStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await travelApi.getTravelStats();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTravelByEmployee = createAsyncThunk(
  'travel/getTravelByEmployee',
  async ({ employeeId, params }, { rejectWithValue }) => {
    try {
      const response = await travelApi.getTravelByEmployee(employeeId, params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const approveTravelRequest = createAsyncThunk(
  'travel/approveTravelRequest',
  async (id, { rejectWithValue }) => {
    try {
      const response = await travelApi.approveTravelRequest(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const rejectTravelRequest = createAsyncThunk(
  'travel/rejectTravelRequest',
  async ({ id, reason }, { rejectWithValue }) => {
    try {
      const response = await travelApi.rejectTravelRequest(id, reason);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const uploadTravelDocument = createAsyncThunk(
  'travel/uploadTravelDocument',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await travelApi.uploadTravelDocument(id, formData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  travelRequests: [],
  selectedTravelRequest: null,
  stats: null,
  loading: false,
  error: null,
  totalCount: 0,
  currentPage: 1,
  itemsPerPage: 10,
};

const travelSlice = createSlice({
  name: 'travel',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedTravelRequest: (state) => {
      state.selectedTravelRequest = null;
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
      // Get Travel Requests
      .addCase(getTravelRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTravelRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.travelRequests = action.payload.data;
        state.totalCount = action.payload.total;
      })
      .addCase(getTravelRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch travel requests';
      })
      // Get Travel Request by ID
      .addCase(getTravelRequestById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTravelRequestById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedTravelRequest = action.payload;
      })
      .addCase(getTravelRequestById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch travel request';
      })
      // Create Travel Request
      .addCase(createTravelRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTravelRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.travelRequests.push(action.payload);
      })
      .addCase(createTravelRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to create travel request';
      })
      // Update Travel Request
      .addCase(updateTravelRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTravelRequest.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.travelRequests.findIndex(tr => tr.id === action.payload.id);
        if (index !== -1) {
          state.travelRequests[index] = action.payload;
        }
        if (state.selectedTravelRequest?.id === action.payload.id) {
          state.selectedTravelRequest = action.payload;
        }
      })
      .addCase(updateTravelRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update travel request';
      })
      // Delete Travel Request
      .addCase(deleteTravelRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTravelRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.travelRequests = state.travelRequests.filter(tr => tr.id !== action.payload);
      })
      .addCase(deleteTravelRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to delete travel request';
      })
      // Get Travel Stats
      .addCase(getTravelStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTravelStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(getTravelStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch travel stats';
      })
      // Get Travel by Employee
      .addCase(getTravelByEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTravelByEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.travelRequests = action.payload.data;
        state.totalCount = action.payload.total;
      })
      .addCase(getTravelByEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch employee travel requests';
      })
      // Approve Travel Request
      .addCase(approveTravelRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approveTravelRequest.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.travelRequests.findIndex(tr => tr.id === action.payload.id);
        if (index !== -1) {
          state.travelRequests[index] = action.payload;
        }
        if (state.selectedTravelRequest?.id === action.payload.id) {
          state.selectedTravelRequest = action.payload;
        }
      })
      .addCase(approveTravelRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to approve travel request';
      })
      // Reject Travel Request
      .addCase(rejectTravelRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rejectTravelRequest.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.travelRequests.findIndex(tr => tr.id === action.payload.id);
        if (index !== -1) {
          state.travelRequests[index] = action.payload;
        }
        if (state.selectedTravelRequest?.id === action.payload.id) {
          state.selectedTravelRequest = action.payload;
        }
      })
      .addCase(rejectTravelRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to reject travel request';
      })
      // Upload Travel Document
      .addCase(uploadTravelDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadTravelDocument.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.travelRequests.findIndex(tr => tr.id === action.payload.id);
        if (index !== -1) {
          state.travelRequests[index] = action.payload;
        }
        if (state.selectedTravelRequest?.id === action.payload.id) {
          state.selectedTravelRequest = action.payload;
        }
      })
      .addCase(uploadTravelDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to upload travel document';
      });
  },
});

export const { clearError, clearSelectedTravelRequest, setCurrentPage, setItemsPerPage } = travelSlice.actions;
export default travelSlice.reducer; 