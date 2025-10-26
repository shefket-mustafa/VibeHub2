import FriendSuggestionCards from "../components/FriendsSuggestionCard";
import type { UserPreview } from "../types/TStypes";
import { useGetSuggestionsQuery } from "../redux/services/friendsApi";
import FriendsLayout from "../layout/FriendsLayout";
import { useTranslation } from "react-i18next";


export default function FriendSuggestions() {
  const { data: suggestions = [], isLoading, isError} = useGetSuggestionsQuery();
  const {t} = useTranslation();

  return (
    <FriendsLayout>
    <h1 className="text-orange-500 text-xl mb-4">{t("friends.suggestions.title")}</h1>
    {isLoading && <p className="text-neutral-400">{t("friends.suggestions.loading")}</p>}
    {isError && <p className="text-red-500">{t("friends.suggestions.error")}</p>}
    {suggestions.length === 0 && <p className="text-white">{t("friends.suggestions.empty")}</p>}

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 py-6 justify-items-center">
      {suggestions.map((data: UserPreview) => (
        <FriendSuggestionCards
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
