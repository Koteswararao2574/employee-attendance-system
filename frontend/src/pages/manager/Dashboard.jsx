import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getManagerDashboard } from '../../store/slices/managerSlice';
import MainLayout from '../../layout/MainLayout';
import StatsCard from '../../components/manager/StatsCard';
import { WeeklyTrendChart, DepartmentChart } from '../../components/manager/AttendanceChart';
import { Users, CheckCircle, XCircle, Clock, TrendingUp } from 'lucide-react';
import { formatTime } from '../../utils/dateHelper';

const ManagerDashboard = () => {
  const dispatch = useDispatch();
  const { dashboard, loading } = useSelector((state) => state.manager);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getManagerDashboard());
  }, [dispatch]);

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
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Manager Dashboard 📊</h1>
          <p className="text-indigo-100">Welcome back, {user?.name}! Monitor team attendance and performance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Employees"
            value={dashboard?.totalEmployees || 0}
            icon={<Users className="text-white" size={28} />}
            color="blue"
            subtitle="Active employees"
          />
          <StatsCard
            title="Present Today"
            value={dashboard?.todayPresent || 0}
            icon={<CheckCircle className="text-white" size={28} />}
            color="green"
            subtitle={`${dashboard?.totalEmployees ? Math.round((dashboard?.todayPresent / dashboard?.totalEmployees) * 100) : 0}% attendance`}
          />
          <StatsCard
            title="Absent Today"
            value={dashboard?.todayAbsent || 0}
            icon={<XCircle className="text-white" size={28} />}
            color="red"
            subtitle="Not checked in"
          />
          <StatsCard
            title="Late Arrivals"
            value={dashboard?.todayLate || 0}
            icon={<Clock className="text-white" size={28} />}
            color="yellow"
            subtitle="After 9:15 AM"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {dashboard?.weeklyTrend && (
            <WeeklyTrendChart data={dashboard.weeklyTrend} />
          )}
          {dashboard?.departmentStats && (
            <DepartmentChart data={dashboard.departmentStats} />
          )}
        </div>

        {/* Recent Attendance */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Today's Attendance</h2>
            <span className="text-sm text-gray-600">
              {dashboard?.recentAttendance?.length || 0} employees checked in
            </span>
          </div>
          
          {dashboard?.recentAttendance && dashboard.recentAttendance.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Check In
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {dashboard.recentAttendance.map((attendance) => (
                    <tr key={attendance._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="font-medium text-gray-900">{attendance.userId?.name}</p>
                          <p className="text-xs text-gray-500">{attendance.userId?.employeeId}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {attendance.userId?.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {formatTime(attendance.checkInTime)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          attendance.status === 'present' ? 'bg-green-100 text-green-800' :
                          attendance.status === 'late' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {attendance.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Users className="mx-auto mb-4 text-gray-400" size={64} />
              <p className="text-lg">No attendance records for today</p>
            </div>
          )}
        </div>

        {/* Performance Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-blue-900">Attendance Rate</h3>
              <TrendingUp className="text-blue-600" size={24} />
            </div>
            <p className="text-3xl font-bold text-blue-900">
              {dashboard?.totalEmployees ? Math.round((dashboard?.todayPresent / dashboard?.totalEmployees) * 100) : 0}%
            </p>
            <p className="text-sm text-blue-700 mt-2">Overall attendance today</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-green-900">On Time</h3>
              <CheckCircle className="text-green-600" size={24} />
            </div>
            <p className="text-3xl font-bold text-green-900">
              {(dashboard?.todayPresent || 0) - (dashboard?.todayLate || 0)}
            </p>
            <p className="text-sm text-green-700 mt-2">Employees on time</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-purple-900">Departments</h3>
              <Users className="text-purple-600" size={24} />
            </div>
            <p className="text-3xl font-bold text-purple-900">
              {dashboard?.departmentStats?.length || 0}
            </p>
            <p className="text-sm text-purple-700 mt-2">Active departments</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ManagerDashboard;