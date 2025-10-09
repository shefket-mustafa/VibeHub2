import { useChat } from "../context/ChatContext";
import { useSendFriendRequestMutation } from "../redux/services/friendsApi";
import type { FriendsCardType } from "../types/TStypes";




export default function FriendSuggestionCards({ name, mutualFriends, image, id }: FriendsCardType){

  const [sendFriendRequest, { isLoading, isSuccess }] = useSendFriendRequestMutation();
  const { openChat } = useChat(); 
  const handleAddFriend = async (id: string) => {

    try{
      const result = await sendFriendRequest(id).unwrap();
      console.log(result.newFriendRequest);
      alert("Friend request sent!")
    }catch(err){
      alert("Failed to send request");
      console.error(err);
    }
  }

    return(

        <div key={id} className="h-64 w-56 rounded-lg bg-neutral-300 flex flex-col justify-end z-10">

            <div className="h-1/2 w-full">
            <img className="h-full w-full rounded-t-lg object-cover" src={image} alt="" />
            </div>
            

<div className="flex-1 flex flex-col justify-between p-3 z-10 ">
  <p className="text-sm ">{name}</p>
  <p className="h-8">
    {mutualFriends.length === 0
      ? ""
      : `${mutualFriends.length} mutual friends`}
  </p>

  <div className="flex flex-col gap-1 z-10">
    <button onClick={() => handleAddFriend(id)} 
    disabled = {isLoading || isSuccess}
    className={`h-8 rounded-md transition cursor-pointer ${
      isSuccess ? "bg-gray-500 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600 cursor-pointer"
    }`}>
      {isSuccess ? "Request Sent" : "Add"}
    </button>
    <button
    onClick={() => openChat(id)}
    className="bg-neutral-700 cursor-pointer h-8 rounded-md hover:bg-neutral-600 transition">
      Message
    </button>
  </div>
</div>
</div>
)}