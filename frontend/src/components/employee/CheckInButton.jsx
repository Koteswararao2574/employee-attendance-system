import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { checkIn, checkOut } from '../../store/slices/attendanceSlice';
import { Clock, LogIn, LogOut } from 'lucide-react';

const CheckInButton = ({ todayStatus, onSuccess }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleCheckIn = async () => {
    setLoading(true);
    try {
      await dispatch(checkIn()).unwrap();
      onSuccess && onSuccess();
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    setLoading(true);
    try {
      await dispatch(checkOut()).unwrap();
      onSuccess && onSuccess();
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  if (!todayStatus) {
    return (
      <button
        onClick={handleCheckIn}
        disabled={loading}
        className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center space-x-3"
      >
        <LogIn size={24} />
        <span>{loading ? 'Checking In...' : 'Check In'}</span>
      </button>
    );
  }

  if (!todayStatus.checkOutTime) {
    return (
      <button
        onClick={handleCheckOut}
        disabled={loading}
        className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-red-600 hover:to-red-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center space-x-3"
      >
        <LogOut size={24} />
        <span>{loading ? 'Checking Out...' : 'Check Out'}</span>
      </button>
    );
  }

  return (
    <div className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl font-semibold text-lg text-center shadow-lg flex items-center justify-center space-x-3">
      <Clock size={24} />
      <span>Attendance Marked for Today</span>
    </div>
  );
};

export default CheckInButton;