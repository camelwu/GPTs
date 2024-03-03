const { chat } = require("../../controllers");

/**
 * 
 * 与gpt聊天， 需要带着assistantID或thread.id
 * @param {*} app 
 */
module.exports = function (app) {
  // POST endpoint to handle chat
  app.post("/chat/:aid", chat.control);
  app.post("/chat/:aid/:tid", chat.control);
};