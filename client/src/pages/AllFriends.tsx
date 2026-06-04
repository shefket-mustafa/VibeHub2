import AllFriendsCard from "../components/AllFriendsCard";
import FriendsLayout from "../layout/FriendsLayout";
import { useGetAllFriendsQuery } from "../redux/services/friendsApi";

export default function AllFriends() {
  const { data: allFriends = [], isLoading, error } = useGetAllFriendsQuery();

  return (
    <FriendsLayout>
      <h1 className="brand text-xl mb-4">All friends</h1>
      {isLoading && <p className="muted">Loading...</p>}
      {error && <p className="text-red-500">Failed to fetch friends!</p>}
      {allFriends.length === 0 && (
        <div className="vh-card py-8 text-center">
          <p className="text-white mb-2">You don't have any friends yet.</p>
          <p className="text-sm muted mb-4">
            Discover people to connect with on the suggestions tab.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6">
        {allFriends.map((data) => (
          <AllFriendsCard
            key={data._id}
            id={data._id}
            name={data.username}
            mutualFriends={[]}
            image={
              data.profilePicture ||
              "https://i.pinimg.com/736x/2f/15/f2/2f15f2e8c688b3120d3d26467b06330c.jpg"
            }
          />
        ))}
      </div>
    </FriendsLayout>
  );
}
