import { BsFillGearFill } from "react-icons/bs";
import { Link } from "react-router";
import FriendsCard from "./FriendsCard";
import friendImage from "../assets/friends-item.avif"
import { useGetIncomingQuery } from "../redux/services/friendsApi";
import type { IncomingRequest } from "../types/TStypes";
import { useSocket } from "../hooks/useSocket";
import { useEffect } from "react";



export default function FriendsPage() {
  const {data: incoming=[], isLoading, error, refetch} = useGetIncomingQuery();
  const {socket} = useSocket();

  useEffect(() => {
    if(!socket) return;

    //Listen for new friend request events
    socket.on("newFriendRequest", () => {
      console.log("📩 New request arrived, refreshing list...");
      refetch(); // refresh the RTK Query data
    });

     // cleanup on unmount to prevent duplicates
     return () => {
      socket.off("newFriendRequest");
    };
  },[socket,refetch])
  

  return (
    <section className="w-full flex flex-col md:flex-row mt-20 px-4 md:px-10 z-10">
  {/* Sidebar */}
  <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-neutral-700 p-4 mb-4 md:mb-0">
    <div className="flex justify-between items-center border-b border-neutral-700 pb-2 mb-4">
      <p className="text-2xl font-bold text-orange-500">Friends</p>
      <BsFillGearFill className="text-white cursor-pointer hover:text-orange-500" />
    </div>

    <nav className="flex md:flex-col gap-2 justify-center md:justify-start">
      <button className="px-3 py-2 rounded-lg text-orange-500 bg-neutral-700/40">
        Requests
      </button>
      <Link
        to="/friends/all"
        className="px-3 py-2 rounded-lg text-white hover:text-orange-500 hover:bg-neutral-700/40"
      >
        All friends
      </Link>
      <Link
        to="/friends/suggestions"
        className="px-3 py-2 rounded-lg text-white hover:text-orange-500 hover:bg-neutral-700/40"
      >
        Suggestions
      </Link>
    </nav>
  </div>

  {/* Main section */}
  <div className="flex-1 px-4 md:px-10 text-lg">
    <h1 className="text-orange-500 mb-4">Friend requests</h1>

    {isLoading && <p className="text-neutral-400">Requests loading...</p>}
    {error && <p className="text-red-500">Failed to fetch requests!</p>}
    {incoming.length === 0 && <p className="text-white">No requests found!</p>}

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6">
      {incoming.map((data: IncomingRequest) => (
        <FriendsCard
          key={data._id}
          id={data.requestId}
          name={data.username}
          mutualFriends={[]}
          image={friendImage}
        />
      ))}
    </div>
  </div>
</section>

  );
}
