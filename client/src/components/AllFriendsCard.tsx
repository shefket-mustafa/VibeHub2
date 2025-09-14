import type { FriendsCardType } from "../types/TStypes";




export default function AllFriendsCard({ name, mutualFriends, image, id }: FriendsCardType){

    return(

        <div key={id} className="h-72 w-64 rounded-2xl bg-neutral-300 flex flex-col justify-end">

            <div className="h-1/2 w-full">
            <img className="h-full w-full rounded-t-2xl object-cover" src={image} alt="" />
            </div>
            

<div className="flex-1 flex flex-col justify-between p-3">
  <p className="text-">{name}</p>
  <p className="h-8">
    {mutualFriends.length === 0
      ? ""
      : `${mutualFriends.length} mutual friends`}
  </p>

  <div className="flex flex-col gap-1">
    <button className="bg-orange-500 cursor-pointer h-8 rounded-md hover:bg-orange-600 transition">
      Message
    </button>
    <button className="bg-neutral-700 cursor-pointer h-8 rounded-md hover:bg-neutral-600 transition">
      Remove
    </button>
  </div>
</div>
</div>
)}