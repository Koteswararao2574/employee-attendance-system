import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAttendance, exportCSV } from '../../store/slices/managerSlice';
import MainLayout from '../../layout/MainLayout';
import AttendanceTable from '../../components/manager/AttendanceTable';
import { FileText, Download, Filter, Calendar } from 'lucide-react';

const Reports = () => {
  const dispatch = useDispatch();
  const { allAttendance, loading } = useSelector((state) => state.manager);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    department: '',
    status: ''
  });
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    
    setFilters({
      startDate: startOfMonth.toISOString().split('T')[0],
      endDate: endOfMonth.toISOString().split('T')[0],
      department: '',
      status: ''
    });

    dispatch(getAllAttendance({
      startDate: startOfMonth.toISOString().split('T')[0],
      endDate: endOfMonth.toISOString().split('T')[0],
      limit: 1000
    }));
  }, [dispatch]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleGenerateReport = () => {
    dispatch(getAllAttendance({ ...filters, limit: 1000 }));
  };

  const handleExportCSV = async () => {
    setExporting(true);
    try {
      await dispatch(exportCSV(filters)).unwrap();
      alert('Report exported successfully!');
    } catch (error) {
      alert('Failed to export report');
    } finally {
      setExporting(false);
    }
  };

  const calculateStats = () => {
    if (!allAttendance || allAttendance.length === 0) {
      return {
        total: 0,
        present: 0,
        late: 0,
        halfDay: 0,
        totalHours: 0
      };
    }

    return {
      total: allAttendance.length,
      present: allAttendance.filter(a => a.status === 'present').length,
      late: allAttendance.filter(a => a.status === 'late').length,
      halfDay: allAttendance.filter(a => a.status === 'half-day').length,
      totalHours: allAttendance.reduce((sum, a) => sum + (a.totalHours || 0), 0).toFixed(2)
    };
  };

  const stats = calculateStats();

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-xl mr-4">
                <FileText className="text-blue-600" size={32} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Attendance Reports</h1>
                <p className="text-gray-600">Generate and export attendance reports</p>
              </div>
            </div>
            <button
              onClick={handleExportCSV}
              disabled={exporting || !allAttendance || allAttendance.length === 0}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="mr-2" size={20} />
              {exporting ? 'Exporting...' : 'Export CSV'}
            </button>
          </div>
        </div>

       
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center mb-4">
            <Filter className="text-blue-600 mr-2" size={20} />
            <h2 className="text-lg font-bold text-gray-800">Report Filters</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={filters.startDate}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <input
                type="date"
                name="endDate"
                value={filters.endDate}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <select
                name="department"
                value={filters.department}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white"
              >
                <option value="">All Departments</option>
                <option value="Engineering">Engineering</option>
                <option value="HR">HR</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
                <option value="Finance">Finance</option>
                <option value="Operations">Operations</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white"
              >
                <option value="">All Status</option>
                <option value="present">Present</option>
                <option value="late">Late</option>
                <option value="half-day">Half-Day</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={handleGenerateReport}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Generate Report
              </button>
            </div>
          </div>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Total Records</p>
            <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Present</p>
            <p className="text-3xl font-bold text-green-600">{stats.present}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Late</p>
            <p className="text-3xl font-bold text-yellow-600">{stats.late}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Half-Day</p>
            <p className="text-3xl font-bold text-orange-600">{stats.halfDay}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Total Hours</p>
            <p className="text-3xl font-bold text-purple-600">{stats.totalHours}h</p>
          </div>
        </div>

      
        <div>
          {loading ? (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            </div>
          ) : allAttendance && allAttendance.length > 0 ? (
            <AttendanceTable data={allAttendance} />
          ) : (
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
              <Calendar className="mx-auto mb-4 text-gray-400" size={64} />
              <p className="text-lg text-gray-600 mb-2">No records found</p>
              <p className="text-sm text-gray-500">Try adjusting your filters</p>
            </div>
          )}
        </div>

        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
          <h3 className="font-bold text-blue-900 mb-2 flex items-center">
            <Download className="mr-2" size={20} />
            Export Information
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• Click "Export CSV" to download the current report</li>
            <li>• The CSV file will include all filtered records</li>
            <li>• File includes: Employee ID, Name, Department, Date, Times, Hours, and Status</li>
            <li>• Use this data for further analysis in Excel or other tools</li>
          </ul>
        </div>
      </div>
    </MainLayout>
  );
};

export default Reports;