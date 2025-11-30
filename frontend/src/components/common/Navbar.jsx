import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { 
  LayoutDashboard, 
  Calendar, 
  History, 
  User, 
  LogOut, 
  Clock, 
  Users, 
  FileText,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const employeeLinks = [
    { name: 'Dashboard', path: '/employee/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Mark Attendance', path: '/employee/mark-attendance', icon: <Clock size={20} /> },
    { name: 'History', path: '/employee/history', icon: <History size={20} /> },
    { name: 'Profile', path: '/employee/profile', icon: <User size={20} /> },
  ];

  const managerLinks = [
    { name: 'Dashboard', path: '/manager/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'All Attendance', path: '/manager/attendance', icon: <Users size={20} /> },
    { name: 'Team Calendar', path: '/manager/calendar', icon: <Calendar size={20} /> },
    { name: 'Reports', path: '/manager/reports', icon: <FileText size={20} /> },
  ];

  const links = user?.role === 'manager' ? managerLinks : employeeLinks;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <Clock className="text-white" size={24} />
              </div>
              <span className="text-xl font-bold text-gray-800">AttendTrack</span>
            </Link>
          </div>

        
          <div className="hidden md:flex md:items-center md:space-x-1">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  location.pathname === link.path
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {link.icon}
                <span className="font-medium">{link.name}</span>
              </Link>
            ))}
          </div>

         
          <div className="hidden md:flex md:items-center md:space-x-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
            >
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>

          
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-gray-800"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

     
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${
                  location.pathname === link.path
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {link.icon}
                <span className="font-medium">{link.name}</span>
              </Link>
            ))}
            <div className="border-t pt-2 mt-2">
              <div className="px-3 py-2">
                <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center space-x-3 px-3 py-2 w-full text-red-600 hover:bg-red-50 rounded-lg"
              >
                <LogOut size={20} />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;