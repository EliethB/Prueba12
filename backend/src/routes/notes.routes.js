const { Router } = require('express');
const router = Router();

const { getNotes,updateNote, deleteNote, postNote, updateNoteState, updateNoteNumber } = require('../controllers/notes.controller');

router.get('/Notes', getNotes)
router.post('/addNote', postNote);
router.put('/updateNote/:id', updateNote);
router.delete('/deleteNote/:id', deleteNote);
router.put('/updateNoteState/:id', updateNoteState);
router.put('/updateNoteNumber/:id', updateNoteNumber);
module.exports = router;