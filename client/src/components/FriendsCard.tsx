
import { useTranslation } from "react-i18next";
import { useAcceptFriendRequestMutation, useDeclineFriendRequestMutation } from "../redux/services/friendsApi";
import type { FriendsCardType } from "../types/TStypes";

export default function FriendsCard({
  name,
  mutualFriends,
  image,
  id,
}: FriendsCardType) {

  const [acceptFriendRequest, {isLoading, isSuccess}] = useAcceptFriendRequestMutation();
  const [declineFriendRequest] = useDeclineFriendRequestMutation();
  const {t} = useTranslation();

  const acceptRequestHandler = async (id: string) => {

    try{
      const result = await acceptFriendRequest(id).unwrap();
      console.log(result.message); 
      
    }catch(err){
      console.error("Failed to accept request!", err)
    }
  }

  const cancelRequestHandler = async (id: string) => {

    try{
       await declineFriendRequest(id).unwrap();
      alert("Request declined!")
      
    }catch(err){
      console.error("Failed to accept request!", err)
    }
  }
  return (
    <div
      key={id}
      className="flex flex-col bg-neutral-800 border border-neutral-700 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition w-full sm:w-56"
    >
      <img
        src={image}
        alt={name}
        className="h-40 w-full object-cover"
      />

      <div className="flex flex-col justify-between flex-1 p-3 text-white">
        <div>
          <p className="font-medium text-base sm:text-lg truncate">{name}</p>
          {mutualFriends.length > 0 && (
            <p className="text-sm text-neutral-400">
              {mutualFriends.length} {t("friends.mutual")}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 mt-3 z-10">
          <button
            onClick={() => acceptRequestHandler(id)}
            disabled={isLoading || isSuccess}
            className={`flex-1 py-2 rounded-md cursor-pointer text-sm font-semibold transition ${
              isSuccess
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {isSuccess ? t("friends.requests.accepted") : isLoading ? t("friends.requests.accepting") : t("friends.requests.accept")}
          </button>

          <button
            onClick={() => cancelRequestHandler(id)}
            className="flex-1 cursor-pointer py-2 rounded-md text-sm font-semibold bg-neutral-700 hover:bg-neutral-600 transition"
          >
            {t("friends.requests.decline")}
          </button>
        </div>
      </div>
    </div>
  );
}
