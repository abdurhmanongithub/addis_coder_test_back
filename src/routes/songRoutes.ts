import { Router } from 'express';
import { getSongs, getSongById, createSong, updateSong, deleteSong } from '../controllers/songController';

const router = Router();

// Route to get all songs
router.get('/', getSongs);

// Route to get a specific song by ID
router.get('/:id', getSongById);

// Route to create a new song
router.post('/', createSong);

// Route to update an existing song by ID
router.put('/:id', updateSong);

// Route to delete a song by ID
router.delete('/:id', deleteSong);

export default router;