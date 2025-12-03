
import AllFriendsCard from "../components/AllFriendsCard";
import FriendsLayout from "../layout/FriendsLayout";
import { useGetAllFriendsQuery } from "../redux/services/friendsApi";


export default function AllFriends() {

  const {data: allFriends=[], isLoading, error} = useGetAllFriendsQuery();
  

  return (
    <FriendsLayout>
      <h1 className="text-orange-500 text-xl mb-4">All friends</h1>
      {isLoading && <p className="text-neutral-400">Loading...</p>}
      {error && <p className="text-red-500">Failed to fetch friends!</p>}
      {allFriends.length === 0 && <p className="text-white">No friends added!</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6">
        {allFriends.map((data) => (
          <AllFriendsCard
            key={data._id}
            id={data._id}
            name={data.username}
            mutualFriends={[]}
            image={data.profilePicture || "https://i.pinimg.com/736x/2f/15/f2/2f15f2e8c688b3120d3d26467b06330c.jpg"}
          />
        ))}
      </div>
    </FriendsLayout>
  );
}
