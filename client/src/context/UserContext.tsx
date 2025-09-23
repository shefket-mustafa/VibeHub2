import { useEffect, useState, type ReactNode } from "react";
import { UserContext } from "./createContext";
import type { User } from "../types/TStypes";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { friendsApi } from "../redux/services/friendsApi";





export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
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
    handleSetUser(null);
    dispatch(friendsApi.util.resetApiState()) //clearing the RTK query
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate('/auth/login')
  };

  return (
    <UserContext.Provider value={{user: user, setUser: handleSetUser, logout}}>
      {children}
    </UserContext.Provider>
  )
}


