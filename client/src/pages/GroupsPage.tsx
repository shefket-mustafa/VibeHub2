// src/pages/GroupsPage.tsx
import { useState } from "react";
import { Link } from "react-router";
import GroupsIcon from "@mui/icons-material/Groups";
import PageContainer from "./PageContainer";

type Group = {
  id: string;
  name: string;
  members: number;
  type: "public" | "private";
  joined: boolean;
};



export default function GroupsPage() {
  const [activeTab, setActiveTab] = useState<"your" | "discover">("your");
  const [yourGroups] = useState<Group[]>([]);
  const [discoverGroups] = useState<Group[]>([]);


  return (
<PageContainer>

    <div className="w-full flex justify-between z-10">
     

      {/* Middle Section */}
      <div className="w-full flex-1 max-w-xl mx-auto space-y-6 py-20">
        {/* Header + Create button */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-white">Groups</h1>
          <button className="rounded-xl px-4 py-2 bg-orange-400 text-black cursor-pointer font-semibold hover:bg-orange-500 transition">
            + Create Group
          </button>
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

        {/* Group List */}
        <ul className="space-y-4">
  {activeTab === "your" ? (
    yourGroups.length === 0 ? (
      <p className="text-sm text-neutral-400">You haven&apos;t joined any groups!</p>
    ) : (
      yourGroups.map((g) => (
        <li
          key={g.id}
          className="rounded-xl border border-neutral-800 p-4 bg-neutral-900/50 flex items-center justify-between hover:bg-neutral-800/40 transition"
        >
          <div className="flex items-center gap-3">
            <GroupsIcon className="text-orange-500" />
            <div>
              <p className="text-white font-medium">{g.name}</p>
              <p className="text-sm text-neutral-400">
                {g.members} members · {g.type}
              </p>
            </div>
          </div>
          <Link
            to={`/groups/details/${g.id}`}
            className="text-sm text-orange-400 hover:underline"
          >
            View
          </Link>
        </li>
      ))
    )
  ) : discoverGroups.length === 0 ? (
    <p className="text-sm text-neutral-400">No groups left to discover!</p>
  ) : (
    discoverGroups.map((g) => (
      <li
        key={g.id}
        className="rounded-xl border border-neutral-800 p-4 bg-neutral-900/50 flex items-center justify-between hover:bg-neutral-800/40 transition"
      >
        <div className="flex items-center gap-3">
          <GroupsIcon className="text-orange-500" />
          <div>
            <p className="text-white font-medium">{g.name}</p>
            <p className="text-sm text-neutral-400">
              {g.members} members · {g.type}
            </p>
          </div>
        </div>
        {g.type === "public" ? (
          <button className="text-sm text-black bg-orange-400 hover:bg-orange-500 px-3 py-1 rounded-lg transition">
            Join
          </button>
        ) : (
          <button className="text-sm text-black bg-orange-400 hover:bg-orange-500 px-3 py-1 rounded-lg transition">
            Request to Join
          </button>
        )}
      </li>
    ))
  )}
</ul>
      </div>

    
    </div>
  </PageContainer>
  );
}
