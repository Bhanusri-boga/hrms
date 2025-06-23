import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as documentApi from '../../api/documentApi';

export const getDocuments = createAsyncThunk(
  'documents/getDocuments',
  async (params, { rejectWithValue }) => {
    try {
      const response = await documentApi.getDocuments(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getDocumentById = createAsyncThunk(
  'documents/getDocumentById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await documentApi.getDocumentById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const uploadDocument = createAsyncThunk(
  'documents/uploadDocument',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await documentApi.uploadDocument(formData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateDocument = createAsyncThunk(
  'documents/updateDocument',
  async ({ id, documentData }, { rejectWithValue }) => {
    try {
      const response = await documentApi.updateDocument(id, documentData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteDocument = createAsyncThunk(
  'documents/deleteDocument',
  async (id, { rejectWithValue }) => {
    try {
      await documentApi.deleteDocument(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const downloadDocument = createAsyncThunk(
  'documents/downloadDocument',
  async (id, { rejectWithValue }) => {
    try {
      const response = await documentApi.downloadDocument(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getDocumentCategories = createAsyncThunk(
  'documents/getDocumentCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await documentApi.getDocumentCategories();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getDocumentsByCategory = createAsyncThunk(
  'documents/getDocumentsByCategory',
  async (category, { rejectWithValue }) => {
    try {
      const response = await documentApi.getDocumentsByCategory(category);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const shareDocument = createAsyncThunk(
  'documents/shareDocument',
  async ({ id, shareData }, { rejectWithValue }) => {
    try {
      const response = await documentApi.shareDocument(id, shareData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  documents: [],
  selectedDocument: null,
  categories: [],
  loading: false,
  error: null,
  totalCount: 0,
  currentPage: 1,
  itemsPerPage: 10,
};

const documentSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedDocument: (state) => {
      state.selectedDocument = null;
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
      // Get Documents
      .addCase(getDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.documents = action.payload.data;
        state.totalCount = action.payload.total;
      })
      .addCase(getDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch documents';
      })
      // Get Document by ID
      .addCase(getDocumentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDocumentById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedDocument = action.payload;
      })
      .addCase(getDocumentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch document';
      })
      // Upload Document
      .addCase(uploadDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadDocument.fulfilled, (state, action) => {
        state.loading = false;
        state.documents.push(action.payload);
      })
      .addCase(uploadDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to upload document';
      })
      // Update Document
      .addCase(updateDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDocument.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.documents.findIndex(doc => doc.id === action.payload.id);
        if (index !== -1) {
          state.documents[index] = action.payload;
        }
        if (state.selectedDocument?.id === action.payload.id) {
          state.selectedDocument = action.payload;
        }
      })
      .addCase(updateDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update document';
      })
      // Delete Document
      .addCase(deleteDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDocument.fulfilled, (state, action) => {
        state.loading = false;
        state.documents = state.documents.filter(doc => doc.id !== action.payload);
      })
      .addCase(deleteDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to delete document';
      })
      // Download Document
      .addCase(downloadDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(downloadDocument.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(downloadDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to download document';
      })
      // Get Document Categories
      .addCase(getDocumentCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDocumentCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getDocumentCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch document categories';
      })
      // Get Documents by Category
      .addCase(getDocumentsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDocumentsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.documents = action.payload;
      })
      .addCase(getDocumentsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch documents by category';
      })
      // Share Document
      .addCase(shareDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(shareDocument.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.documents.findIndex(doc => doc.id === action.payload.id);
        if (index !== -1) {
          state.documents[index] = action.payload;
        }
        if (state.selectedDocument?.id === action.payload.id) {
          state.selectedDocument = action.payload;
        }
      })
      .addCase(shareDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to share document';
      });
  },
});

export const { clearError, clearSelectedDocument, setCurrentPage, setItemsPerPage } = documentSlice.actions;
export default documentSlice.reducer; 