import { useEffect, useState } from "react";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BrowseGalleryIcon from "@mui/icons-material/BrowseGallery";
import GroupsIcon from "@mui/icons-material/Groups";
import { useForm } from "react-hook-form";
import { postSchema, type FeedPostData } from "../zod/postSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ApiResponse, Post } from "../types/TStypes";
import { useUser } from "../hooks/user";

export default function Feed() {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [posts, setPosts] = useState<Post[]>([]);

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
      headers: {Authorization: `Bearer ${token}`,}
    })

    const data = await res.json();
    if(res.ok){
      setPosts((prev) => prev.filter((p) => p._id !== id))
    }else {
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
        {/* left section tags */}
        <div className="flex flex-col gap-5 p-4 border-neutral-700 ">
          {/* Profile tag */}
          {/* <div className="flex gap-3 items-center"> */}
          {/* <AccountCircleIcon /> */}
          {/* <p className="text-orange-500">{"Pesho"}</p>
            </div> */}

          {/* Friends tag */}
          <div className="flex flex-col gap-5 p-4">
            {[
              { icon: <PeopleAltIcon />, label: "Friends" },
              { icon: <BrowseGalleryIcon />, label: "Memories" },
              { icon: <GroupsIcon />, label: "Groups" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex gap-3 items-center cursor-pointer hover:bg-neutral-700/30 rounded-lg px-3 py-2 transition"
              >
                <span className="text-orange-500">{item.icon}</span>
                <p className="text-white">{item.label}</p>
              </div>
            ))}
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
              className="rounded-xl px-4 py-2 bg-orange-500 text-black cursor-pointer font-semibold hover:bg-white transition disabled:opacity-60"
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
                <span className="text-orange-500">5 mins ago</span>
              </div>

              <p className="mt-2 text-neutral-100 whitespace-pre-wrap">
                {p.content}
              </p>

              <div className="mt-3 flex justify-between items-center gap-4">
                <button className="text-sm text-orange-500 hover:underline">
                  ♥ {"5"}
                </button>

                {user?.id === p.authorId.toString() ? (
                  <button onClick={() => onDelete(p._id)} className="px-3 py-1 cursor-pointer rounded-lg bg-orange-400">
                    Delete
                  </button>
                ) : (
                  ""
                )}
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
    </div>
  );
}
