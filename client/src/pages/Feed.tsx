import { useEffect, useState } from "react";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BrowseGalleryIcon from "@mui/icons-material/BrowseGallery";
import GroupsIcon from "@mui/icons-material/Groups";
import { useForm } from "react-hook-form";
import { postSchema, type FeedPostData } from "../zod/postSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ApiResponse, Post } from "../types/TStypes";
import { useUser } from "../hooks/user";
import CommentModal from "../components/CommentModal";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigate } from "react-router";
dayjs.extend(relativeTime);
// If you don’t extend it, dayjs(...).fromNow() will throw an error because the function doesn’t exist yet.

export default function Feed() {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [posts, setPosts] = useState<Post[]>([]);
  const [showCommentsFor, setShowCommentsFor] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FeedPostData>({ resolver: zodResolver(postSchema) });

  const contentValue = watch("content") || "";
  const { user } = useUser();

  const onSubmit = async (data: FeedPostData) => {
    const token = localStorage.getItem("token");
    let result: ApiResponse;
    try {
      const res = await fetch(`${baseUrl}/posts/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: data.content }),
      });

      result = await res.json();

      if (!res.ok || "error" in result) {
        setError("root", {
          type: "server",
          message:
            "error" in result
              ? result.error
              : "Error creating a post. Try again!",
        });
        return;
      }
      setPosts((prev) => [result as Post, ...prev]);
      reset();
    } catch {
      result = { error: "Invalid server response" };
    }
  };

  const onDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${baseUrl}/posts/delete/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    if (res.ok) {
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } else {
      console.error(data.error);
    }
  };

  const onLike = async (id: string) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${baseUrl}/posts/${id}/like`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    if (res.ok) {
      setPosts((prev) =>
        prev.map((p) =>
          p._id === id ? { ...p, likes: data.likes, liked: data.liked } : p
        )
      );
    } else {
      console.error(data.error);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await fetch(`${baseUrl}/posts/allPosts`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const postData = await result.json();

      setPosts(postData);
    };
    fetchPosts();
  }, [baseUrl]);

  return (
    //main container
    <div className="w-full flex justify-between z-10">
      {/* left section */}
      <div className="sticky hidden md:flex flex-col top-20 w-[260px] min-h-screen max-w-2xl border-neutral-800 bg-neutral-800/30 space-y-6">
        {/* User Profile  */}
        <div className="flex items-center gap-3 p-4 border-b border-neutral-700">
          <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-black font-bold">
            {user?.username?.[0]?.toUpperCase() ?? "?"}
          </div>
          <div>
            <p className="text-white font-medium">
              {user?.username ?? "Guest"}
            </p>
            <p className="text-sm text-neutral-400">
              {user?.email ?? "anonymous"}
            </p>
          </div>
        </div>
        {/* left section tags */}
        <div className="flex flex-col items-start gap-5 p-4 border-neutral-700 ">
          
          <div className="flex flex-col gap-3 items-start  rounded-lg px-3 py-2 ">
            <div onClick={() => navigate('/friends')} className="flex gap-3 items-center cursor-pointer hover:bg-neutral-700/30 rounded-lg px-3 py-2 transition">
            <PeopleAltIcon className="text-orange-500"/>
            <p className="text-white">Friends</p>
            </div>

            <div onClick={() => navigate('/memories')} className="flex gap-3 items-center cursor-pointer hover:bg-neutral-700/30 rounded-lg px-3 py-2 transition">
            <BrowseGalleryIcon className="text-orange-500"/>
            <p className="text-white">Memories</p>
            </div>

            <div onClick={() => navigate('/groups')} className="flex gap-3 items-center cursor-pointer hover:bg-neutral-700/30 rounded-lg px-3 py-2 transition">
            <GroupsIcon className="text-orange-500"/>
            <p className="text-white">Groups</p>
            </div>
           

          </div>
        </div>

        {/* Contacts */}
        <div className="p-4 border-t border-neutral-700">
          <p className="text-lg font-semibold mb-3 text-orange-500">Contacts</p>
          <ul className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-700">
            {["user1", "user2", "user3"].map((u) => (
              <li
                key={u}
                className="flex items-center gap-2 text-white hover:text-orange-400 cursor-pointer transition"
              >
                <div className="w-8 h-8 rounded-full bg-neutral-700" />
                {u}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* middle section */}
      <div className="w-full flex-1 max-w-xl mx-auto space-y-6 py-20">
        {/* Composer */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-2xl border border-neutral-800 p-4 bg-neutral-900/30"
        >
          {errors.root && (
            <p className="text-sm text-red-400">{errors.root.message}</p>
          )}{" "}
          {/* errors caught by setError on api response */}
          <textarea
            placeholder="Share a vibe..."
            className="w-full h-24 resize-none rounded-md bg-neutral-200 border border-neutral-400 p-3 outline-none focus:border-orange-500"
            maxLength={500}
            {...register("content")}
          />
          {errors.content && (
            <p className="text-sm text-red-400">{errors.content.message}</p>
          )}
          <div className="flex items-center justify-between text-xs text-neutral-500 mt-2">
            <span>{500 - contentValue.length}</span>
            <button
              type="submit"
              disabled={!contentValue.trim() || isSubmitting}
              className="rounded-xl px-4 py-2 bg-orange-400 text-black cursor-pointer font-semibold hover:bg-orange-500 transition"
            >
              {isSubmitting ? "Posting..." : "Post"}
            </button>
          </div>
        </form>

        {/* Feed list */}
        <ul className="space-y-4">
          {posts.map((p) => (
            <li
              key={p._id}
              className="rounded-2xl border border-neutral-800 p-4 bg-neutral-900/30"
            >
              <div className="flex items-center justify-between text-sm text-neutral-400">
                <span className="font-medium text-orange-500">
                  @{p.authorName}
                </span>
                <span className="text-orange-500">{dayjs(p.createdAt).fromNow()}</span>
              </div>

              <p className="mt-2 text-neutral-100 whitespace-pre-wrap">
                {p.content}
              </p>

              <div className="mt-3 flex justify-between items-center gap-4">
                <button
                  onClick={() => onLike(p._id)}
                  className={`text-sm ${
                    p.liked ? "text-red-500" : "text-orange-500"
                  } cursor-pointer hover:underline`}
                >
                  ♥ {p.likes}
                </button>

                <div className="flex gap-5">
                  <button
                    onClick={() => setShowCommentsFor(p._id)}
                    className="text-sm text-black bg-orange-400 hover:bg-orange-500 transition px-3 py-1 rounded-lg cursor-pointer "
                  >
                    💬 Comments
                  </button>

                  {user?.id === p.authorId.toString() ? (
                    <button
                      onClick={() => onDelete(p._id)}
                      className="px-3 py-1 cursor-pointer hover:bg-orange-600 transition rounded-lg bg-orange-400"
                    >
                      Delete
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Load more (mock) */}
        {/* <div className="flex justify-center">
              <button
                type="button"
                disabled
                className="rounded-xl px-4 py-2 bg-neutral-800 text-neutral-400 cursor-not-allowed"
                title="Mock only"
              >
                Load more
              </button>
            </div> */}
      </div>

      {/* right section */}
      <div className="hidden md:flex sticky top-20 w-[260px] min-h-screen max-w-2xl border-neutral-800 bg-neutral-800/30 space-y-6">
        {/* right section tags */}
        <div className="flex flex-col gap-5 p-4 border-neutral-700 border-b">
          {/* Sponsored tag */}
          <div className="p-4 border-b border-neutral-700">
            <p className="text-lg font-semibold mb-3 text-orange-500">
              Sponsored by
            </p>
            <div className="space-y-3">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="rounded-lg overflow-hidden bg-neutral-900/50 border border-neutral-800 cursor-pointer hover:scale-[1.02] transition"
                >
                  <img
                    src={`https://picsum.photos/seed/${n}/240/160`}
                    alt={`Ad ${n}`}
                    className="w-full h-32 object-cover bg-no-repeat bg-center"
                  />
                  <p className="text-sm text-white p-2">
                    You can place your ads here for 150$/m
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showCommentsFor && (
        <CommentModal
          postId={showCommentsFor}
          isOpen={true}
          onClose={() => setShowCommentsFor(null)}
        />
      )}
    </div>
  );
}
