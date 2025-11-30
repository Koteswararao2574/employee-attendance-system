import Attendance from '../models/Attendance.js';
import User from '../models/User.js';


export const getEmployeeDashboard = async (req, res) => {
  try {
    const userId = req.user._id;
    
    
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayAttendance = await Attendance.findOne({
      userId,
      date: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
      }
    });

    
    const monthAttendance = await Attendance.find({
      userId,
      date: { $gte: startOfMonth, $lte: endOfMonth }
    });

    
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);
    const recentAttendance = await Attendance.find({
      userId,
      date: { $gte: last7Days }
    }).sort({ date: -1 });

    const stats = {
      todayStatus: todayAttendance,
      monthStats: {
        totalDays: monthAttendance.length,
        present: monthAttendance.filter(a => a.status === 'present').length,
        late: monthAttendance.filter(a => a.status === 'late').length,
        halfDay: monthAttendance.filter(a => a.status === 'half-day').length,
        totalHours: monthAttendance.reduce((sum, a) => sum + (a.totalHours || 0), 0).toFixed(2)
      },
      recentAttendance
    };

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const getManagerDashboard = async (req, res) => {
  try {
  
    const totalEmployees = await User.countDocuments({ role: 'employee' });

   
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayAttendance = await Attendance.find({
      date: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
      }
    }).populate('userId', 'name email employeeId department');

   
    const weeklyData = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);

      const count = await Attendance.countDocuments({
        date: { $gte: date, $lt: nextDay }
      });

      weeklyData.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        present: count
      });
    }

    
    const employees = await User.find({ role: 'employee' });
    const departmentStats = {};
    
    for (const emp of employees) {
      if (!departmentStats[emp.department]) {
        departmentStats[emp.department] = {
          total: 0,
          present: 0
        };
      }
      departmentStats
[emp.department].total++;
}
todayAttendance.forEach(att => {
  const dept = att.userId.department;
  if (departmentStats[dept]) {
    departmentStats[dept].present++;
  }
});

const departmentData = Object.keys(departmentStats).map(dept => ({
  name: dept,
  value: departmentStats[dept].present,
  total: departmentStats[dept].total
}));

const stats = {
  totalEmployees,
  todayPresent: todayAttendance.length,
  todayAbsent: totalEmployees - todayAttendance.length,
  todayLate: todayAttendance.filter(a => a.status === 'late').length,
  weeklyTrend: weeklyData,
  departmentStats: departmentData,
  recentAttendance: todayAttendance.slice(0, 10)
};

res.status(200).json({
  success: true,
  data: stats
});
} catch (error) {
res.status(500).json({
success: false,
message: error.message
});
}
};

      