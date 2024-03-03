// const fs = require("fs");
const upload = require("../../utils/upload");
// const { retrieveAssistant } = require("../../utils/assistant");
const { uploader } = require("../../controllers");

// require("dotenv").config();

module.exports = function (app) {
  // POST endpoint for file upload, need assistantID and fetch file_ids
  app.post("/upload", upload.single("file"), uploader.control);
  app.post("/upload/:aid", upload.single("file"), uploader.control);
};