import { useSelector } from 'react-redux';
import MainLayout from '../../layout/MainLayout';
import { User, Mail, Briefcase, Calendar, Hash, Shield } from 'lucide-react';
import { formatDate } from '../../utils/dateHelper';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 text-white">
          <div className="flex items-center">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl mr-6">
              <User size={64} />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{user?.name}</h1>
              <p className="text-blue-100 text-lg">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Information</h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-xl mr-4">
                <User className="text-blue-600" size={24} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">Full Name</p>
                <p className="text-lg font-semibold text-gray-800">{user?.name}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-green-100 p-3 rounded-xl mr-4">
                <Mail className="text-green-600" size={24} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">Email Address</p>
                <p className="text-lg font-semibold text-gray-800">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-purple-100 p-3 rounded-xl mr-4">
                <Hash className="text-purple-600" size={24} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">Employee ID</p>
                <p className="text-lg font-semibold text-gray-800">{user?.employeeId}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-orange-100 p-3 rounded-xl mr-4">
                <Briefcase className="text-orange-600" size={24} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">Department</p>
                <p className="text-lg font-semibold text-gray-800">{user?.department}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-red-100 p-3 rounded-xl mr-4">
                <Shield className="text-red-600" size={24} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">Role</p>
                <p className="text-lg font-semibold text-gray-800 capitalize">{user?.role}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-indigo-100 p-3 rounded-xl mr-4">
                <Calendar className="text-indigo-600" size={24} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">Member Since</p>
                <p className="text-lg font-semibold text-gray-800">
                  {user?.createdAt ? formatDate(user.createdAt) : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
              <p className="text-sm text-blue-600 mb-2">Account Status</p>
              <p className="text-2xl font-bold text-blue-900">Active</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
              <p className="text-sm text-green-600 mb-2">Department</p>
              <p className="text-2xl font-bold text-green-900">{user?.department}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
              <p className="text-sm text-purple-600 mb-2">Role</p>
              <p className="text-2xl font-bold text-purple-900 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
          <h3 className="font-bold text-yellow-900 mb-2">Security Notice</h3>
          <p className="text-sm text-yellow-800">
            If you notice any unauthorized changes to your profile or suspicious activity, 
            please contact your administrator immediately.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;