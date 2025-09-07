import { useEffect, useState, type ReactNode } from "react";
import { UserContext } from "./createContext";
import type { User } from "../types/TStypes";





export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);

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
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{user: user, setUser: handleSetUser, logout}}>
      {children}
    </UserContext.Provider>
  )
}


