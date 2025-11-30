import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodayStatus } from '../../store/slices/attendanceSlice';
import MainLayout from '../../layout/MainLayout';
import CheckInButton from '../../components/employee/CheckInButton';
import { Clock, CheckCircle, Calendar } from 'lucide-react';
import { formatTime, formatDate } from '../../utils/dateHelper';

const MarkAttendance = () => {
  const dispatch = useDispatch();
  const { todayStatus, loading } = useSelector((state) => state.attendance);

  useEffect(() => {
    dispatch(getTodayStatus());
  }, [dispatch]);

  const refreshStatus = () => {
    dispatch(getTodayStatus());
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-xl mr-4">
              <Clock className="text-blue-600" size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Mark Attendance</h1>
              <p className="text-gray-600">{formatDate(new Date())}</p>
            </div>
          </div>
        </div>

        {/* Current Time */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 text-white text-center">
          <p className="text-lg mb-2">Current Time</p>
          <p className="text-5xl font-bold">{new Date().toLocaleTimeString()}</p>
        </div>

        {/* Status Card */}
        {todayStatus && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <CheckCircle className="mr-2 text-green-600" />
              Today's Status
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl">
                <span className="text-gray-700 font-medium">Check In Time</span>
                <span className="text-blue-600 font-bold text-lg">
                  {formatTime(todayStatus.checkInTime)}
                </span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl">
                <span className="text-gray-700 font-medium">Check Out Time</span>
                <span className="text-green-600 font-bold text-lg">
                  {todayStatus.checkOutTime ? formatTime(todayStatus.checkOutTime) : 'Not yet'}
                </span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-purple-50 rounded-xl">
                <span className="text-gray-700 font-medium">Total Hours</span>
                <span className="text-purple-600 font-bold text-lg">
                  {todayStatus.totalHours || 0} hours
                </span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-xl">
                <span className="text-gray-700 font-medium">Status</span>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  todayStatus.status === 'present' ? 'bg-green-200 text-green-800' :
                  todayStatus.status === 'late' ? 'bg-yellow-200 text-yellow-800' :
                  'bg-orange-200 text-orange-800'
                }`}>
                  {todayStatus.status.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Check In/Out Button */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <CheckInButton todayStatus={todayStatus} onSuccess={refreshStatus} />
        </div>

        {/* Guidelines */}
        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
          <h3 className="font-bold text-blue-900 mb-3 flex items-center">
            <Calendar className="mr-2" size={20} />
            Attendance Guidelines
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Check in before 9:15 AM to be marked as "Present"</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Check in after 9:15 AM will be marked as "Late"</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Work less than 4 hours will be marked as "Half-Day"</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Remember to check out before leaving</span>
            </li>
          </ul>
        </div>
      </div>
    </MainLayout>
  );
};

export default MarkAttendance;