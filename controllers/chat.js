const { retrieveAssistant, openai, getOrCreateThread } = require("../utils/assistant");

async function control(req, res) {
  try {
    const { question } = req.body;
    const { aid, tid } = req.params;
    const assistantDetails = await retrieveAssistant(aid);
    // console.log(assistantDetails);
    // Create a thread using the assistantId
    // const thread = await openai.beta.threads.create();
    const thread = await getOrCreateThread(tid);
    // Pass in the user question into the existing thread
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: question,
    });

    // Create a run
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistantDetails.assistantId ? assistantDetails.assistantId : assistantDetails.id,
    });

    // Fetch run-status
    let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);

    // Polling mechanism to see if runStatus is completed
    while (runStatus.status !== "completed") {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    }

    // Get the last assistant message from the messages array
    const messages = await openai.beta.threads.messages.list(thread.id);
    const lastMessageForRun = messages.data
      .filter(
        (message) => message.run_id === run.id && message.role === "assistant"
      )
      .pop();

    if (lastMessageForRun) {
      res.json({ response: lastMessageForRun.content[0].text.value });
    } else {
      res.status(500).send("No response received from the assistant.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
}

module.exports = {
  control
}