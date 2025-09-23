import { useAcceptFriendRequestMutation, useCancelFriendRequestMutation, useDeclineFriendRequestMutation } from "../redux/services/friendsApi";
import type { FriendsCardType } from "../types/TStypes";

export default function FriendsCard({
  name,
  mutualFriends,
  image,
  id,
}: FriendsCardType) {

  const [acceptFriendRequest, {isLoading, isSuccess}] = useAcceptFriendRequestMutation();
  const [declineFriendRequest] = useDeclineFriendRequestMutation();

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
      className="h-64 w-56 rounded-lg bg-neutral-300 flex flex-col justify-end"
    >
      <div className="h-1/2 w-full">
        <img
          className="h-full w-full rounded-t-lg object-cover"
          src={image}
          alt=""
        />
      </div>

      <div className="flex-1 flex flex-col justify-between p-3">
        <p className="">{name}</p>
        <p className="h-8">
          {mutualFriends.length === 0
            ? ""
            : `${mutualFriends.length} mutual friends`}
        </p>

        <div className="flex flex-col gap-1">
          <button onClick={() => acceptRequestHandler(id)}
          disabled = {isLoading || isSuccess}
          className={`h-8 rounded-md transition ${
            isSuccess ? "bg-gray-500 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600 cursor-pointer"
          }`}
          >
            {isSuccess ? "Request sent" : "Accept"}
          </button>
          <button onClick={() => cancelRequestHandler(id)}
          className="bg-neutral-700 cursor-pointer h-8 rounded-md hover:bg-neutral-600 transition">
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
