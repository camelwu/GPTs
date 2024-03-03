const OpenAI = require("openai");
const fsPromises = require("fs").promises,
  path = require('path');
require("dotenv").config();
// Initialize OpenAI
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Async function to get existing assistant list
async function getAssistantList(assistantConfig = { order: "desc" }) {
  let assistantLists;

  try {
    const assistant = await openai.beta.assistants.list(assistantConfig);
    assistantLists = assistant.data
  } catch (error) {
    console.error("Error creating assistant:", error);
  }

  return assistantLists;
}
// Async function to create assistant
async function createAssistant(assistantConfig) {
  let assistantDetails;
  if (!assistantConfig) {
    return assistantDetails;
  }
  try {
    // create a new assistant
    const assistant = openai.beta.assistants.create(assistantConfig);
    assistantDetails = { assistantId: assistant.id, ...assistantConfig };
  } catch (error) {
    console.error("Error creating assistant:", error);
  }

  return assistantDetails;
}
// Async function to retrieve existing assistant
async function retrieveAssistant(assistantId) {
  let assistantDetails;
  if (!assistantId) {
    return assistantDetails;
  }

  try {
    assistantDetails = openai.beta.assistants.retrieve(assistantId);
  } catch (error) {
    console.error("Error retrieve assistant:", error);
  }

  return assistantDetails;
}
// Async function to create or get existing assistant
async function getOrCreateAssistant() {
  const assistantFilePath = path.resolve("/", "assistant.json");
  let assistantDetails;

  try {
    // Check if the assistant.json file exists
    const assistantData = await fsPromises.readFile(assistantFilePath, "utf8");
    assistantDetails = JSON.parse(assistantData);
  } catch (error) {
    // If file does not exist, create a new assistant
    const assistantConfig = {
      // assistantId: "asst_MgfnhsoQvHR8EtyY5IYKKmjK",
      name: "Character Crafter - GPTs one",
      instructions: "As a character developer, you excel in completing and enriching character profiles based on partial information provided. You specialize in filling in the gaps to create comprehensive, realistic personas that include detailed backgrounds, characteristics, birthdays, educational backgrounds, deeper personality traits, hobbies, family situations, height, skin color, and now additionally, hairstyle and facial details. Your creations cover a wide range of aspects such as name, age, background, education, career, family situation, hobbies, personality traits, height, skin color, hairstyle, and facial details, ensuring each character is unique, relatable, and multi-dimensional. Your process involves: 1. Directly enhancing the given character information.    2. Modifying the enhanced character information to second person narrative, ensuring consistency with the initial enhancement.    3. Translating the enhanced character information into a format suitable for GPT prompts, addressing the character directly and maintaining the essence of the original content.    4. Creating a markdown format description of the character's appearance, including hairstyle and facial details, designed to be recognizable by Stable Diffusion for image generation purposes.    Your goal is to provide users with a vivid, complete picture of each character, avoiding stereotypes and promoting diversity and inclusivity.",
      // "tools": [],
      model: "gpt-4-1106-preview"
    };
    // console.log("Assistant function:", openai.beta.assistants.get(assistantConfig));

    const assistant = openai.beta.assistants.retrieve(assistantConfig.assistantId);
    assistantDetails = { assistantId: assistant.id, ...assistantConfig };
    // Save the assistant details to assistant.json
    await fsPromises.writeFile(
      assistantFilePath,
      JSON.stringify(assistantOne, null, 2)
    );
  }

  return assistantDetails;
}
// Async function to modify assistant
async function modifyAssistant(assistantConfig) {
  let myUpdatedAssistant;
  if (!assistantConfig) {
    return myUpdatedAssistant;
  }

  try {
    myUpdatedAssistant = await openai.beta.assistants.update(
      assistantConfig.id,
      {
        instructions: assistantConfig.instructions,
        name: assistantConfig.name,
        tools: assistantConfig.tools ? assistantConfig.tools : [],
        model: assistantConfig.model ? assistantConfig.model : "gpt-4",
        file_ids: assistantConfig.file_ids ? assistantConfig.file_ids : [],
      }
    );
  } catch (error) {
    console.error("Error update assistant:", error);
  }
  return myUpdatedAssistant;
}
/** ---------thread--------- **/
// Async function to create or get existing thread
async function getOrCreateThread(threadID) {
  let threadDetails;
  if (threadID) {
    threadDetails = await openai.beta.threads.retrieve(threadID);
  } else {
    threadDetails = await openai.beta.threads.create();
  }

  return threadDetails;
}

// Async function to create assistant thread
async function createThread() {
  const emptyThread = await openai.beta.threads.create();

  return emptyThread;
}
// Async function to get assistant thread
async function retrieveThread(threadID) {
  const myThread = await openai.beta.threads.retrieve(threadID);

  return myThread;
}
// Async function to update assistant thread
async function updateThread(threadID, user) {
  const updatedThread = await openai.beta.threads.update(
    threadID,
    {
      metadata: { modified: "true", user },
    }
  );

  return updatedThread;
}
// Async function to delete assistant thread
async function delThread(threadID) {
  const response = await openai.beta.threads.del(threadID);

  return response;
}

module.exports = {
  createThread,
  retrieveThread,
  updateThread,
  delThread,
  openai,
  createAssistant,
  getOrCreateAssistant,
  modifyAssistant,
  getAssistantList,
  retrieveAssistant,
  getOrCreateThread
};
