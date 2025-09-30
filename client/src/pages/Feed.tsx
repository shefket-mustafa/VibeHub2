import { useEffect, useState, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { postSchema, type FeedPostData } from "../zod/postSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "../hooks/user";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  createPost,
  deletePost,
  fetchAllPosts,
  likePost, 
} from "../redux/slices/postsSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import PageContainer from "./PageContainer";
// import type { UploadStatusType } from "../types/TStypes";
dayjs.extend(relativeTime);
// If you don’t extend it, dayjs(...).fromNow() will throw an error because the function doesn’t exist yet.

export default function Feed() {
  const baseUrl = import.meta.env.VITE_API_URL;
  const posts = useAppSelector((state) => state.posts.items);
  const dispatch = useAppDispatch();
  const {setShowCommentsFor} = useUser();

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
  const [file, setFile] = useState<File | null>(null);
 
  const onSubmit = async (data: FeedPostData) => {
    try {
      const formData = new FormData();
      formData.append("content", data.content);
      if (file) {
        formData.append("file", file);
      }

      await dispatch(createPost(formData));
    
    reset();
    setFile(null);


      } catch (err) {
      setError("root", {
        type: "server",
        message: String(err),
      });
    }
  };

  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const onDelete = async (id: string) => {
    try {
      await dispatch(deletePost(id));
    } catch (err) {
      setError("root", {
        type: "server",
        message: String(err),
      });
    }
  };

  const onLike = async (id: string) => {
    try {
      await dispatch(likePost(id));
    } catch (err) {
      setError("root", { type: "server", message: String(err) });
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      await dispatch(fetchAllPosts());
    };
    fetchPosts();
  }, [baseUrl]);

  return (
    <PageContainer>

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

            <div className="flex gap-5">
              <input
                type="file"
                id="post-image"
                accept="image/*"
                className="hidden mt-2"
                onChange={fileChangeHandler}
              />

              {file && (
                <div className="pl-5">
                  <p>File name: {file.name}</p>
                  <p>File size: {file.size / 1024}KB</p>
                  <p>File type: {file.type}</p>
                </div>
              )}
              <label htmlFor="post-image" className="cursor-pointer text-center overflow-hidden max-w-lg bg-orange-400 max-h-10 md:max-h-8 text-black hover:bg-orange-500 py-2 px-4 rounded-xl transition font-semibold">
                Choose a file
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-xl max-h-10 md:max-h-8 px-4 py-2 bg-orange-400 text-black cursor-pointer font-semibold hover:bg-orange-500 transition"
              >
                {isSubmitting ? "Posting..." : "Post"}
              </button>
            </div>
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
                <span className="text-orange-500">
                  {dayjs(p.createdAt).fromNow()}
                </span>
              </div>
              
              <p className="mt-2 text-neutral-100 whitespace-pre-wrap">
                {p.content}
              </p>

              {p.image && (
                <img
                  src={p.image}
                  alt="post"
                  className="mt-2 rounded-lg max-h-60 object-cover"
                />
              )}


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

    </PageContainer>
  );
}
