import { useEffect, useState } from "react";
import { useUser } from "../hooks/user";
import type { Post } from "../types/TStypes";
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import { Link } from "react-router";

export default function Profile() {
  const { user } = useUser();
  const baseUrl = import.meta.env.VITE_API_URL;
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (!user) return;
    fetch(`${baseUrl}/posts/user/${user.id}`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Failed to fetch user posts:", err));
  }, [user, baseUrl]);

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto py-10 text-center text-white">
        <p>You need to log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-5 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-6 border-b border-neutral-800 pb-6">
       
        <EmojiPeopleIcon className=" rounded-full border-2 text-white border-orange-500" fontSize="large"/>
        <div>
          <h1 className="text-2xl font-bold text-white">{user.username}</h1>
          <p className="text-neutral-400">@{user.username.toLowerCase()}</p>
          <p className="text-neutral-500 text-sm mt-1 mb-3">{user.email}</p>
          <Link to="/editProfile" className="mt-5 px-4 py-1 rounded-lg bg-orange-500 text-black cursor-pointer font-semibold hover:bg-orange-600 hover:text-black transition">
            Edit Profile
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-8 text-neutral-400">
        <span>{posts.length} Posts</span>
        <span>120 Followers</span>
        <span>200 Following</span>
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
                <span className="font-medium text-orange-500">@{p.authorName}</span>
                <span>{new Date(p.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="text-white whitespace-pre-wrap">{p.content}</p>
            </div>
          ))
        ) : (
          <p className="text-neutral-500">No posts yet.</p>
        )}
      </div>
    </div>
  );
}
