import { useState, useEffect } from "react";
import FriendsCard from "../components/FriendsCard";
import AllFriendsCard from "../components/AllFriendsCard";
import FriendSuggestionCards from "../components/FriendsSuggestionCard";
import FriendsLayout from "../layout/FriendsLayout";
import {
  useGetIncomingQuery,
  useGetAllFriendsQuery,
  useGetSuggestionsQuery,
} from "../redux/services/friendsApi";
import { useSocket } from "../hooks/useSocket";
import { useTranslation } from "react-i18next";
import type { IncomingRequest, UserPreview, Friends } from "../types/TStypes";

export default function FriendsPage() {
  const [activeTab, setActiveTab] = useState<
    "requests" | "all" | "suggestions"
  >("requests");
  const { t } = useTranslation();

  const {
    data: incoming = [],
    isLoading: loadingRequests,
    error: errorRequests,
    refetch: refetchRequests,
  } = useGetIncomingQuery();
  const {
    data: allFriends = [],
    isLoading: loadingAll,
    error: errorAll,
  } = useGetAllFriendsQuery();
  const {
    data: suggestions = [],
    isLoading: loadingSuggestions,
    error: errorSuggestions,
  } = useGetSuggestionsQuery();

  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on("newFriendRequest", () => {
      console.log("📩 New request arrived, refreshing list...");
      refetchRequests();
    });

    return () => {
      socket.off("newFriendRequest");
    };
  }, [socket, refetchRequests]);

  const error =
    (errorRequests as { error?: string })?.error ||
    (errorAll as { error?: string })?.error ||
    (errorSuggestions as { error?: string })?.error ||
    null;

  const isLoading = loadingRequests || loadingAll || loadingSuggestions;

  return (
    <FriendsLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="brand text-2xl font-bold">{t("friends.title")}</h1>
      </div>

      <div className="flex gap-6 border-b border-neutral-800 mb-6">
        <button
          className={`pb-2 cursor-pointer ${
            activeTab === "requests"
              ? "text-orange-400 border-b-2 border-orange-400"
              : "text-neutral-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("requests")}
        >
          {t("friends.sidebar.requests")}
        </button>

        <button
          className={`pb-2 cursor-pointer ${
            activeTab === "all"
              ? "text-orange-400 border-b-2 border-orange-400"
              : "text-neutral-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("all")}
        >
          {t("friends.sidebar.all")}
        </button>

        <button
          className={`pb-2 cursor-pointer ${
            activeTab === "suggestions"
              ? "text-orange-400 border-b-2 border-orange-400"
              : "text-neutral-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("suggestions")}
        >
          {t("friends.sidebar.suggestions")}
        </button>
      </div>

      {/* Error */}
      {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

      {/* Loading */}
      {isLoading && (
        <p className="text-sm muted mb-4">{t("friends.requests.loading")}</p>
      )}

      {/* Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6">
        {activeTab === "requests" ? (
          incoming.length === 0 ? (
            <p className="text-white col-span-full">
              {t("friends.requests.empty")}
            </p>
          ) : (
            incoming.map((data) => (
              <FriendsCard
                key={data._id}
                id={data.requestId}
                name={data.username}
                mutualFriends={[]}
                image={
                  (data as IncomingRequest).profilePicture ||
                  "https://i.pinimg.com/736x/2f/15/f2/2f15f2e8c688b3120d3d26467b06330c.jpg"
                }
              />
            ))
          )
        ) : activeTab === "all" ? (
          allFriends.length === 0 ? (
            <p className="text-white col-span-full">
              {t("friends.sidebar.all")} - No friends added!
            </p>
          ) : (
            allFriends.map((data) => (
              <AllFriendsCard
                key={data._id}
                id={data._id}
                name={data.username}
                mutualFriends={[]}
                image={
                  (data as Friends).profilePicture ||
                  "https://i.pinimg.com/736x/2f/15/f2/2f15f2e8c688b3120d3d26467b06330c.jpg"
                }
              />
            ))
          )
        ) : suggestions.length === 0 ? (
          <p className="text-white col-span-full">
            {t("friends.suggestions.empty")}
          </p>
        ) : (
          suggestions.map((data) => (
            <FriendSuggestionCards
              key={data._id}
              id={data._id}
              name={data.username}
              mutualFriends={[]}
              image={
                (data as UserPreview).profilePicture ||
                "https://i.pinimg.com/736x/2f/15/f2/2f15f2e8c688b3120d3d26467b06330c.jpg"
              }
            />
          ))
        )}
      </div>
    </FriendsLayout>
  );
}
