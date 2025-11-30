import { formatDate, formatTime, getStatusColor } from '../../utils/dateHelper';

const AttendanceTable = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8 text-center">
        <p className="text-gray-500">No attendance records found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">Employee</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Department</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Check In</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Check Out</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Hours</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((record, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-gray-800">{record.userId?.name}</p>
                    <p className="text-xs text-gray-500">{record.userId?.employeeId}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{record.userId?.department}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{formatDate(record.date)}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{formatTime(record.checkInTime)}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {record.checkOutTime ? formatTime(record.checkOutTime) : 'N/A'}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-blue-600">
                  {record.totalHours || 0}h
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(record.status)}`}>
                    {record.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceTable;