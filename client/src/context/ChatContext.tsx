import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { DirectChat } from "../components/DirectChat";
import { useUser } from "../hooks/user";

  interface ChatContextType {
    openChats: OpenChat[];
    openChat: (id: string, username: string) => void;
    closeChat: (id: string) => void;
  }

type OpenChat = {
  id: string;
  username: string;
};



const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
    const {user} = useUser()
    const [openChats, setOpenChats] = useState<OpenChat[]>(() => {
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

      const openChat = (id: string, username: string) => {
        setOpenChats((prev) =>
          prev.some((chat) => chat.id === id) ? prev : [...prev, { id, username }]
        );
      };

      const closeChat = (id: string) => {
        setOpenChats((prev) => prev.filter((chat) => chat.id !== id));
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
        {openChats.map((chat) => (
          <DirectChat key={chat.id} recipientId={chat.id} recipientName={chat.username} onClose={() => closeChat(chat.id)} />
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
