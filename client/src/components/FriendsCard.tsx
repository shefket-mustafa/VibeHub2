import { useTranslation } from "react-i18next";
import {
  useAcceptFriendRequestMutation,
  useDeclineFriendRequestMutation,
} from "../redux/services/friendsApi";
import type { FriendsCardType } from "../types/TStypes";

export default function FriendsCard({
  name,
  mutualFriends,
  image,
  id,
}: FriendsCardType) {
  const [acceptFriendRequest, { isLoading, isSuccess }] =
    useAcceptFriendRequestMutation();
  const [declineFriendRequest] = useDeclineFriendRequestMutation();
  const { t } = useTranslation();

  const acceptRequestHandler = async (id: string) => {
    try {
      const result = await acceptFriendRequest(id).unwrap();
      console.log(result.message);
    } catch (err) {
      console.error("Failed to accept request!", err);
    }
  };

  const cancelRequestHandler = async (id: string) => {
    try {
      await declineFriendRequest(id).unwrap();
      alert("Request declined!");
    } catch (err) {
      console.error("Failed to accept request!", err);
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
            onClick={() => acceptRequestHandler(id)}
            disabled={isLoading || isSuccess}
            className={`vh-btn w-full text-xs py-2 ${
              isSuccess ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {isSuccess
              ? t("friends.requests.accepted")
              : isLoading
                ? t("friends.requests.accepting")
                : t("friends.requests.accept")}
          </button>

          <button
            onClick={() => cancelRequestHandler(id)}
            className="w-full cursor-pointer py-1.5 px-2 rounded-md text-xs font-semibold bg-neutral-700/50 hover:bg-neutral-600/70 transition-all text-white border border-neutral-600/30"
          >
            {t("friends.requests.decline")}
          </button>
        </div>
      </div>
    </div>
  );
}
