import { formatDate, formatTime, getStatusColor } from '../../utils/dateHelper';

const AttendanceCard = ({ attendance }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm text-gray-500">Date</p>
          <p className="text-lg font-semibold text-gray-800">{formatDate(attendance.date)}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(attendance.status)}`}>
          {attendance.status.toUpperCase()}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">Check In</p>
          <p className="text-sm font-medium text-gray-800">{formatTime(attendance.checkInTime)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Check Out</p>
          <p className="text-sm font-medium text-gray-800">
            {attendance.checkOutTime ? formatTime(attendance.checkOutTime) : 'N/A'}
          </p>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">Total Hours</p>
          <p className="text-lg font-bold text-blue-600">{attendance.totalHours || 0}h</p>
        </div>
      </div>
    </div>
  );
};

export default AttendanceCard;