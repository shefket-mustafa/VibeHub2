import { useEffect, useState, type ReactNode } from "react";
import { UserContext } from "./createContext";
import type { User } from "../types/TStypes";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { friendsApi } from "../redux/services/friendsApi";
import { groupsApi } from "../redux/services/groupsApi";
import { socket } from "../hooks/useSocket";





export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showCommentsFor, setShowCommentsFor] = useState<string>("");


  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      console.log(JSON.parse(stored));
      
      setUser(JSON.parse(stored));
    }
    
    
  }, []);

  const handleSetUser = (us: User) => {
    setUser(us);

    if (us) {
      localStorage.setItem("user", JSON.stringify(us));
    } else {
      localStorage.removeItem("user");
    }
  };



  const logout = () => {
    if (socket.connected) {
      socket.emit("userOffline");
      socket.disconnect();
      console.log("🔌 Logged out — socket disconnected");
    }

    handleSetUser(null);
    dispatch(friendsApi.util.resetApiState()) //clearing the RTK query
    dispatch(groupsApi.util.resetApiState());
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate('/auth/login')
  };


  return (
    <UserContext.Provider value={{user: user, setUser: handleSetUser, logout, showCommentsFor, setShowCommentsFor }}>
      {children}
    </UserContext.Provider>
  )
}


