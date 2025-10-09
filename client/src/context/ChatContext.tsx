import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { DirectChat } from "../components/DirectChat";
import { useUser } from "../hooks/user";

interface ChatContextType {
  openChats: string[];
  openChat: (userId: string) => void;
  closeChat: (userId: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
    const {user} = useUser()
    const [openChats, setOpenChats] = useState<string[]>(() => {
        // Load previous chat windows from localStorage
        try {
          const saved = localStorage.getItem("openChats");
          return saved ? JSON.parse(saved) : [];
        } catch {
          return [];
        }
      });

    //   Persist changes to localStorage whenever openChats changes
      useEffect(() => {
        localStorage.setItem("openChats", JSON.stringify(openChats));
      }, [openChats]);

  const openChat = (userId: string) => {
    setOpenChats((prev) =>
      prev.includes(userId) ? prev : [...prev, userId]
    );
  };

  const closeChat = (userId: string) => {
    setOpenChats((prev) => prev.filter((id) => id !== userId));
  };

    // 🧹 close all chats when user logs out or token expires
    useEffect(() => {
        if (!user) {
          setOpenChats([]); // clear all open chat popups
          localStorage.removeItem("openChats"); // optional: clear persisted storage
        }
      }, [user]);

  return (
    <ChatContext.Provider value={{ openChats, openChat, closeChat }}>
      {children}
      {/* render popups globally */}
      <div className="fixed bottom-4 right-4 flex gap-3 z-[9999] pointer-events-auto">
        {openChats.map((id) => (
          <DirectChat key={id} recipientId={id} onClose={() => closeChat(id)} />
        ))}
      </div>
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within ChatProvider");
  return ctx;
}
