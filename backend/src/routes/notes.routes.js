const { Router } = require("express");
const router = Router();

const {
  getNotes,
  updateNote,
  deleteNote,
  postNote,
  updateNoteState,
  updateNoteNumber,
  partnerNewCategoryANote,
} = require("../controllers/notes.controller");

router.get("/Notes", getNotes);
router.post("/addNote", postNote);
router.put("/updateNote/:id", updateNote);
router.delete("/deleteNote/:id", deleteNote);
router.put("/updateNoteState/:id", updateNoteState);
router.put("/updateNoteNumber/:id", updateNoteNumber);
router.put("/addCategoryANote/:id", partnerNewCategoryANote);

module.exports = router;
