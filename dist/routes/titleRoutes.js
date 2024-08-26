"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const titleController_1 = require("../controllers/titleController");
const router = (0, express_1.Router)();
// Route to get all titles
router.get('/', titleController_1.getTitles);
// Route to get a specific title by ID
router.get('/:id', titleController_1.getTitleById);
// Route to create a new title
router.post('/', titleController_1.createTitle);
// Route to update an existing title by ID
router.put('/:id', titleController_1.updateTitle);
// Route to delete a title by ID
router.delete('/:id', titleController_1.deleteTitle);
exports.default = router;
