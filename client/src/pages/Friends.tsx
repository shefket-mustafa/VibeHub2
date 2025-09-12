import { BsFillGearFill } from "react-icons/bs";
import { Link } from "react-router";

export default function FriendsPage() {
  const friends: any[] = []; // currently empty — later replace with API data

  return (
    <section className="w-full self-start mt-20 px-20 z-10">
     
     {/* Left section */}
     <div className="h-screen w-64 border-r border-neutral-700 p-4">

     <div className="flex justify-between items-center border-b max-w-xs border-neutral-700 pb-2 mb-4">
      <p className="text-2xl font-bold text-orange-500">Friends</p>
      <BsFillGearFill className="text-white cursor-pointer hover:text-orange-500"/>
     </div>

     <nav className="flex flex-col gap-2">

      <Link className="px-3 py-2 rounded-lg text-white hover:text-orange-500 hover:bg-neutral-700/40" to="/friends/all">All friends</Link>
      <Link className="px-3 py-2 rounded-lg text-white hover:text-orange-500 hover:bg-neutral-700/40" to="/friends/suggestions">Suggestions</Link>
      <Link className="px-3 py-2 rounded-lg text-white hover:text-orange-500 hover:bg-neutral-700/40" to="/friends/requests">Requests</Link>

     </nav>

     </div>
    </section>
  );
}
