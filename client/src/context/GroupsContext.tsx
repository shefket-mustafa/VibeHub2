import { createContext, useState, type ReactNode } from "react";

import type { Group, GroupContextType } from "../types/TStypes";

export const groupContext = createContext<GroupContextType | undefined>(undefined)

export default function GroupsProvider({children}: {children: ReactNode}) {
    const [groupInfoModalOpen, setGroupInfoModalOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
    
    
    
    const groupInfoModalHandler = () => {
        setGroupInfoModalOpen(prev => !prev)
    }
    const selectedGroupHandler = (group: Group) => {
        setSelectedGroup(group);
        groupInfoModalHandler()
    };

    return(
<groupContext.Provider value={{groupInfoModalOpen, groupInfoModalHandler, selectedGroupHandler, selectedGroup}}>
        {children}
</groupContext.Provider>
    )
}