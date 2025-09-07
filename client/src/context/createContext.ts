import { createContext } from "react";
import type { UserContextType } from "../types/TStypes";



export const UserContext = createContext<UserContextType>(undefined);