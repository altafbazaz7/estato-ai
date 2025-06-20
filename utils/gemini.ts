// utils/gemini.ts

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyANCZuE3yy6_ViXAtAZZ6dPdIVXdk8XVmM" });

const SYSTEM_PROMPT = `
You are GrowEasy, a friendly and knowledgeable real estate assistant.
You help qualify leads by asking:
- Preferred location
- Property type (flat, villa, plot)
- Budget
- Purpose (investment or personal use)
- Timeline for moving
Then you classify leads as Hot, Cold, or Invalid.
Be natural, helpful, and professional in your tone.
`;

export async function askGrowEasy(message: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash",
    contents: message,
    config: {
      systemInstruction: SYSTEM_PROMPT,
    },
  });

  return response.text ?? "";
}

// ✅ Console test runner
if (require.main === module) {
  (async () => {
    const reply = await askGrowEasy("Hi, I’m looking for a villa in Goa under 1Cr.");
    console.log("🧠 GrowEasy:", reply);
  })();
}
