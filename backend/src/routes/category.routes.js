const { Router } = require("express");
const router = Router();

const {
  createCategory,
  getCategories,
} = require("../controllers/categories.controller");

router.post("/addCategory", createCategory);
router.get("/getCategories", getCategories);

module.exports = router;
