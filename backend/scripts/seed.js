import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../src/models/User.js';
import Attendance from '../src/models/Attendance.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

const departments = ['Engineering', 'HR', 'Sales', 'Marketing', 'Finance'];
const statuses = ['present', 'late', 'half-day'];

const seedData = async () => {
  try {
    await connectDB();

    
    await User.deleteMany({});
    await Attendance.deleteMany({});
    console.log('🗑️  Cleared existing data');

   
    const hashedPassword = await bcrypt.hash('manager123', 10);
    const manager = await User.create({
      name: 'John Manager',
      email: 'manager@company.com',
      password: hashedPassword,
      role: 'manager',
      employeeId: 'MGR001',
      department: 'Management'
    });
    console.log('✅ Created manager account');

    
    const employees = [];
    for (let i = 1; i <= 10; i++) {
      const employee = await User.create({
        name: `Employee ${i}`,
        email: `employee${i}@company.com`,
        password: hashedPassword,
        role: 'employee',
        employeeId: `EMP${String(i).padStart(3, '0')}`,
        department: departments[Math.floor(Math.random() * departments.length)]
      });
      employees.push(employee);
    }
    console.log('✅ Created 10 employees');

    
    const attendanceRecords = [];
    const today = new Date();

    for (const employee of employees) {
      for (let day = 0; day < 30; day++) {
        
        if (Math.random() > 0.85) continue;

        const date = new Date(today);
        date.setDate(date.getDate() - day);
        date.setHours(0, 0, 0, 0);

        
        const checkInHour = 8 + Math.floor(Math.random() * 2);
        const checkInMinute = Math.floor(Math.random() * 60);
        const checkInTime = new Date(date);
        checkInTime.setHours(checkInHour, checkInMinute, 0);

        
        const checkOutHour = 17 + Math.floor(Math.random() * 3);
        const checkOutMinute = Math.floor(Math.random() * 60);
        const checkOutTime = new Date(date);
        checkOutTime.setHours(checkOutHour, checkOutMinute, 0);

        
        const totalHours = (checkOutTime - checkInTime) / (1000 * 60 * 60);

        
        let status = 'present';
        if (checkInHour >= 9 && checkInMinute > 15) {
          status = 'late';
        } else if (totalHours < 4) {
          status = 'half-day';
        }

        attendanceRecords.push({
          userId: employee._id,
          date: date,
          checkInTime: checkInTime,
          checkOutTime: checkOutTime,
          totalHours: Number(totalHours.toFixed(2)),
          status: status
        });
      }
    }

    await Attendance.insertMany(attendanceRecords);
    console.log(`✅ Created ${attendanceRecords.length} attendance records`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📧 Login Credentials:');
    console.log('Manager - email: manager@company.com, password: manager123');
    console.log('Employee - email: employee1@company.com, password: employee123');
    console.log('(employee2@company.com through employee10@company.com also available)\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedData();
