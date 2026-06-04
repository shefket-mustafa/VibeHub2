import { useTranslation } from "react-i18next";
import { useChat } from "../context/ChatContext";
import { useSendFriendRequestMutation } from "../redux/services/friendsApi";
import type { FriendsCardType } from "../types/TStypes";

export default function FriendSuggestionCards({
  name,
  mutualFriends,
  image,
  id,
}: FriendsCardType) {
  const [sendFriendRequest, { isLoading, isSuccess }] =
    useSendFriendRequestMutation();
  const { openChat } = useChat();
  const { t } = useTranslation();
  const handleAddFriend = async (id: string) => {
    try {
      const result = await sendFriendRequest(id).unwrap();
      console.log(result.newFriendRequest);
      alert("Friend request sent!");
    } catch (err) {
      alert("Failed to send request");
      console.error(err);
    }
  };

  return (
    <div key={id} className="friend-card flex flex-col h-full">
      <div className="relative w-full h-44 overflow-hidden">
        <img src={image} alt={name} className="friend-card-image" />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
      </div>

      <div className="flex flex-col justify-between flex-1 p-4 text-white">
        <div>
          <p className="font-bold text-base truncate">{name}</p>
          {mutualFriends.length > 0 && (
            <p className="text-xs text-orange-300/70 mt-1">
              {mutualFriends.length} {t("friends.mutual")}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <button
            onClick={() => handleAddFriend(id)}
            disabled={isLoading || isSuccess}
            className={`vh-btn w-full text-xs py-2 ${
              isSuccess ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {isSuccess
              ? t("friends.suggestions.sent")
              : isLoading
                ? t("friends.suggestions.adding")
                : t("friends.suggestions.add")}
          </button>

          <button
            onClick={() => openChat(id, name)}
            className="w-full cursor-pointer py-1.5 px-2 rounded-md text-xs font-semibold bg-neutral-700/50 hover:bg-neutral-600/70 transition-all text-white border border-neutral-600/30"
          >
            {t("friends.suggestions.message")}
          </button>
        </div>
      </div>
    </div>
  );
}
