import { Router } from 'express';
import authRoutes from './peauth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/peauth.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/api', authenticateToken, apiRoutes);

export default router;
