// src/hooks/useSocket.ts
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useUser } from "./user";
import type { DirectMessages } from "../types/TStypes";

const socket: Socket = io(import.meta.env.VITE_API_URL, {
  transports: ["websocket"],
});

export function useSocket() {
  const { user } = useUser();
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [messages, setMessages] = useState<DirectMessages[]>([]);

  useEffect(() => {
    if (!user) return;

    socket.emit("userOnline", user.id);

    socket.on("onlineUsers", (users: string[]) => {
      setOnlineUsers(users);
    });

    socket.on("privateMessages", (message) => {
      setMessages((prev) => [...prev, message])
    })

    return () => {
      socket.off("onlineUsers");
      socket.off("privateMessage");
    };
  }, [user]);

  const sendPrivateMessage = (recipientId: string, content: string) => {
    socket.emit("privateMessage", {
      senderId: user?.id,
      recipientId,
      content,
    });
  };

  return { socket, onlineUsers, messages, sendPrivateMessage };
}
