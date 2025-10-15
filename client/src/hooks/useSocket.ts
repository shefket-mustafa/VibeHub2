// src/hooks/useSocket.ts
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useUser } from "./user";
import type { DirectMessages } from "../types/TStypes";
import { useChat } from "../context/ChatContext";

const socket: Socket = io(import.meta.env.VITE_API_URL, {
  transports: ["websocket"],
});

export function useSocket() {
  const { user } = useUser();
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [messages, setMessages] = useState<DirectMessages[]>([]);
  const { openChat } = useChat(); 

  useEffect(() => {
    if (!user) {
      socket.disconnect(); // stop listening when user logs out
      setMessages([]); // clear all messages
      return;
    }

    socket.connect() //reconnecting when the user logs is
    socket.emit("userOnline", user.id);

    socket.on("onlineUsers", (users: string[]) => {
      setOnlineUsers(users);
    });

    socket.on("privateMessage", (message) => {
      setMessages((prev) => {
        // prevent duplicates
        if (prev.some((m) => m._id === message._id)) return prev;
        return [...prev, message];
      });

      //Open chat popup automatically if recipient gets a new message
      if (message.recipientId === user.id) {
        openChat(message.senderId, message.recipientId);
      }
    
    })

    return () => {
      socket.off("onlineUsers");
      socket.off("privateMessage");
    };
  }, [user, openChat]);

  const sendPrivateMessage = (recipientId: string, content: string) => {
    if (!user) return;
    socket.emit("privateMessage", { senderId: user?.id, recipientId, content });
  };

  return { socket, onlineUsers, messages, sendPrivateMessage };
}

export async function getChatHistory(friendId: string, token: string) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/messages/${friendId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data.messages || [];
}
