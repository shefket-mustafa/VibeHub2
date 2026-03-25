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
    <div
      key={id}
      className="flex flex-col bg-neutral-800/60 border border-neutral-700/80 rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:border-orange-400/50 transition-all duration-300 h-full max-w-xs mx-auto"
    >
      <img src={image} alt={name} className="h-32 w-full object-cover" />

      <div className="flex flex-col justify-between flex-1 p-3 text-white">
        <div>
          <p className="font-semibold text-sm truncate">{name}</p>
          {mutualFriends.length > 0 && (
            <p className="text-xs text-neutral-400 mt-0.5">
              {mutualFriends.length} {t("friends.mutual")}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5 mt-3">
          <button
            onClick={() => handleAddFriend(id)}
            disabled={isLoading || isSuccess}
            className={`w-full py-1.5 px-2 rounded-md cursor-pointer text-xs font-semibold transition-all ${
              isSuccess
                ? "bg-green-600/60 text-gray-300 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600 text-white"
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
            className="w-full cursor-pointer py-1.5 px-2 rounded-md text-xs font-semibold bg-neutral-700 hover:bg-neutral-600 transition-all text-white"
          >
            {t("friends.suggestions.message")}
          </button>
        </div>
      </div>
    </div>
  );
}
