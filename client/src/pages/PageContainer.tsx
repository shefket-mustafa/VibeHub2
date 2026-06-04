import { type PropsWithChildren } from "react";
import { useUser } from "../hooks/user";
import { Link, useNavigate } from "react-router";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BrowseGalleryIcon from "@mui/icons-material/BrowseGallery";
import GroupsIcon from "@mui/icons-material/Groups";
import CommentModal from "../components/CommentModal";
import UserPreview from "../components/ui/UserPreview";
import { useGetAllFriendsQuery } from "../redux/services/friendsApi";
import { useSocket } from "../hooks/useSocket";
import { useChat } from "../context/ChatContext";
import { useTranslation } from "react-i18next";

export default function PageContainer({ children }: PropsWithChildren) {
  // const [showCommentsFor, setShowCommentsFor] = useState<string | null>(null);
  const { showCommentsFor, setShowCommentsFor } = useUser();
  const { data: friends = [] } = useGetAllFriendsQuery();
  const { onlineUsers } = useSocket();
  const { user } = useUser();
  const navigate = useNavigate();
  const { openChat } = useChat();
  const { t } = useTranslation();

  return (
    //main container
    <div className="w-full flex justify-between relative gap-4">
      {/* left section */}
      <div className="sticky hidden lg:flex flex-col top-0 w-64 max-h-[calc(100vh-4rem)] overflow-auto border-neutral-800 bg-neutral-800/30 space-y-6 z-10 p-2">
        {/* User Profile  */}
        <div className="vh-card mt-5">
          <Link to="/profile">
            <UserPreview
              avatar={user?.profilePicture}
              name={user?.username}
              sub={user?.email}
            />
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
          <p className="vh-section-title">{t("feed.online")}</p>

          <ul className="space-y-2">
            {friends.length === 0 ? (
              <p className="text-neutral-500">{t("feed.noFriends")} :/</p>
            ) : (
              friends.map((friend) => (
                <li key={friend._id} className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${onlineUsers?.includes(friend._id) ? "bg-green-400" : "bg-gray-500"}`}
                  />
                  <button
                    className="text-white px-4 py-2 rounded-2xl text-sm hover:bg-gray-700 transition"
                    onClick={() => openChat(friend._id, friend.username)}
                  >
                    {friend.username}
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      {/* middle section */}
      <div className="w-full max-w-2xl flex-1 space-y-6 py-14 z-50">
        {children}
      </div>

      {/* right section */}
      <div className="sticky hidden lg:flex flex-col top-0 w-64 max-h-[calc(100vh-4rem)] overflow-auto border-neutral-800 bg-neutral-800/30 space-y-6 z-10 p-2">
        {/* right section tags */}
        <div className="flex flex-col gap-5 p-4 border-neutral-700 border-b">
          {/* Sponsored tag */}
          <div className="vh-card">
            <p className="vh-section-title">{t("feed.sponsored")}</p>
            <div className="space-y-3">
              {[
                {
                  icon: "🚀",
                  title: "Next.js",
                  desc: "Modern React framework",
                },
                {
                  icon: "⚡",
                  title: "Express.js",
                  desc: "Fast backend runtime",
                },
                { icon: "🛢️", title: "MongoDB", desc: "NoSQL database" },
              ].map((sponsor, n) => (
                <div
                  key={n}
                  className="rounded-md overflow-hidden bg-neutral-900/50 border border-neutral-700 hover:border-orange-500/50 transition"
                >
                  <div className="bg-neutral-800/30 p-3 flex items-center gap-2 border-b border-neutral-700">
                    <span className="text-lg">{sponsor.icon}</span>
                    <div>
                      <p className="text-xs font-semibold text-white">
                        {sponsor.title}
                      </p>
                      <p className="text-xs text-neutral-400">{sponsor.desc}</p>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-neutral-300 mb-2">
                      Trusted by developers worldwide
                    </p>
                    <button className="vh-btn w-full text-xs py-1.5">
                      Learn more
                    </button>
                  </div>
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
  );
}
