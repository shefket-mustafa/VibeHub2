// DirectChat.tsx
import { useState, useEffect, useRef } from "react";
import { getChatHistory, useSocket } from "../hooks/useSocket";
import { useUser } from "../hooks/user";
import type { DirectMessages } from "../types/TStypes";

interface DirectChatProps {
  recipientId: string;
  onClose: () => void;
}

export function DirectChat({ recipientId, onClose }: DirectChatProps) {
    const {user} = useUser();
  const { messages, sendPrivateMessage } = useSocket();
  const [content, setContent] = useState("");
  const [chatHistory, setChatHistory] = useState<DirectMessages[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);

//   Load chat history once on open
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !user) return;

    getChatHistory(recipientId, token).then((msgs) => {
      setChatHistory(msgs);
    });
  }, [recipientId, user]);

  const merged = [...chatHistory, ...messages].filter(
    (m) =>
      (m.senderId === user?.id && m.recipientId === recipientId) ||
      (m.senderId === recipientId && m.recipientId === user?.id)
  );
  
  const seen = new Set<string>();
  const allMessages = merged.filter((m) => {
    if (seen.has(m._id)) return false;
    seen.add(m._id);
    return true;
  });

  const handleSend = () => {
    if (content.trim()) {
      sendPrivateMessage(recipientId, content);
  
      setContent("");
    }
  };
  

  useEffect(() => {
    // Scroll to bottom instantly on mount
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight });
  }, []);

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [allMessages]);

  return (
    <div className="w-80 h-96 bg-neutral-900 border border-neutral-700 rounded-xl shadow-2xl flex flex-col relative">
      <div className="flex items-center justify-between px-3 py-2 border-b border-neutral-700 bg-neutral-800/80 rounded-t-xl ">
        <p className="text-white text-sm font-medium">Chat</p>
        <button
          onClick={onClose}
          className="text-neutral-400 hover:text-white text-lg cursor-pointer"
        >
          ✕
        </button>
      </div>

      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-thin scrollbar-thumb-neutral-700"
      >
        {allMessages.length === 0 && (
          <p className="text-neutral-500 text-sm text-center mt-4">
            No messages yet
          </p>
        )}
        {allMessages.map((m) => (
          <div
            key={m._id}
            className={`max-w-[70%] p-2 rounded-lg text-sm ${
              m.senderId === recipientId
                ? "bg-neutral-700 text-white self-start"
                : "bg-orange-500 text-white self-end ml-auto"
            }`}
          >
            {m.content}
          </div>
        ))}
      </div>

      <div className="flex gap-2 p-3 border-t border-neutral-700">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          className="flex-1 bg-neutral-800 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
        />
        <button
          onClick={handleSend}
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-3 py-2 text-sm font-medium transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
