#! /usr/local/bin/node Node
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require('./routes');
require("dotenv").config();
// const uuid = require('./utils/uuid');
// Initialize Express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Router by controller
routes(app)

// Start the server, port limit from 39000 to 40000, I'll use 39100 ~ 39199.
const PORT = process.env.PORT || 39100;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});