import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { managerAPI, dashboardAPI } from '../../services/api';


export const getAllAttendance = createAsyncThunk(
  'manager/getAllAttendance',
  async (params, { rejectWithValue }) => {
    try {
      const response = await managerAPI.getAllAttendance(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch attendance');
    }
  }
);

export const getEmployeeAttendance = createAsyncThunk(
  'manager/getEmployeeAttendance',
  async ({ id, params }, { rejectWithValue }) => {
    try {
      const response = await managerAPI.getEmployeeAttendance(id, params);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch employee attendance');
    }
  }
);

export const getAttendanceSummary = createAsyncThunk(
  'manager/getAttendanceSummary',
  async (params, { rejectWithValue }) => {
    try {
      const response = await managerAPI.getAttendanceSummary(params);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch summary');
    }
  }
);

export const getTodayStatus = createAsyncThunk(
  'manager/getTodayStatus',
  async (_, { rejectWithValue }) => {
    try {
      const response = await managerAPI.getTodayStatus();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch today status');
    }
  }
);

export const getManagerDashboard = createAsyncThunk(
  'manager/getManagerDashboard',
  async (_, { rejectWithValue }) => {
    try {
      const response = await dashboardAPI.getManagerDashboard();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch dashboard');
    }
  }
);

export const exportCSV = createAsyncThunk(
  'manager/exportCSV',
  async (params, { rejectWithValue }) => {
    try {
      const response = await managerAPI.exportCSV(params);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `attendance-report-${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to export CSV');
    }
  }
);

const managerSlice = createSlice({
  name: 'manager',
  initialState: {
    allAttendance: [],
    employeeAttendance: [],
    summary: null,
    todayStatus: null,
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
      
      .addCase(getAllAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.allAttendance = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(getAllAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(getEmployeeAttendance.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEmployeeAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.employeeAttendance = action.payload;
      })
      .addCase(getEmployeeAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(getAttendanceSummary.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAttendanceSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload;
      })
      .addCase(getAttendanceSummary.rejected, (state, action) => {
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
      
      .addCase(getManagerDashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(getManagerDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload;
      })
      .addCase(getManagerDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
     
      .addCase(exportCSV.pending, (state) => {
        state.loading = true;
      })
      .addCase(exportCSV.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(exportCSV.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = managerSlice.actions;
export default managerSlice.reducer;