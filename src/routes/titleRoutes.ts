import { Router } from 'express';
import { getTitles, getTitleById, createTitle, updateTitle, deleteTitle } from '../controllers/titleController';

const router = Router();

// Route to get all titles
router.get('/', getTitles);

// Route to get a specific title by ID
router.get('/:id', getTitleById);

// Route to create a new title
router.post('/', createTitle);

// Route to update an existing title by ID
router.put('/:id', updateTitle);

// Route to delete a title by ID
router.delete('/:id', deleteTitle);

export default router;