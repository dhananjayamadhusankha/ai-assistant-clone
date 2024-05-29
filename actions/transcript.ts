"use server";

import {
  OpenAIClient,
  AzureKeyCredential,
  ChatRequestMessage,
} from "@azure/openai";

async function transcript(prevState: any, formData: FormData) {
  console.log("PREVIOUS STATE: ", prevState);

  const id = Math.random().toString(36);

  const apiKey = process.env.AZURE_API_KEY;
  const endpoint = process.env.AZURE_ENDPOINT;
  const deploymentName = process.env.AZURE_DEPLOYMENT_NAME;
  const deploymentCompletionName = process.env.AZURE_DEPLOYMENT_COMPLETION_NAME;

  if (
    apiKey === undefined ||
    endpoint === undefined ||
    deploymentName === undefined ||
    deploymentCompletionName === undefined
  ) {
    console.error("Azure credentials not set");
    return {
      sender: "",
      response: "No Azure credentials",
    };
  }

  const file = formData.get("audio") as File;

  if (file.size === 0) {
    return {
      sender: "",
      response: "No audio file provided",
    };
  }

  console.log(">>>", file);

  const arrayBuffer = await file.arrayBuffer();
  const audio = new Uint8Array(arrayBuffer);

  //   ---get audio transcribe from Azure Whisper AI service

  console.log("== Transcribe Audio Sample ==");

  const client = new OpenAIClient(endpoint, new AzureKeyCredential(apiKey));

  const result = await client.getAudioTranscription(deploymentName, audio);

  console.log(`Transcription: ${result.text}`);

  //   --- get the completions from Azure OpenAI ---
  const messages: ChatRequestMessage[] = [
    {
      role: "system",
      content:
        "You are a helpful assistent. You will answer the quesions and reply I cannot answer that if you dont know the answer",
    },
    {
      role: "user",
      content: result.text,
    },
  ];

  console.log(
    `Messages >>>: ${messages.map((message) => message.content).join("\n")}`
  );

  const chatCompletions = await client.getChatCompletions(
    deploymentCompletionName,
    messages,
    { maxTokens: 128 }
  );

  const response = chatCompletions.choices[0].message?.content;

  console.log(prevState.sender, "+++", result.text);
  console.log(`Completion: ${response}`);

  return {
    sender: result.text,
    response: response,
    id: id,
  };
}

export default transcript;
