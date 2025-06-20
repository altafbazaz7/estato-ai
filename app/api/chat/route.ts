import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import { askGrowEasy } from "@/utils/gemini";
import { Lead } from "@/models/Lead";

export async function POST(req: NextRequest) {
    let respo;
    try {
        const { leadId, message } = await req.json();
        await connectToDB();

      
            const botReply = await askGrowEasy(message);

            respo = NextResponse.json({ reply: botReply });
    } catch (err) {
        console.error("❌ Chat error:", err);
        respo = NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
    return respo;
}
