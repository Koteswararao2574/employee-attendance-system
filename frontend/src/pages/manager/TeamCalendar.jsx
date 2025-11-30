import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAttendance } from '../../store/slices/managerSlice';
import MainLayout from '../../layout/MainLayout';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Calendar as CalendarIcon, Users } from 'lucide-react';
import { formatDate, getStatusColor } from '../../utils/dateHelper';

const TeamCalendar = () => {
  const dispatch = useDispatch();
  const { allAttendance, loading } = useSelector((state) => state.manager);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDateRecords, setSelectedDateRecords] = useState([]);

  useEffect(() => {
    // Fetch last 30 days of attendance
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    
    dispatch(getAllAttendance({
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      limit: 1000
    }));
  }, [dispatch]);

  useEffect(() => {
    // Filter records for selected date
    if (selectedDate && allAttendance) {
      const records = allAttendance.filter(record => {
        const recordDate = new Date(record.date);
        return recordDate.toDateString() === selectedDate.toDateString();
      });
      setSelectedDateRecords(records);
    }
  }, [selectedDate, allAttendance]);

  const getTileClassName = ({ date }) => {
    const hasRecords = allAttendance?.some(record => {
      const recordDate = new Date(record.date);
      return recordDate.toDateString() === date.toDateString();
    });

    return hasRecords ? 'has-attendance' : null;
  };

  const tileContent = ({ date }) => {
    const dayRecords = allAttendance?.filter(record => {
      const recordDate = new Date(record.date);
      return recordDate.toDateString() === date.toDateString();
    });

    if (dayRecords && dayRecords.length > 0) {
      const present = dayRecords.filter(r => r.status === 'present' || r.status === 'late').length;
      return (
        <div className="text-xs mt-1">
          <div className="bg-green-500 text-white rounded-full px-1 inline-block">
            {present}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-xl mr-4">
              <CalendarIcon className="text-purple-600" size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Team Calendar</h1>
              <p className="text-gray-600">View team attendance in calendar format</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Calendar View</h2>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              </div>
            ) : (
              <>
                <div className="flex justify-center mb-6">
                  <Calendar
                    onChange={setSelectedDate}
                    value={selectedDate}
                    tileClassName={getTileClassName}
                    tileContent={tileContent}
                    className="w-full"
                  />
                </div>
                <div className="flex flex-wrap gap-4 justify-center text-sm">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-gray-600">Has Attendance</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-gray-300 mr-2"></div>
                    <span className="text-gray-600">No Records</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Selected Date Details */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              {formatDate(selectedDate)}
            </h2>

            {selectedDateRecords.length > 0 ? (
              <>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Total Present</span>
                    <span className="text-2xl font-bold text-green-600">
                      {selectedDateRecords.filter(r => r.status === 'present' || r.status === 'late').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Late Arrivals</span>
                    <span className="text-2xl font-bold text-yellow-600">
                      {selectedDateRecords.filter(r => r.status === 'late').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Half Day</span>
                    <span className="text-2xl font-bold text-orange-600">
                      {selectedDateRecords.filter(r => r.status === 'half-day').length}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-bold text-gray-800 mb-3">Employees</h3>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {selectedDateRecords.map((record) => (
                      <div key={record._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div>
                          <p className="text-sm font-medium text-gray-800">{record.userId?.name}</p>
                          <p className="text-xs text-gray-500">{record.userId?.department}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(record.status)}`}>
                          {record.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <CalendarIcon className="mx-auto mb-4 text-gray-400" size={48} />
                <p>No attendance records</p>
                <p className="text-sm">for this date</p>
              </div>
            )}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-green-900">Present</h3>
              <Users className="text-green-600" size={24} />
            </div>
            <p className="text-3xl font-bold text-green-900">
              {allAttendance?.filter(r => r.status === 'present').length || 0}
            </p>
            <p className="text-sm text-green-700 mt-1">Last 30 days</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-yellow-900">Late</h3>
              <Users className="text-yellow-600" size={24} />
            </div>
            <p className="text-3xl font-bold text-yellow-900">
              {allAttendance?.filter(r => r.status === 'late').length || 0}
            </p>
            <p className="text-sm text-yellow-700 mt-1">Last 30 days</p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-orange-900">Half-Day</h3>
              <Users className="text-orange-600" size={24} />
            </div>
            <p className="text-3xl font-bold text-orange-900">
              {allAttendance?.filter(r => r.status === 'half-day').length || 0}
            </p>
            <p className="text-sm text-orange-700 mt-1">Last 30 days</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-blue-900">Total Records</h3>
              <CalendarIcon className="text-blue-600" size={24} />
            </div>
            <p className="text-3xl font-bold text-blue-900">
              {allAttendance?.length || 0}
            </p>
            <p className="text-sm text-blue-700 mt-1">Last 30 days</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TeamCalendar;