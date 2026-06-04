import { useTranslation } from "react-i18next";
import { useChat } from "../context/ChatContext";
import { useRemoveFriendMutation } from "../redux/services/friendsApi";
import type { FriendsCardType } from "../types/TStypes";

export default function AllFriendsCard({
  name,
  mutualFriends,
  image,
  id,
}: FriendsCardType) {
  const { t } = useTranslation();
  const [removeFriend] = useRemoveFriendMutation();
  const { openChat } = useChat();
  const removeFriendHandler = async (friendId: string) => {
    try {
      await removeFriend(friendId).unwrap();
      alert("Friend removed!");
    } catch (err) {
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
            onClick={() => openChat(id, name)}
            className="vh-btn w-full text-xs py-2"
          >
            {t("friends.all.message")}
          </button>

          <button
            onClick={() => removeFriendHandler(id)}
            className="w-full cursor-pointer py-1.5 px-2 rounded-md text-xs font-semibold bg-neutral-700/50 hover:bg-neutral-600/70 transition-all text-white border border-neutral-600/30"
          >
            {t("friends.all.remove")}
          </button>
        </div>
      </div>
    </div>
  );
}
