"use client";

import { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

interface Message {
  sender: "user" | "ai";
  text: string;
}

interface Props {
  chatTitle: string;
}

export default function ChatWindow({ chatTitle }: Props) {
  const [messagesByChat, setMessagesByChat] = useState<Record<string, Message[]>>({});
  const messages = messagesByChat[chatTitle] || [];

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    const userMessage = { sender: "user" as const, text };
    const aiMessage = { sender: "ai" as const, text: `You said: "${text}" — I'm Estato AI!` };

    setMessagesByChat((prev) => {
      const chatMessages = prev[chatTitle] || [];
      return {
        ...prev,
        [chatTitle]: [...chatMessages, userMessage, aiMessage],
      };
    });
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground w-full p-10">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} sender={msg.sender} text={msg.text} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat input */}
      <div className="border-t px-4 py-3 bg-muted">
        <ChatInput onSend={sendMessage} />
      </div>
    </div>
  );
}
