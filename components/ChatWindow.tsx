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

  const sendMessage = async (text: string) => {
    const userMessage = { sender: "user" as const, text };

    setMessagesByChat((prev) => {
      const chatMessages = prev[chatTitle] || [];
      return {
        ...prev,
        [chatTitle]: [...chatMessages, userMessage],
      };
    });

    try {
      const res = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      const aiMessage = { sender: "ai" as const, text: data.reply || "Sorry, I didn't understand that." };

      setMessagesByChat((prev) => {
        const chatMessages = prev[chatTitle] || [];
        return {
          ...prev,
          [chatTitle]: [...chatMessages, aiMessage],
        };
      });
    } catch (error) {
      const aiMessage = { sender: "ai" as const, text: "Sorry, there was an error contacting the AI." };
      setMessagesByChat((prev) => {
        const chatMessages = prev[chatTitle] || [];
        return {
          ...prev,
          [chatTitle]: [...chatMessages, aiMessage],
        };
      });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground w-full p-10">
      <h1 className="text-2xl font-semibold mb-4 text-center">{chatTitle}</h1>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} sender={msg.sender} text={msg.text} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      {
        !chatTitle && (
          <>
            <div className="text-center text-gray-500">
            <p className="text-sm">Select a chat to start messaging.</p>
            </div>
          </>
        )
      }

      {/* Chat input */}
      {
        chatTitle && (
          <>
            <div className="border-t px-4 py-3 bg-muted">
              <ChatInput onSend={sendMessage} />
            </div>
          </>
        )
      }

    </div>
  );
}
