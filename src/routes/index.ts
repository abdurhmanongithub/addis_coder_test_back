import { Router } from 'express';
import songRoutes from './songRoutes';
const router = Router();
router.use('/songs', songRoutes);
export default router;
