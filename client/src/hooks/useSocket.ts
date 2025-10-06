// src/hooks/useSocket.ts
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useUser } from "./user";

const socket: Socket = io(import.meta.env.VITE_API_URL, {
  transports: ["websocket"],
});

export function useSocket() {
  const { user } = useUser();
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
    if (!user) return;

    socket.emit("userOnline", user.id);

    socket.on("onlineUsers", (users: string[]) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("onlineUsers");
    };
  }, [user]);

  return { socket, onlineUsers };
}
