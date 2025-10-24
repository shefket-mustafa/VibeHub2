import {  type PropsWithChildren } from "react";
import { useUser } from "../hooks/user";
import { Link, useNavigate } from "react-router";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BrowseGalleryIcon from "@mui/icons-material/BrowseGallery";
import GroupsIcon from "@mui/icons-material/Groups";
import CommentModal from "../components/CommentModal";
import { useGetAllFriendsQuery } from "../redux/services/friendsApi";
import { useSocket } from "../hooks/useSocket";
import { useChat } from "../context/ChatContext";
import { useTranslation } from "react-i18next";


export default function PageContainer({children}: PropsWithChildren){
    // const [showCommentsFor, setShowCommentsFor] = useState<string | null>(null);
    const {showCommentsFor, setShowCommentsFor} = useUser();
    const {data: friends = []} = useGetAllFriendsQuery();
    const {onlineUsers} = useSocket();
    const {user} = useUser();
    const navigate = useNavigate();
    const {openChat} = useChat();
    const {t} = useTranslation();


    
    return (

    //main container
    <div className="w-full flex justify-between relative">
      {/* left section */}
      <div className="sticky hidden md:flex flex-col top-20 w-[260px] min-h-screen max-w-2xl border-neutral-800 bg-neutral-800/30 space-y-6 z-10">
        {/* User Profile  */}
        <div className="flex items-center gap-3 p-4 border-b border-neutral-700">
            <Link to="/profile">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-orange-500 flex items-center justify-center text-black font-bold">
            <img className="rounded-3xl object-cover w-full h-full" src={user?.profilePicture || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="Loading..." />
          
          </div>
            </Link>
            <Link to="/profile">
          <div>
            <p className="text-white font-medium">
              {user?.username ?? "Guest"}
            </p>
            <p className="text-sm text-neutral-400">
              {user?.email ?? "anonymous"}
            </p>
          </div>
            </Link>
        </div>
        {/* left section tags */}
        <div className="flex flex-col items-start gap-5 p-4 border-neutral-700 ">
          <div className="flex flex-col gap-3 items-start  rounded-lg px-3 py-2 ">
            <div
              onClick={() => navigate("/friends")}
              className="flex gap-3 items-center cursor-pointer hover:bg-neutral-700/30 rounded-lg px-3 py-2 transition"
            >
              <PeopleAltIcon className="text-orange-500" />
              <p className="text-white">{t("feed.friends")}</p>
            </div>
            
            <div
              onClick={() => navigate("/groups")}
              className="flex gap-3 items-center cursor-pointer hover:bg-neutral-700/30 rounded-lg px-3 py-2 transition"
            >
              <GroupsIcon className="text-orange-500" />
              <p className="text-white">{t("feed.groups")}</p>
            </div>

            <div
              onClick={() => navigate("/memories")}
              className="flex gap-3 items-center cursor-pointer hover:bg-neutral-700/30 rounded-lg px-3 py-2 transition"
            >
              <BrowseGalleryIcon className="text-orange-500" />
              <p className="text-white">{t("feed.memories")}</p>
            </div>

          </div>
        </div>

        {/* Contacts */}
        <div className="p-4 border-t border-neutral-700">
          <p className="text-lg font-semibold mb-3 text-orange-500">{t("feed.online")}</p>
         
          <ul className="space-y-2">
        {friends.length ===0 ? (<p className="text-neutral-500">{t("feed.noFriends")} :/</p>) : friends.map((friend) => (
          <li key={friend._id} className="flex items-center gap-3">
            {/* green or gray circle */}
            <div
              className={`w-3 h-3 rounded-full ${
                onlineUsers?.includes(friend._id)
                  ? "bg-green-400"
                  : "bg-gray-500"
              }`}
            />
            <span className="text-white px-4 py-2 rounded-2xl text-sm cursor-pointer hover:bg-gray-700 transition"  onClick={() => openChat(friend._id, friend.username)}>{friend.username}</span>
          </li>
        ))}
      </ul>
      
        </div>
      </div>

      {/* middle section */}
      <div className="w-full flex-1 max-w-xl mx-auto space-y-6 py-20 z-50">
     {children}
      </div>

      {/* right section */}
      <div className="hidden md:flex sticky top-20 w-[260px] min-h-screen max-w-2xl border-neutral-800 bg-neutral-800/30 space-y-6 z-10">
        {/* right section tags */}
        <div className="flex flex-col gap-5 p-4 border-neutral-700 border-b">
          {/* Sponsored tag */}
          <div className="p-4 border-b border-neutral-700">
            <p className="text-lg font-semibold mb-3 text-orange-500">
              {t("feed.sponsored")}
            </p>
            <div className="space-y-3">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="rounded-lg overflow-hidden bg-neutral-900/50 border border-neutral-800 cursor-pointer hover:scale-[1.02] transition"
                >
                  <img
                    src={`https://picsum.photos/seed/${n}/240/160`}
                    alt={`Ad ${n}`}
                    className="w-full h-32 object-cover bg-no-repeat bg-center"
                  />
                  <p className="text-sm text-white p-2">
                    {t("feed.ad")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showCommentsFor && (
        <CommentModal
          postId={showCommentsFor}
          isOpen={true}
          onClose={() => setShowCommentsFor("")}
        />
      )}
      
    </div>

)}
