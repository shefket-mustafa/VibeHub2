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
            onClick={() => acceptRequestHandler(id)}
            disabled={isLoading || isSuccess}
            className={`w-full py-1.5 px-2 rounded-md cursor-pointer text-xs font-semibold transition-all ${
              isSuccess
                ? "bg-green-600/60 text-gray-300 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600 text-white"
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
            className="w-full cursor-pointer py-1.5 px-2 rounded-md text-xs font-semibold bg-neutral-700 hover:bg-neutral-600 transition-all text-white"
          >
            {t("friends.requests.decline")}
          </button>
        </div>
      </div>
    </div>
  );
}
