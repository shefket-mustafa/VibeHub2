import { BsFillGearFill } from "react-icons/bs";
import { Link } from "react-router";
import FriendsCard from "./FriendsCard";
import friendImage from "../assets/friends-item.avif"
import { useGetIncomingQuery } from "../redux/services/friendsApi";



export default function FriendsPage() {
  const {data: incoming=[], isLoading, error} = useGetIncomingQuery();
  

  return (
    <section className="w-full flex self-start mt-20 px-10 z-10">
      {/* Left section */}
      <div className="h-screen w-64 border-r border-neutral-700 p-4">
        <div className="flex justify-between items-center border-b max-w-xs border-neutral-700 pb-2 mb-4">
          <p className="text-2xl font-bold text-orange-500">Friends</p>
          <BsFillGearFill className="text-white cursor-pointer hover:text-orange-500" />
        </div>

        <nav className="flex flex-col gap-2">
        <button
            className="px-3 py-2 rounded-lg text-left cursor-pointer block text-orange-500 bg-neutral-700/40"
            
          >
            Requests
          </button>
          <Link
            className="px-3 py-2 rounded-lg text-white hover:text-orange-500 hover:bg-neutral-700/40"
            to="/friends/all"
          >
            All friends
          </Link>
          <Link
            className="px-3 py-2 rounded-lg text-white hover:text-orange-500 hover:bg-neutral-700/40"
            to="/friends/suggestions"
          >
            Suggestions
          </Link>
         
        </nav>
      </div>

      {/* Right section */}
      <div className="px-10 text-xl ">
        <h1 className=" text-orange-500">Friend requests</h1>

        {isLoading && <p className="text-neutral-400">Requests loading...</p>}
        {error && <p className="text-red-500">Failed to fetch requests!</p>}
        {incoming.length === 0 && <p className="text-white">No requests found!</p>}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-15 py-10">
          {incoming.map((data) => {
          return (
            <FriendsCard 
            key={data._id}
            id={data._id}
            name={data.username} 
            mutualFriends={[]}
            image={friendImage}
            
            />
          )})}

        </div>
      </div>

      
    </section>
  );
}
