const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./src/database/database");
const router = require("./src/routes/notes.routes");
const routerCategory = require("./src/routes/category.routes");
const indexroutes = require("./src/routes/index.routes");
app.use(cors());
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3001, function () {
  console.log("bien");
});
app.use(indexroutes);
app.use(router);
app.use(routerCategory);
