import { useEffect, useState } from "react";
import { useUser } from "../hooks/user";
import type { Friends, Post } from "../types/TStypes";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const { user } = useUser();
  const baseUrl = import.meta.env.VITE_API_URL;
  const [posts, setPosts] = useState<Post[]>([]);
  const [friends, setFriends] = useState<Friends[]>([])
  const {t} = useTranslation();

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
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then((res) => res.json()
  .then((data) => {
    console.log(data);
    
    setFriends(data.friends)}))
  },[])

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto py-10 text-center text-white">
        <p>{t("profile.error")}</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-5 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-6 border-b border-neutral-800 pb-6">
        <div className="rounded-full w-30 h-30 overflow-hidden flex items-center justify-center">
        <img className=" w-full h-full object-cover" src={user.profilePicture || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="Loading" />
        </div>
        
        <div>
          <h1 className=" text-orange-500 text-2xl font-bold">{user.username}</h1>
          {user.bio && <p className="text-white text-sm whitespace-pre-wrap max-w-[300px]">{user.bio}</p>}
          <div className="flex gap-3 text-neutral-500 text-sm">
            {user.age && <span>🎂 {user.age}</span>}
            {user.city && <span>📍 {user.city}</span>}
            {user.country && <span>🌍 {user.country}</span>}
          </div>
          <p className="text-neutral-400">@{user.username.toLowerCase()}</p>
          <p className="text-neutral-500 text-sm mt-1 mb-3">{user.email}</p>

          <Link
            to="/editProfile"
            className="mt-5 px-4 py-1 rounded-lg bg-orange-500 text-black cursor-pointer font-semibold hover:bg-orange-600 hover:text-black transition"
          >
            {t("profile.edit")}
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-8 text-neutral-400">
        <span>{posts.length} {t("profile.posts")}</span>
        <span>{friends.length} {t("profile.friends")}</span>
        
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {posts.length > 0 ? (
          posts.map((p) => (
            <div
              key={p._id}
              className="rounded-2xl border border-neutral-800 p-4 bg-neutral-900/30"
            >
              <div className="flex items-center justify-between text-sm text-neutral-400 mb-2">
                <span className="font-medium text-orange-500">
                  @{p.authorName}
                </span>
                <span>{new Date(p.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="text-white whitespace-pre-wrap">{p.content}</p>
            </div>
          ))
        ) : (
          <p className="text-neutral-500">{t("profile.noPosts")}</p>
        )}
      </div>
    </div>
  );
}
