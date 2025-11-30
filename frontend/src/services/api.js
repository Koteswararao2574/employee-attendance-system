import axios from '../utils/axios';

// Auth APIs
export const authAPI = {
  register: (data) => axios.post('/auth/register', data),
  login: (data) => axios.post('/auth/login', data),
  getMe: () => axios.get('/auth/me'),
};

// Employee Attendance APIs
export const attendanceAPI = {
  checkIn: () => axios.post('/attendance/checkin'),
  checkOut: () => axios.post('/attendance/checkout'),
  getMyHistory: (params) => axios.get('/attendance/my-history', { params }),
  getMySummary: (params) => axios.get('/attendance/my-summary', { params }),
  getTodayStatus: () => axios.get('/attendance/today'),
};

// Manager Attendance APIs
export const managerAPI = {
  getAllAttendance: (params) => axios.get('/attendance/all', { params }),
  getEmployeeAttendance: (id, params) => axios.get(`/attendance/employee/${id}`, { params }),
  getAttendanceSummary: (params) => axios.get('/attendance/summary', { params }),
  getTodayStatus: () => axios.get('/attendance/today-status'),
  exportCSV: (params) => axios.get('/attendance/export', { 
    params,
    responseType: 'blob'
  }),
};

// Dashboard APIs
export const dashboardAPI = {
  getEmployeeDashboard: () => axios.get('/dashboard/employee'),
  getManagerDashboard: () => axios.get('/dashboard/manager'),
};