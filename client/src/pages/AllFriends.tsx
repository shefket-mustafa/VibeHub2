
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
            image={data.profilePicture || "https://scontent-otp1-1.xx.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s480x480&_nc_cat=110&ccb=1-7&_nc_sid=136b72&_nc_ohc=owXgrBh0NC4Q7kNvwG5jXCy&_nc_oc=Adk_eXC5wIUX7cwEMi3OxHi_aIh4mnNMTWFIiJfVFPmQ9EoOCzSbYUcRIYE2hUoUfvI&_nc_zt=24&_nc_ht=scontent-otp1-1.xx&oh=00_AfeCAAJ5fwFkeDtjsRl7Bl4swGQeSLSM-WKLwNg2GSVpCA&oe=6925A6FA"}
          />
        ))}
      </div>
    </FriendsLayout>
  );
}
