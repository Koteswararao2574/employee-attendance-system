# Employee Attendance System

A full-stack web application for tracking employee attendance with role-based access control. The system allows employees to check in/out and provides managers with comprehensive attendance reports and analytics.

## Features

### Employee Features
- ✅ User authentication (Login/Register)
- ✅ Check-in/Check-out functionality
- ✅ View personal attendance history
- ✅ View attendance statistics and profile
- ✅ Real-time attendance status tracking

### Manager Features
- ✅ Dashboard with team attendance overview
- ✅ View all employees' attendance records
- ✅ Attendance analytics and charts
- ✅ Team calendar view
- ✅ Export attendance reports to CSV
- ✅ Filter and search attendance records

## Tech Stack

### Backend
- **Node.js** with **Express.js** - RESTful API server
- **MongoDB** with **Mongoose** - Database
- **JWT** (JSON Web Tokens) - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **json2csv** - CSV export functionality

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **React Calendar** - Calendar component
- **Axios** - HTTP client
- **date-fns** - Date utilities


## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)

## Installation

### 1. Clone the repository
git clone <repository-url>
cd employee-attendance-system### 2. Backend Setup

cd backend
npm installCreate a `.env` file in the `backend` directory:v
MONGODB_URI=mongodb://localhost:27017/attendance-system
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/attendance-system

JWT_SECRET=your-secret-key-here
PORT=5000
FRONTEND_URL=http://localhost:5173### 3. Frontend Setup

cd frontend
npm installCreate a `.env` file in the `frontend` directory (if needed):
VITE_API_URL=http://localhost:5000/api## Running the Application

### Development Mode

1. **Start MongoDB** (if running locally)sh
   mongod
   2. **Start Backend Server**
   cd backend
   npm run dev
      Server will run on `http://localhost:5000`

3. **Start Frontend Development Server**
   cd frontend
   npm run dev
      Frontend will run on `http://localhost:5173`

### Production Mode

1. **Build Frontend**
   
   cd frontend
   npm run build
   2. **Start Backend**
   cd backend
   npm start
   ## Database Seeding

To seed the database with sample data:
cd backend
node scripts/seed.js## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)

### Attendance
- `POST /api/attendance/checkin` - Check in (protected)
- `POST /api/attendance/checkout` - Check out (protected)
- `GET /api/attendance/history` - Get attendance history (protected)
- `GET /api/attendance/today` - Get today's attendance (protected)

### Dashboard (Manager Only)
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/attendance` - Get all attendance records
- `GET /api/dashboard/export` - Export attendance to CSV

## User Roles

- **Employee**: Can check in/out and view their own attendance
- **Manager**: Can view all employees' attendance, generate reports, and access analytics

## Attendance Status

The system automatically calculates attendance status:
- **Present**: Normal check-in before 9:15 AM
- **Late**: Check-in after 9:15 AM
- **Half-day**: Total hours less than 4 hours
- **Absent**: No check-in recorded

## Environment Variables

### Backend (.env)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `PORT` - Server port (default: 5000)
- `FRONTEND_URL` - Frontend URL for CORS

### Frontend (.env)
- `VITE_API_URL` - Backend API URL

## Security Features

- Password hashing with bcryptjs
- JWT-based authentication
- Role-based access control (RBAC)
- Input validation with express-validator
- CORS configuration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Author

Koteswara Rao

## Support

For support, email [your-email] or open an issue in the repository.

2. Backend Setup
cd backendnpm install
Create a .env file in the backend directory:
MONGODB_URI=mongodb://localhost:27017/attendance-system# OR for MongoDB Atlas:# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/attendance-systemJWT_SECRET=your-secret-key-herePORT=5000FRONTEND_URL=http://localhost:5173
3. Frontend Setup
cd frontendnpm install
Create a .env file in the frontend directory (if needed):
VITE_API_URL=http://localhost:5000/api
Running the Application
Development Mode
Start MongoDB (if running locally)
   mongod
Start Backend Server
   cd backend   npm run dev
Server will run on http://localhost:5000
Start Frontend Development Server
   cd frontend   npm run dev
Frontend will run on http://localhost:5173
Production Mode
Build Frontend
   cd frontend   npm run build
Start Backend
   cd backend   npm start
Database Seeding
To seed the database with sample data:
cd backendnode scripts/seed.js
API Endpoints
Authentication
POST /api/auth/register - Register new user
POST /api/auth/login - User login
GET /api/auth/me - Get current user (protected)
Attendance
POST /api/attendance/checkin - Check in (protected)
POST /api/attendance/checkout - Check out (protected)
GET /api/attendance/history - Get attendance history (protected)
GET /api/attendance/today - Get today's attendance (protected)
Dashboard (Manager Only)
GET /api/dashboard/stats - Get dashboard statistics
GET /api/dashboard/attendance - Get all attendance records
GET /api/dashboard/export - Export attendance to CSV
User Roles
Employee: Can check in/out and view their own attendance
Manager: Can view all employees' attendance, generate reports, and access analytics
Attendance Status
The system automatically calculates attendance status:
Present: Normal check-in before 9:15 AM
Late: Check-in after 9:15 AM
Half-day: Total hours less than 4 hours
Absent: No check-in recorded
Environment Variables
Backend (.env)
MONGODB_URI - MongoDB connection string
JWT_SECRET - Secret key for JWT tokens
PORT - Server port (default: 5000)
FRONTEND_URL - Frontend URL for CORS
Frontend (.env)
VITE_API_URL - Backend API URL
Security Features
Password hashing with bcryptjs
JWT-based authentication
Role-based access control (RBAC)
Input validation with express-validator
CORS configuration
Contributing
Fork the repository
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request
License
This project is licensed under the ISC License.
Author
Koteswara Rao
