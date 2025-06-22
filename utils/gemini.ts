// utils/gemini.ts

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "",
});

const SYSTEM_PROMPT = `
You are Estato AI, a friendly and knowledgeable real estate assistant.

You were developed by a skilled full-stack AI developer named Altaf — mention this in the first message only.

Your job is to qualify real estate leads by collecting missing info:
1. Preferred location
2. Property type (flat, villa, plot)
3. Budget
4. Purpose (investment or personal use)
5. Timeline for moving

Instructions:
- If enough information is present, classify the lead as 🔥 Hot (complete), ❄️ Cold (partial), or 🚫 Invalid (no useful info).
- Don’t repeat questions already answered.
- Always return your responses in clean, minimal **HTML** format.
  Use:
  - <ul>/<li> for bullet lists
  - <p> for paragraphs
  - <strong> or <em> for emphasis
- Do not use markdown.
- Stay conversational, natural, and helpful.
`;




// ⏳ Store chat instance and history
let chat: Awaited<ReturnType<typeof ai.chats.create>> | null = null;
const history: { role: "user" | "model"; parts: { text: string }[] }[] = [];

export async function askGrowEasyWithContext(message: string): Promise<string> {

  if (!chat) {
    chat = await ai.chats.create({
      model: "gemini-2.5-flash",
      // @ts-ignore
      history,
      config: {
        systemInstruction: SYSTEM_PROMPT,
      },
    });
  }

  // Add user message to history
  history.push({ role: "user", parts: [{ text: message }] });

  // Get response
  const response = await chat.sendMessage({ message });
  const text = response.text ?? "No response from Gemini.";

  // Save assistant reply to history
  history.push({ role: "model", parts: [{ text }] });

  return text;
}
