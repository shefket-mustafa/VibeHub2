// src/pages/GroupsPage.tsx
import { useState } from "react";
import { Link } from "react-router";
import GroupsIcon from "@mui/icons-material/Groups";
import PageContainer from "./PageContainer";
import { useDeleteGroupMutation, useGetAllGroupsQuery, useGetYourGroupsQuery, useJoinGroupMutation } from "../redux/services/groupsApi";
import { useUser } from "../hooks/user";



export default function GroupsPage() {
  const [activeTab, setActiveTab] = useState<"your" | "discover">("your");
  const {user} = useUser()
  
  
  const {data: discoverGroups=[], error: errorDiscoverGroups, isLoading: isLoadingDiscoverGroups} = useGetAllGroupsQuery();
  const {data: yourGroups=[], error: errorMyGroups, isLoading: isLoadingYourGroups} = useGetYourGroupsQuery();
  const [deleteGroup, {isLoading: isDeleting}] = useDeleteGroupMutation();
  const [joinGroup, {isLoading: isJoining}] = useJoinGroupMutation();

  const handleJoinGroup = async(id: string) => {

    try{
      const result = await joinGroup(id)
      console.log(result);
      

    }catch(err){
      console.log(err);
      
    }
  }
 
  const handleDeleteGroup = async (id: string) => {

    try{
      const result = await deleteGroup(id).unwrap();
      console.log(result.message)
    }catch(err){
      console.error(err)
    }
  }

  // Combine error states
  const error =
  (errorDiscoverGroups as { error?: string })?.error ||
  (errorMyGroups as { error?: string })?.error ||
  null;

    // Combine loading state for skeleton/spinner
    const isLoading =
    isLoadingDiscoverGroups || isLoadingYourGroups || isDeleting || isJoining;
  


  return (
<PageContainer>

    <div className="w-full min-h-screen  flex justify-between z-10">
     

      {/* Middle Section */}
      <div className="w-full flex-1 max-w-5xl mx-auto space-y-6 py-20">
        {/* Header + Create button */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-white">Groups</h1>
          <Link to='/groups/create' className="rounded-xl px-4 py-2 bg-orange-400 text-black cursor-pointer font-semibold hover:bg-orange-500 transition">
            + Create Group
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-neutral-800 mb-6">
          <button
            className={`pb-2 cursor-pointer ${
              activeTab === "your"
                ? "text-orange-400 border-b-2 border-orange-400"
                : "text-neutral-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("your")}
          >
            Your Groups
          </button>
          <button
            className={`pb-2 cursor-pointer ${
              activeTab === "discover"
                ? "text-orange-400 border-b-2 border-orange-400"
                : "text-neutral-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("discover")}
          >
            Discover
          </button>
        </div>

         {/* Error */}
         {error && <p className="text-sm text-red-500">{error}</p>}

{/* Loading */}
{isLoading && <p className="text-sm text-neutral-400">Loading...</p>}

        {/* Group List */}
        <ul className="space-y-4">
  {activeTab === "your" ? (
    yourGroups.length === 0 ? (
      <p className="text-sm text-neutral-400">You haven&apos;t joined any groups!</p>
    ) : (
      yourGroups.map((g) => (
        <li
          key={g._id}
          className="rounded-xl border border-neutral-800 p-4 bg-neutral-900/50 flex items-center justify-between hover:bg-neutral-800/40 transition"
        >
          <div className="flex items-center gap-3">
            <GroupsIcon className="text-orange-500" />
            <div>
              <p className="text-white font-medium">{g.name}</p>
              <p className="text-sm text-neutral-400">
                {g.members?.length} {g.members?.length === 1 ? "member" : "members"} 
              </p>
            </div>
          </div>


          <div className="flex gap-3">
            {g.owner === user?.id && (<button onClick={() => handleDeleteGroup(g._id)}
           className="text-sm cursor-pointer text-orange-400 hover:underline">
            Delete
          </button>)} 
          
          <Link
            to={`/groups/details/${g._id}/`}
            className="text-sm text-orange-400 hover:underline"
            >
            View
          </Link>
            </div>
        </li>
      ))
    )
  ) : discoverGroups?.length === 0 ? (
    <p className="text-sm text-neutral-400">No groups left to discover!</p>
  ) : (
    discoverGroups?.map((g) => (
      <li
        key={g._id}
        className="rounded-xl border border-neutral-800 p-4 bg-neutral-900/50 flex items-center justify-between hover:bg-neutral-800/40 transition"
      >
        <div className="flex items-center gap-3">
          <GroupsIcon className="text-orange-500" />
          <div>
            <p className="text-white font-medium">{g.name}</p>
            <p className="text-sm text-neutral-400">
              {g.members?.length} {g.members?.length === 1 ? "member" : "members"} 
            </p>
          </div>
        </div>
        
          <button onClick={() => handleJoinGroup(g._id)} className="text-sm text-black bg-orange-400 hover:bg-orange-500 px-3 py-1 rounded-lg transition">
            Join
          </button>
        
        
      </li>
    ))
  )}
</ul>
      </div>

    
    </div>
  </PageContainer>
  );
}
