import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  checkInTime: {
    type: Date,
    required: true
  },
  checkOutTime: {
    type: Date,
    default: null
  },
  totalHours: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['present', 'absent', 'late', 'half-day'],
    default: 'present'
  }
}, {
  timestamps: true
});


attendanceSchema.index({ userId: 1, date: -1 });
attendanceSchema.index({ date: -1 });


attendanceSchema.pre('save', function(next) {
  if (this.checkInTime && !this.isModified('status')) {
    const checkInHour = this.checkInTime.getHours();
    const checkInMinute = this.checkInTime.getMinutes();
    const checkInTotalMinutes = checkInHour * 60 + checkInMinute;
    
    
    if (checkInTotalMinutes > 555) {
      this.status = 'late';
    }
  }
  
  
  if (this.checkOutTime && this.checkInTime) {
    const diff = this.checkOutTime - this.checkInTime;
    this.totalHours = Number((diff / (1000 * 60 * 60)).toFixed(2));
    
    
    if (this.totalHours < 4 && this.status !== 'late') {
      this.status = 'half-day';
    }
  }
  
  next();
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;