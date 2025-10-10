import { useChat } from "../context/ChatContext";
import { useRemoveFriendMutation } from "../redux/services/friendsApi";
import type { FriendsCardType } from "../types/TStypes";




export default function AllFriendsCard({ name, mutualFriends, image, id }: FriendsCardType){

  const [removeFriend] = useRemoveFriendMutation();
  const {openChat} = useChat();
  const removeFriendHandler = async (friendId: string) => {
    try {
      await removeFriend(friendId).unwrap();
      alert("Friend removed!");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div
      key={id}
      className="flex flex-col bg-neutral-800 border border-neutral-700 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition w-full sm:w-56"
    >
      <img src={image} alt={name} className="h-40 w-full object-cover" />

      <div className="flex flex-col justify-between flex-1 p-3 text-white">
        <div>
          <p className="font-medium text-base sm:text-lg truncate">{name}</p>
          {mutualFriends.length > 0 && (
            <p className="text-sm text-neutral-400">
              {mutualFriends.length} mutual friend
              {mutualFriends.length > 1 && "s"}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 mt-3 z-10">
          <button
            onClick={() => openChat(id)}
            className="flex-1 cursor-pointer py-2 rounded-md text-sm font-semibold bg-orange-500 hover:bg-orange-600 transition"
          >
            Message
          </button>

          <button
            onClick={() => removeFriendHandler(id)}
            className="flex-1 cursor-pointer py-2 rounded-md text-sm font-semibold bg-neutral-700 hover:bg-neutral-600 transition"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );}