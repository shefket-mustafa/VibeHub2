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
          image={data.profilePicture || "https://i.pinimg.com/736x/2f/15/f2/2f15f2e8c688b3120d3d26467b06330c.jpg"}
        />
      ))}
    </div>
  </FriendsLayout>
  );
}
