import express from 'express';
import {
  checkIn,
  checkOut,
  getMyHistory,
  getMySummary,
  getTodayStatus,
  getAllAttendance,
  getEmployeeAttendance,
  getAttendanceSummary,
  getTodayStatusAll,
  exportAttendance
} from '../controllers/attendanceController.js';
import { protect } from '../middlewares/auth.js';
import { authorizeRoles } from '../middlewares/roleCheck.js';

const router = express.Router();


router.post('/checkin', protect, authorizeRoles('employee'), checkIn);
router.post('/checkout', protect, authorizeRoles('employee'), checkOut);
router.get('/my-history', protect, authorizeRoles('employee'), getMyHistory);
router.get('/my-summary', protect, authorizeRoles('employee'), getMySummary);
router.get('/today', protect, authorizeRoles('employee'), getTodayStatus);


router.get('/all', protect, authorizeRoles('manager'), getAllAttendance);
router.get('/employee/:id', protect, authorizeRoles('manager'), getEmployeeAttendance);
router.get('/summary', protect, authorizeRoles('manager'), getAttendanceSummary);
router.get('/today-status', protect, authorizeRoles('manager'), getTodayStatusAll);
router.get('/export', protect, authorizeRoles('manager'), exportAttendance);

export default router;