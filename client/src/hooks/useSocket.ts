// src/hooks/useSocket.ts
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useUser } from "./user";
import type { DirectMessages } from "../types/TStypes";
import { useChat } from "../context/ChatContext";

// Let Socket.IO manage connection; don't force-connect repeatedly
export const socket: Socket = io(import.meta.env.VITE_API_URL, {
  transports: ["websocket"],
  // autoConnect defaults to true; that's fine for this pattern
});

export function useSocket() {
  const { user } = useUser();
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [messages, setMessages] = useState<DirectMessages[]>([]);
  const { openChat } = useChat();

  useEffect(() => {
    // Wait until we actually know who the user is
    if (!user?.id) return;

    // ---- listeners (stable references) ----
    const onConnect = () => {
      // Emit only after the transport is connected
      socket.emit("userOnline", user.id);
    };

    const onOnlineUsers = (users: string[]) => {
      setOnlineUsers(users);
    };

    const onPrivateMessage = (message: DirectMessages) => {
      setMessages((prev) => {
        if (prev.some((m) => m._id === message._id)) return prev;
        return [...prev, message];
      });

      if (message.recipientId === user.id) {
        // NOTE: your openChat signature is (id, username). You're passing an ID twice here.
        // This line is unrelated to the online indicator, but it's likely a bug:
        // openChat(message.senderId, message.recipientId);
        // If you only track IDs in ChatContext, change your openChat type to (id: string) instead.
        openChat(message.senderId as any, "" as any);
      }
    };

    // ---- register listeners ----
    socket.on("connect", onConnect);
    if (socket.connected) {
      // If already connected (fast HMR), emit now too
      socket.emit("userOnline", user.id);
    }
    socket.on("onlineUsers", onOnlineUsers);
    socket.on("privateMessage", onPrivateMessage);

    // ---- cleanup ONLY listeners (do NOT disconnect here unless logging out) ----
    return () => {
      socket.off("connect", onConnect);
      socket.off("onlineUsers", onOnlineUsers);
      socket.off("privateMessage", onPrivateMessage);
    };
  }, [user?.id]); // only re-run when the actual user id changes  

  // When the user logs out, explicitly disconnect and clear state
  useEffect(() => {
    if (!user) {
      if (socket.connected) {
        // manually telling the server we're going offline
        socket.emit("userOffline");
        socket.disconnect();
      }
      setOnlineUsers([]);
      setMessages([]);
    } else {
      // if user logs back in, reconnect and re-emit online status
      if (!socket.connected) {
        socket.connect();
      }
    }
  }, [user]);
  const sendPrivateMessage = (recipientId: string, content: string) => {
    if (!user?.id) return;
    socket.connect(); // ensure connected before sending (no-op if already)
    socket.emit("privateMessage", { senderId: user.id, recipientId, content });
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
