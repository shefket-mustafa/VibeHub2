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

    return(

        <div key={id} className="h-64 w-56 rounded-2xl bg-neutral-300 flex flex-col justify-end z-10">

            <div className="h-1/2 w-full">
            <img className="h-full w-full rounded-t-2xl object-cover" src={image} alt="" />
            </div>
            

<div className="flex-1 flex flex-col justify-between p-3">
  <p className="text-sm">{name}</p>
  <p className="h-8">
    {mutualFriends.length === 0
      ? ""
      : `${mutualFriends.length} mutual friends`}
  </p>

  <div className="flex flex-col gap-1 z-10">
    <button
    
    onClick={() => openChat(id)}
    className="bg-orange-500 cursor-pointer h-8 rounded-md hover:bg-orange-600 transition">
      Message
    </button>
    <button onClick={() => removeFriendHandler(id)}
     className="bg-neutral-700 cursor-pointer h-8 rounded-md hover:bg-neutral-600 transition">
      Remove
    </button>
  </div>
</div>
</div>
)}