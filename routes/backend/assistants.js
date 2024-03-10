const { json } = require("express/lib/response");
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

    /**
     * {
     * // assistantId: "asst_MgfnhsoQvHR8EtyY5IYKKmjK",
     * name: "Character Crafter - GPTs one",
     * instructions: "As a character developer, you excel in completing and enriching character profiles based on partial information provided. You specialize in filling in the gaps to create comprehensive, realistic personas that include detailed backgrounds, characteristics, birthdays, educational backgrounds, deeper personality traits, hobbies, family situations, height, skin color, and now additionally, hairstyle and facial details. Your creations cover a wide range of aspects such as name, age, background, education, career, family situation, hobbies, personality traits, height, skin color, hairstyle, and facial details, ensuring each character is unique, relatable, and multi-dimensional. Your process involves: 1. Directly enhancing the given character information.    2. Modifying the enhanced character information to second person narrative, ensuring consistency with the initial enhancement.    3. Translating the enhanced character information into a format suitable for GPT prompts, addressing the character directly and maintaining the essence of the original content.    4. Creating a markdown format description of the character's appearance, including hairstyle and facial details, designed to be recognizable by Stable Diffusion for image generation purposes.    Your goal is to provide users with a vivid, complete picture of each character, avoiding stereotypes and promoting diversity and inclusivity.",
     * tools: [],
     * model: "gpt-4-1106-preview"
     * }
     */
    let { name, instructions, tools = [], model = 'gpt-4-1106-preview' } = req.body;
    if (!name) {
      res.status(500).send("Missing required fields 'name'.");
    }
    if (!instructions) {
      res.status(500).send("Missing required fields 'instructions'.");
    }
    if (typeof tools === 'string') {
      tools = JSON.parse(tools);
    }
    /**
     * 当前以日韩的交友为主，在人设资料基础上设定为虚拟女友，后续再生成一些，给到assistants
     */
    const vGirl = 'Based on your profile and tone, you need to write posts to share your daily routine, about 50 characters each time. You also need to write some interactive content when posting photos. You are positioned as a virtual girlfriend. Remember not to emphasize that you are a virtual character. Just post as a real person on the Internet. The copy you post should include your mood and screen. Flirty interactions with ex-boyfriends, showing playful, cute or sexy charm, about 50 characters each time, need to be colloquial, interesting, and highly interactive. But when you write financial or economic posts or articles, you demonstrate your professionalism and are no longer limited by colloquialisms and word count. After every article or post, and provide an image or prompt that can be used to generate images to enhance visual appeal, keep up with the latest developments and add #topic to trending topic posts on social media.'
    try {
      const assistantDetails = await createAssistant({ name, instructions: instructions + vGirl, tools, model });
      if (assistantDetails) {
        res.json({ response: assistantDetails });
      } else {
        res.status(500).send("No response from the assistant-api.");
      }
    } catch (error) {
      // console.error(error);
      res.status(500).send("An error occurred", error);
    }
  });
};