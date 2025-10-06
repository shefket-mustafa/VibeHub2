// This is a simple singleton store
// It will hold all online users in memory

const onlineUsers: Record<string, string> = {};

export function addUser(userId: string, socketId: string) {
  onlineUsers[userId] = socketId;
}

export function removeUser(socketId: string) {
  for (const [userId, id] of Object.entries(onlineUsers)) {
    if (id === socketId) {
      delete onlineUsers[userId];
      break;
    }
  }
}

export function getUserSocketId(userId: string): string | undefined {
  return onlineUsers[userId];
}

export function getAllOnlineUsers(): string[] {
  return Object.keys(onlineUsers);
}
