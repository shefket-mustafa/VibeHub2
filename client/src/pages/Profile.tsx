import { useEffect, useState } from "react";
import { useUser } from "../hooks/user";
import type { Friends, Post } from "../types/TStypes";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const { user } = useUser();
  const baseUrl = import.meta.env.VITE_API_URL;
  const [posts, setPosts] = useState<Post[]>([]);
  const [friends, setFriends] = useState<Friends[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    if (!user?.id) return;
    fetch(`${baseUrl}/posts/user/${user.id}`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Failed to fetch user posts:", err));
  }, [user, baseUrl]);

  useEffect(() => {
    if (!user?.id) return;
    fetch(`${baseUrl}/friends/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) =>
      res.json().then((data) => {
        console.log(data);

        setFriends(data.friends);
      }),
    );
  }, []);

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto py-10 text-center text-white">
        <p>{t("profile.error")}</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-8">
      {/* Profile Header Card */}
      <div className="vh-card">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
          {/* Avatar */}
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden shrink-0 border-4 border-orange-500/20">
            <img
              className="w-full h-full object-cover"
              src={
                user.profilePicture ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt={user.username}
            />
          </div>

          {/* User Info */}
          <div className="flex-1">
            <div className="mb-3">
              <h1 className="text-3xl md:text-4xl font-black text-white mb-1">
                {user.username}
              </h1>
              <p className="text-sm text-orange-400 font-semibold">
                @{user.username.toLowerCase()}
              </p>
            </div>

            {user.bio && (
              <p className="text-neutral-300 text-base mb-4 max-w-md">
                {user.bio}
              </p>
            )}

            <div className="flex flex-wrap gap-4 text-sm text-neutral-400 mb-6">
              {user.age && (
                <span className="flex items-center gap-1">🎂 {user.age}</span>
              )}
              {user.city && (
                <span className="flex items-center gap-1">📍 {user.city}</span>
              )}
              {user.country && (
                <span className="flex items-center gap-1">
                  🌍 {user.country}
                </span>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 py-4 border-t border-b border-neutral-700 mb-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-400">
                  {posts.length}
                </p>
                <p className="text-xs text-neutral-400 uppercase tracking-wide">
                  {t("profile.posts")}
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-400">
                  {friends.length}
                </p>
                <p className="text-xs text-neutral-400 uppercase tracking-wide">
                  {t("profile.friends")}
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-400">0</p>
                <p className="text-xs text-neutral-400 uppercase tracking-wide">
                  Groups
                </p>
              </div>
            </div>

            <Link to="/editProfile" className="vh-btn px-6 py-2 text-sm">
              {t("profile.edit")}
            </Link>
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div>
        <h2 className="vh-section-title mb-4">{t("profile.posts")}</h2>
        <div className="space-y-4">
          {posts.length > 0 ? (
            posts.map((p) => (
              <div key={p._id} className="vh-card">
                <div className="flex items-center justify-between text-sm muted mb-3">
                  <span className="text-orange-400 font-semibold">
                    @{p.authorName}
                  </span>
                  <span className="text-xs">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-neutral-200 whitespace-pre-wrap leading-relaxed">
                  {p.content}
                </p>
              </div>
            ))
          ) : (
            <div className="vh-card text-center py-8">
              <p className="text-neutral-400">{t("profile.noPosts")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
