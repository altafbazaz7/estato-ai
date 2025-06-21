"use client";

import { useState } from "react";
import ChatSidebar from "@/components/ChatSidebar";
import ChatWindow from "@/components/ChatWindow";

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState("Chat 1");
  const [messages, setMessages] = useState<any[]>([]);

  const handleChatSelect = (chat: string) => {
    setSelectedChat(chat);
    setMessages([]);
  };

  return (
    <div className="flex h-screen">
      <ChatSidebar selected={selectedChat} onSelect={handleChatSelect} />
      <ChatWindow chatTitle={selectedChat}  />
    </div>
  );
}
