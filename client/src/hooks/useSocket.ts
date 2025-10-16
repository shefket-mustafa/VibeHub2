import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useUser } from "./user";
import { useChat } from "../context/ChatContext";
import type { DirectMessages } from "../types/TStypes";

// --- SINGLE socket instance shared by all components ---
export const socket: Socket = io(import.meta.env.VITE_API_URL, {
  transports: ["websocket"],
  autoConnect: true,
});

export function useSocket() {
  const { user } = useUser();
  const { openChat } = useChat();
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [messages, setMessages] = useState<DirectMessages[]>([]);

  // ---- CONNECT / ONLINE USERS / PRIVATE MESSAGES ----
  useEffect(() => {
    if (!user?.id) return;

    const handleConnect = () => socket.emit("userOnline", user.id);
    const handleOnlineUsers = (users: string[]) => setOnlineUsers(users);
    const handlePrivateMessage = (message: DirectMessages) => {
      setMessages(prev => (prev.some(m => m._id === message._id) ? prev : [...prev, message]));
      if (message.recipientId === user.id) openChat(message.senderId, "");
    };

    socket.on("connect", handleConnect);
    socket.on("onlineUsers", handleOnlineUsers);
    socket.on("privateMessage", handlePrivateMessage);

    if (socket.connected) socket.emit("userOnline", user.id);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("onlineUsers", handleOnlineUsers);
      socket.off("privateMessage", handlePrivateMessage);
    };
  }, [user?.id, openChat]);

  // ---- DISCONNECT ON LOGOUT ----
  useEffect(() => {
    if (!user) {
      if (socket.connected) {
        socket.emit("userOffline");
        socket.disconnect();
      }
      setOnlineUsers([]);
      setMessages([]);
    } else if (!socket.connected) {
      socket.connect();
    }
  }, [user]);

  // ---- GROUP HELPERS ----
  const joinGroup = (groupId: string): void => {
    if (!socket.connected) return;
    socket.emit("joinGroup", groupId);
    return; // <-- make absolutely sure this function returns nothing
  };
  
  const leaveGroup = (groupId: string): void => {
    if (!socket.connected) return;
    socket.emit("leaveGroup", groupId);
    return; // <-- same here
  };
  
  const sendGroupMessage = (groupId: string, content: string): void => {
    if (!user?.id || !socket.connected) return;
    socket.emit("groupMessage", { groupId, senderId: user.id, content });
    return;
  };

  const sendPrivateMessage: (recipientId: string, content: string) => void = (recipientId, content) => {
    if (!user?.id || !socket.connected) return;
    void socket.emit("privateMessage", { senderId: user.id, recipientId, content }); // <— voided
  };

  return {
    socket,
    onlineUsers,
    messages,
    sendPrivateMessage,
    joinGroup,
    leaveGroup,
    sendGroupMessage,
  };
}

// ---- HISTORY FETCH ----
export async function getChatHistory(friendId: string, token: string) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/messages/${friendId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  return data.messages || [];
}
