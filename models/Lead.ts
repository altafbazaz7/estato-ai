import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  role: { type: String, enum: ["user", "bot"], required: true },
  message: { type: String, required: true }
});

const LeadSchema = new mongoose.Schema({
  name: String,
  phone: String,
  source: String,
  chat: [MessageSchema]
});

export const Lead = mongoose.models.Lead || mongoose.model("Lead", LeadSchema);
