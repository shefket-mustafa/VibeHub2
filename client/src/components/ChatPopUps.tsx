// ChatPopups.tsx
import { DirectChat } from "./DirectChat";
import { useChat } from "../context/ChatContext";

export function ChatPopups() {
  const { openChats, closeChat } = useChat();
  

  

  return (
    <div className="fixed bottom-4 right-4 flex gap-3">
      {openChats.map((chat) => (
        <DirectChat
          key={chat.id}
          recipientId={chat.id}
          recipientName={chat.username} 
          onClose={() => closeChat(chat.id)}
        />
      ))}
    </div>
  );
}
