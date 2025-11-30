import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeeDashboard } from '../../store/slices/attendanceSlice';
import MainLayout from '../../layout/MainLayout';
import CheckInButton from '../../components/employee/CheckInButton';
import AttendanceCard from '../../components/employee/AttendanceCard';
import { Calendar, Clock, TrendingUp, Award } from 'lucide-react';
import { formatTime } from '../../utils/dateHelper';

const EmployeeDashboard = () => {
  const dispatch = useDispatch();
  const { dashboard, loading } = useSelector((state) => state.attendance);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getEmployeeDashboard());
  }, [dispatch]);

  const refreshDashboard = () => {
    dispatch(getEmployeeDashboard());
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}! 👋</h1>
          <p className="text-blue-100">Track your attendance and manage your work hours efficiently</p>
        </div>

        
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <Clock className="mr-2 text-blue-600" />
            Today's Attendance
          </h2>
          
          {dashboard?.todayStatus && (
            <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-xl">
                <p className="text-sm text-blue-600 mb-1">Check In Time</p>
                <p className="text-2xl font-bold text-blue-900">
                  {formatTime(dashboard.todayStatus.checkInTime)}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-xl">
                <p className="text-sm text-green-600 mb-1">Check Out Time</p>
                <p className="text-2xl font-bold text-green-900">
                  {dashboard.todayStatus.checkOutTime ? formatTime(dashboard.todayStatus.checkOutTime) : 'Not yet'}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-xl">
                <p className="text-sm text-purple-600 mb-1">Total Hours</p>
                <p className="text-2xl font-bold text-purple-900">
                  {dashboard.todayStatus.totalHours || 0}h
                </p>
              </div>
            </div>
          )}

          <CheckInButton 
            todayStatus={dashboard?.todayStatus} 
            onSuccess={refreshDashboard}
          />
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Days</p>
                <p className="text-3xl font-bold text-gray-800">{dashboard?.monthStats?.totalDays || 0}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-xl">
                <Calendar className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Present</p>
                <p className="text-3xl font-bold text-green-600">{dashboard?.monthStats?.present || 0}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-xl">
                <Award className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Late Arrivals</p>
                <p className="text-3xl font-bold text-yellow-600">{dashboard?.monthStats?.late || 0}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-xl">
                <Clock className="text-yellow-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Hours</p>
                <p className="text-3xl font-bold text-purple-600">{dashboard?.monthStats?.totalHours || 0}h</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-xl">
                <TrendingUp className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
        </div>

       
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Attendance (Last 7 Days)</h2>
          
          {dashboard?.recentAttendance && dashboard.recentAttendance.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dashboard.recentAttendance.map((attendance) => (
                <AttendanceCard key={attendance._id} attendance={attendance} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="mx-auto mb-4 text-gray-400" size={48} />
              <p>No recent attendance records</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default EmployeeDashboard;