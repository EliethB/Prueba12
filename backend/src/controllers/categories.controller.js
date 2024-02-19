const connection = require("../database/database");
const { validationResult } = require("express-validator");

const createCategory = (req, res) => {
  const { nameCategory } = req.body;

  if (!nameCategory) {
    return res.status(400).json({ error: "Field required: descripción" });
  }
  try {
    connection.query(
      "INSERT INTO categories(nameCategory) VALUES (? )",
      [nameCategory],
      (err, results) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ error: "Error creating category", err });
        } else {
          res.status(200).json({
            success: true,
            message: "Category created with success.",
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getCategories = (req, res) => {
  connection.query("SELECT * FROM categories", (err, results) => {
    if (err) {
      console.error(err);
      return;
    } else {
      res.json(results);
    }
  });
};

module.exports = {
  createCategory,
  getCategories,
};
