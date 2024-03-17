const fs = require("fs");
const { retrieveAssistant, openai } = require("../utils/assistant");

async function control(req, res) {
  try {
    const { assistantId } = req.body;
    const { aid } = req.params;
    const assistantDetails = await retrieveAssistant(assistantId || aid);
    const file = await openai.files.create({
      file: fs.createReadStream(req.file.path),
      purpose: "assistants",
    });

    // Retrieve existing file IDs from assistant.json to not overwrite
    let existingFileIds = assistantDetails.file_ids || [];

    // Update the assistant with the new file ID
    await openai.beta.assistants.update(assistantDetails.assistantId, {
      file_ids: [...existingFileIds, file.id],
    });

    return res.send("File uploaded and successfully added to assistant");
  } catch (error) {
    console.error(error);
    return res.status(500).send("An error occurred during file upload, " + error);
  }
}

module.exports = {
  control
}