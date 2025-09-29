// src/pages/GroupDetails.tsx
import { useParams } from "react-router";
import GroupsIcon from "@mui/icons-material/Groups";
import { useState } from "react";

type Group = {
  id: string;
  name: string;
  description: string;
  members: number;
  type: "public" | "private";
  joined: boolean;
  rules: string[]
};

const mockGroups: Group[] = [
  {
    id: "1",
    name: "React Enthusiasts",
    description: "A place for all React devs to share and learn.",
    members: 12,
    type: "public",
    joined: true,
    rules: ["Be respectful", "No spam or ads", "Stay on topic"],
  },
  {
    id: "2",
    name: "TypeScript Fans",
    description: "We love strict typing and clean code.",
    members: 8,
    type: "private",
    joined: false,
    rules: ["Respect others’ opinions", "Ask before sharing links"],
},
];

export default function GroupDetails() {
    const { id } = useParams<{ id: string }>();
    const group = mockGroups.find((g) => g.id === id);
  
    const [joined, setJoined] = useState(group?.joined ?? false);
  
    if (!group) {
      return <p className="text-center text-red-400">Group not found</p>;
    }
  
    return (
      <div className="w-full flex justify-between z-10">
        <div className="w-full flex-1 max-w-xl mx-auto py-20">
          {/* Main container */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-neutral-800">
              <div className="flex gap-3 items-center">
                <GroupsIcon className="text-orange-500" />
                <div>
                  <h1 className="text-2xl font-bold text-white">{group.name}</h1>
                  <p className="text-sm text-neutral-400">
                    {group.members} members · {group.type}
                  </p>
                </div>
              </div>
              {joined ? (
                <button
                  onClick={() => setJoined(false)}
                  className="px-4 py-2 bg-neutral-700 text-white rounded-lg hover:bg-red-500 transition"
                >
                  Leave
                </button>
              ) : group.type === "public" ? (
                <button
                  onClick={() => setJoined(true)}
                  className="px-4 py-2 bg-orange-400 text-black rounded-lg hover:bg-orange-500 transition"
                >
                  Join
                </button>
              ) : (
                <button className="px-4 py-2 bg-orange-400 text-black rounded-lg hover:bg-orange-500 transition">
                  Request to Join
                </button>
              )}
            </div>
  
            {/* About */}
            <div className="p-6 border-b border-neutral-800">
              <h2 className="inline-block px-3 py-1 text-sm font-semibold text-orange-400 border border-orange-500 rounded-full mb-3">
                About
              </h2>
              <p className="text-neutral-300">{group.description}</p>
            </div>
  
            {/* Rules */}
            <div className="p-6">
              <h2 className="inline-block px-3 py-1 text-sm font-semibold text-orange-400 border border-orange-500 rounded-full mb-3">
                Rules
              </h2>
              <ul className="list-disc list-inside text-neutral-300 space-y-1">
                {group.rules.map((rule, i) => (
                  <li key={i}>{rule}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
