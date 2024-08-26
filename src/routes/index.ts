import { Router } from 'express';
import titleRoutes from './titleRoutes';
const router = Router();
router.use('/titles', titleRoutes);
export default router;
