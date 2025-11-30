import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, setLoading } from './store/slices/authSlice';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Employee Pages
import EmployeeDashboard from './pages/employee/Dashboard';
import MarkAttendance from './pages/employee/MarkAttendance';
import AttendanceHistory from './pages/employee/AttendanceHistory';
import Profile from './pages/employee/Profile';

// Manager Pages
import ManagerDashboard from './pages/manager/Dashboard';
import AllAttendance from './pages/manager/AllAttendance';
import TeamCalendar from './pages/manager/TeamCalendar';
import Reports from './pages/manager/Reports';

// Components
import ProtectedRoute from './components/common/ProtectedRoute';
import Loader from './components/common/Loader';

function App() {
  const dispatch = useDispatch();
  const { loading, isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(loadUser());
    } else {
      // If no token, set loading to false so user can see login page
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/login" 
          element={!isAuthenticated ? <Login /> : <Navigate to={user?.role === 'manager' ? '/manager/dashboard' : '/employee/dashboard'} />} 
        />
        <Route 
          path="/register" 
          element={!isAuthenticated ? <Register /> : <Navigate to={user?.role === 'manager' ? '/manager/dashboard' : '/employee/dashboard'} />} 
        />

        {/* Employee Routes */}
        <Route 
          path="/employee/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['employee']}>
              <EmployeeDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/employee/mark-attendance" 
          element={
            <ProtectedRoute allowedRoles={['employee']}>
              <MarkAttendance />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/employee/history" 
          element={
            <ProtectedRoute allowedRoles={['employee']}>
              <AttendanceHistory />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/employee/profile" 
          element={
            <ProtectedRoute allowedRoles={['employee']}>
              <Profile />
            </ProtectedRoute>
          } 
        />

        {/* Manager Routes */}
        <Route 
          path="/manager/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['manager']}>
              <ManagerDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/manager/attendance" 
          element={
            <ProtectedRoute allowedRoles={['manager']}>
              <AllAttendance />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/manager/calendar" 
          element={
            <ProtectedRoute allowedRoles={['manager']}>
              <TeamCalendar />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/manager/reports" 
          element={
            <ProtectedRoute allowedRoles={['manager']}>
              <Reports />
            </ProtectedRoute>
          } 
        />

        {/* Default Redirect */}
        <Route 
          path="/" 
          element={
            isAuthenticated ? 
              <Navigate to={user?.role === 'manager' ? '/manager/dashboard' : '/employee/dashboard'} /> 
              : <Navigate to="/login" />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;