import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import { askGrowEasyWithContext } from "@/utils/gemini";

export async function POST(req: NextRequest) {
  let respo;
  try {
    const {  message } = await req.json();
    await connectToDB();
    const botReply = await askGrowEasyWithContext(message);

    respo = NextResponse.json({ reply: botReply });
  } catch (err) {
    console.error("❌ Chat error:", err);
    respo = NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
  return respo;
}
