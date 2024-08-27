import { Router } from 'express';
import { getSongs, getSongById, createSong, updateSong, deleteSong, getStatistics } from '../controllers/songController';

const router = Router();
router.get('/', getSongs);

router.get('/statistics', getStatistics);

router.get('/:id', getSongById);

router.post('/', createSong);

router.put('/:id', updateSong);

router.delete('/:id', deleteSong);

export default router;