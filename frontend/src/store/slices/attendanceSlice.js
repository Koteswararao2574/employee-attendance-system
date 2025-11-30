import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { attendanceAPI, dashboardAPI } from '../../services/api';


export const checkIn = createAsyncThunk(
  'attendance/checkIn',
  async (_, { rejectWithValue }) => {
    try {
      const response = await attendanceAPI.checkIn();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Check-in failed');
    }
  }
);

export const checkOut = createAsyncThunk(
  'attendance/checkOut',
  async (_, { rejectWithValue }) => {
    try {
      const response = await attendanceAPI.checkOut();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Check-out failed');
    }
  }
);

export const getMyHistory = createAsyncThunk(
  'attendance/getMyHistory',
  async (params, { rejectWithValue }) => {
    try {
      const response = await attendanceAPI.getMyHistory(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch history');
    }
  }
);

export const getMySummary = createAsyncThunk(
  'attendance/getMySummary',
  async (params, { rejectWithValue }) => {
    try {
      const response = await attendanceAPI.getMySummary(params);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch summary');
    }
  }
);

export const getTodayStatus = createAsyncThunk(
  'attendance/getTodayStatus',
  async (_, { rejectWithValue }) => {
    try {
      const response = await attendanceAPI.getTodayStatus();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch today status');
    }
  }
);

export const getEmployeeDashboard = createAsyncThunk(
  'attendance/getEmployeeDashboard',
  async (_, { rejectWithValue }) => {
    try {
      const response = await dashboardAPI.getEmployeeDashboard();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch dashboard');
    }
  }
);

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState: {
    todayStatus: null,
    history: [],
    summary: null,
    dashboard: null,
    pagination: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(checkIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkIn.fulfilled, (state, action) => {
        state.loading = false;
        state.todayStatus = action.payload;
      })
      .addCase(checkIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(checkOut.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkOut.fulfilled, (state, action) => {
        state.loading = false;
        state.todayStatus = action.payload;
      })
      .addCase(checkOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(getMyHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(getMyHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(getMySummary.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMySummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload;
      })
      .addCase(getMySummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(getTodayStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTodayStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.todayStatus = action.payload;
      })
      .addCase(getTodayStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(getEmployeeDashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEmployeeDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload;
      })
      .addCase(getEmployeeDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = attendanceSlice.actions;
export default attendanceSlice.reducer;