import express from 'express';
import { getEmployeeDashboard, getManagerDashboard } from '../controllers/dashboardController.js';
import { protect } from '../middlewares/auth.js';
import { authorizeRoles } from '../middlewares/roleCheck.js';

const router = express.Router();

router.get('/employee', protect, authorizeRoles('employee'), getEmployeeDashboard);
router.get('/manager', protect, authorizeRoles('manager'), getManagerDashboard);

export default router;