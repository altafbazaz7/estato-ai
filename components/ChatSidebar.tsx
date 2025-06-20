"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import BackButton from "./ui/back";

interface Props {
  selected: string;
  onSelect: (chat: string) => void;
}

export default function ChatSidebar({ selected, onSelect }: Props) {
  const [chats, setChats] = useState<string[]>(["Chat 1", "Chat 2"]);

  // Auto-select the newest chat on creation
  useEffect(() => {
    if (!chats.includes(selected)) {
      onSelect(chats[chats.length - 1]);
    }
  }, [chats]);

  const handleNewChat = () => {
    const newChat = `Chat ${chats.length + 1}`;
    setChats([...chats, newChat]);
    onSelect(newChat);
  };

  return (
    <aside className="w-64 bg-gray-100 dark:bg-gray-900 p-4 border-r border-gray-300 space-y-4">
      <BackButton />
      <Button className="w-full" onClick={handleNewChat}>
        + New Chat
      </Button>
      <div className="space-y-2">
        {chats.map((chat, idx) => (
          <div
            key={idx}
            onClick={() => onSelect(chat)}
            className={`text-sm p-2 rounded cursor-pointer ${
              selected === chat
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200 dark:hover:bg-gray-800"
            }`}
          >
            {chat}
          </div>
        ))}
      </div>
    </aside>
  );
}
