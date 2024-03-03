const { createAssistant, getAssistantList } = require("../../utils/assistant");

/**
 * 创建助手，与获取列表同名，但方法分别是get｜post
 * @param {*} app 
 */
module.exports = function (app) {
  app.route('/assistants').get(async (req, res) => {
    // get Assistant List
    try {
      const { order, limit } = req.body;
      const assistantLists = await getAssistantList({ order, limit });

      if (assistantLists) {
        res.json({ response: assistantLists });
      } else {
        res.status(500).send("No response received from the assistant.");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred", error);
    }
  }).post(async (req, res) => {
    // POST endpoint to handle chat
    try {
      const { name, instructions, tools, model } = req.body;
      const assistantDetails = await createAssistant({ name, instructions, tools, model });

      if (assistantDetails) {
        res.json({ response: assistantDetails });
      } else {
        res.status(500).send("No response from the assistant-api.");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred");
    }
  });
};