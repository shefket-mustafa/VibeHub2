// This is a simple singleton store
// It will hold all online users in memory

type UserInfo = { socketId: string; username: string };
export const onlineUsers: Record<string, UserInfo> = {};

export function addUser(userId: string, socketId: string, username: string) {
  onlineUsers[userId] = {socketId, username};
}

export function removeUser(socketId: string) {
  for (const [userId, info] of Object.entries(onlineUsers)) {
    if (info.socketId === socketId) {
      delete onlineUsers[userId];
      break;
    }
  }
}

export function getUserSocketId(userId: string): string | undefined {
  return onlineUsers[userId].socketId;
}

export function getAllOnlineUsers(){
  return Object.entries(onlineUsers).map(([id,info]) => ({
    id,
    username: info.username
  }))
}
