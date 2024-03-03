const multer = require("multer");
// Multer for file upload
const upload = multer({ dest: "uploads/" });

module.exports = upload;