const chat = require('./chat.js'),
  upload = require('./upload'),
  assistants = require('./assistants');

module.exports = function (app) {
  chat(app)
  upload(app)
  assistants(app)
}