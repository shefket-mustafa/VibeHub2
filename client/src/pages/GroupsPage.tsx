// src/pages/GroupsPage.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import GroupsIcon from "@mui/icons-material/Groups";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BrowseGalleryIcon from "@mui/icons-material/BrowseGallery";

type Group = {
  id: string;
  name: string;
  members: number;
  type: "public" | "private";
  joined: boolean;
};

const mockGroups: Group[] = [
  { id: "1", name: "React Enthusiasts", members: 12, type: "public", joined: true },
  { id: "2", name: "TypeScript Fans", members: 8, type: "private", joined: false },
  { id: "3", name: "Music Lovers", members: 20, type: "public", joined: false },
];

export default function GroupsPage() {
  const [activeTab, setActiveTab] = useState<"your" | "discover">("your");
  const [groups] = useState<Group[]>(mockGroups);
  const navigate = useNavigate();

  const yourGroups = groups.filter((g) => g.joined);
  const discoverGroups = groups.filter((g) => !g.joined);

  return (
    <div className="w-full flex justify-between z-10">
      {/* Left Sidebar */}
      <div className="sticky hidden md:flex flex-col top-20 w-[260px] min-h-screen bg-neutral-800/30 border-neutral-800">
        <div className="flex flex-col gap-3 p-4">
          <div
            onClick={() => navigate("/friends")}
            className="flex gap-3 items-center cursor-pointer hover:bg-neutral-700/30 rounded-lg px-3 py-2 transition"
          >
            <PeopleAltIcon className="text-orange-500" />
            <p className="text-white">Friends</p>
          </div>
          <div
            onClick={() => navigate("/memories")}
            className="flex gap-3 items-center cursor-pointer hover:bg-neutral-700/30 rounded-lg px-3 py-2 transition"
          >
            <BrowseGalleryIcon className="text-orange-500" />
            <p className="text-white">Memories</p>
          </div>
          <div
            onClick={() => navigate("/groups")}
            className="flex gap-3 items-center cursor-pointer hover:bg-neutral-700/30 rounded-lg px-3 py-2 transition"
          >
            <GroupsIcon className="text-orange-500" />
            <p className="text-white">Groups</p>
          </div>
        </div>
      </div>

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
          {(activeTab === "your" ? yourGroups : discoverGroups).map((g) => (
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

              {activeTab === "discover" ? (
                g.type === "public" ? (
                  <button className="text-sm text-black bg-orange-400 hover:bg-orange-500 px-3 py-1 rounded-lg transition">
                    Join
                  </button>
                ) : (
                  <button className="text-sm text-black bg-orange-400 hover:bg-orange-500 px-3 py-1 rounded-lg transition">
                    Request to Join
                  </button>
                )
              ) : (
                <Link
                  to={`/groups/details/${g.id}`}
                  className="text-sm text-orange-400 hover:underline"
                >
                  View
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Sidebar (optional) */}
      <div className="hidden md:flex sticky top-20 w-[260px] min-h-screen bg-neutral-800/30 border-neutral-800 p-4">
        <p className="text-lg font-semibold text-orange-500">Suggested</p>
        <p className="text-neutral-400 text-sm mt-2">
          (mock) Show trending groups here
        </p>
      </div>
    </div>
  );
}
