import { useContext } from "react";
import { groupContext } from "../context/GroupsContext";

export function useGroups(){
    const context = useContext(groupContext);
    if(!context){
        throw new Error("useGroups must be used inside GroupsProvider")
    }
    return context
}