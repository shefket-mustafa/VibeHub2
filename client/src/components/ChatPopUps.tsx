// ChatPopups.tsx
import { useState } from "react";
import { DirectChat } from "./DirectChat";

export function ChatPopups() {
  const [openChats, setOpenChats] = useState<string[]>([]);

  const openChat = (userId: string) => {
    setOpenChats((prev) => [...new Set([...prev, userId])]);
  };

  const closeChat = (userId: string) => {
    setOpenChats((prev) => prev.filter((id) => id !== userId));
  };

  return (
    <div className="fixed bottom-4 right-4 flex gap-3">
      {openChats.map((id) => (
        <DirectChat key={id} recipientId={id} onClose={() => closeChat(id)} />
      ))}
    </div>
  );
}
