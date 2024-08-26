"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const songController_1 = require("../controllers/songController");
const router = (0, express_1.Router)();
// Route to get all songs
router.get('/', songController_1.getSongs);
// Route to get a specific song by ID
router.get('/:id', songController_1.getSongById);
// Route to create a new song
router.post('/', songController_1.createSong);
// Route to update an existing song by ID
router.put('/:id', songController_1.updateSong);
// Route to delete a song by ID
router.delete('/:id', songController_1.deleteSong);
exports.default = router;
