
import FriendsCard from "./FriendsCard";
import { useGetIncomingQuery } from "../redux/services/friendsApi";
import type { IncomingRequest } from "../types/TStypes";
import { useSocket } from "../hooks/useSocket";
import { useEffect } from "react";
import FriendsLayout from "../layout/FriendsLayout";
import { useTranslation } from "react-i18next";



export default function FriendsPage() {
  const {data: incoming=[], isLoading, error, refetch} = useGetIncomingQuery();
  const {socket} = useSocket();
  const {t} = useTranslation();

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
   <FriendsLayout>
     <h1 className="text-orange-500 text-xl mb-4">{t("friends.title")}</h1>
      {isLoading && <p className="text-neutral-400">{t("friends.requests.loading")}</p>}
      {error && <p className="text-red-500">{t("friends.requests.error")}</p>}
      {incoming.length === 0 && <p className="text-white">{t("friends.requests.empty")}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6">
        {incoming.map((data: IncomingRequest) => (
          <FriendsCard
            key={data._id}
            id={data.requestId}
            name={data.username}
            mutualFriends={[]}
            image={data.profilePicture || "https://i.pinimg.com/736x/2f/15/f2/2f15f2e8c688b3120d3d26467b06330c.jpg"}
          />
        ))}
      </div>
   </FriendsLayout>

  );
}
