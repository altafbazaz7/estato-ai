"use client";

import { useState } from "react";
import ChatSidebar from "@/components/ChatSidebar";
import ChatWindow from "@/components/ChatWindow";

const dummyMessages: Record<string, string[]> = {
  "Chat 1": ["Hello from Chat 1!", "How can I help you today?"],
  "Chat 2": ["Welcome back to Chat 2!", "Here's your latest update."],
};

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState("Chat 1");
  const [messages, setMessages] = useState(dummyMessages["Chat 1"]);

  const handleChatSelect = (chat: string) => {
    setSelectedChat(chat);
    setMessages(dummyMessages[chat] || []);
  };

  return (
    <div className="flex h-screen">
      <ChatSidebar selected={selectedChat} onSelect={handleChatSelect} />
      <ChatWindow chatTitle={selectedChat}  />
    </div>
  );
}
