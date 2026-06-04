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
import ImageModal from "../components/FeedImageModal";
import { useTranslation } from "react-i18next";
// import type { UploadStatusType } from "../types/TStypes";
dayjs.extend(relativeTime);
// If you don’t extend it, dayjs(...).fromNow() will throw an error because the function doesn’t exist yet.

export default function Feed() {
  const baseUrl = import.meta.env.VITE_API_URL;
  const posts = useAppSelector((state) => state.posts.items);
  const dispatch = useAppDispatch();
  const { setShowCommentsFor } = useUser();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { t } = useTranslation();

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
      <form onSubmit={handleSubmit(onSubmit)} className="vh-card">
        {errors.root && (
          <p className="text-sm text-red-400">{errors.root.message}</p>
        )}{" "}
        <textarea
          placeholder={t("feed.placeholder")}
          className="w-full h-24 resize-none vh-input"
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
            <label
              htmlFor="post-image"
              className="cursor-pointer text-center overflow-hidden max-w-lg vh-btn text-black"
            >
              {t("feed.choose")}
            </label>

            <button type="submit" disabled={isSubmitting} className="vh-btn">
              {isSubmitting ? t("feed.post2") : t("feed.post1")}
            </button>
          </div>
        </div>
      </form>

      <ul className="space-y-4">
        {posts.map((p) => (
          <li key={p._id} className="post-card p-5 rounded-xl">
            <div className="flex items-center justify-between text-sm mb-4">
              <span className="font-bold text-base bg-linear-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">
                @{p.authorName}
              </span>
              <span className="text-xs text-neutral-500 font-medium">
                {dayjs(p.createdAt).fromNow()}
              </span>
            </div>

            <p className="mt-2 text-neutral-100 whitespace-pre-wrap leading-relaxed text-sm">
              {p.content}
            </p>

            {p.image && (
              <div
                onClick={() => setSelectedImage(p.image)}
                className="mt-4 rounded-xl overflow-hidden border border-orange-500/20 bg-neutral-950/50 hover:border-orange-500/50 transition-all cursor-pointer"
              >
                <img
                  src={p.image}
                  alt="post"
                  className="w-full max-h-80 object-cover transition-transform duration-300 hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
            )}

            <div className="mt-5 pt-4 border-t border-orange-500/10 flex justify-between items-center gap-4">
              <button
                onClick={() => onLike(p._id)}
                className={`text-sm font-semibold transition ${
                  p.liked
                    ? "text-red-500 drop-shadow-[0_0_4px_rgba(239,68,68,0.5)]"
                    : "text-orange-400 hover:text-orange-300"
                } cursor-pointer hover:opacity-90`}
              >
                ♥ {p.likes}
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowCommentsFor(p._id)}
                  className="text-sm text-white bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition px-3 py-1.5 rounded-lg cursor-pointer font-semibold shadow-lg hover:shadow-orange-500/50"
                >
                  💬 {t("feed.comments")}
                </button>

                {user?.id === p.authorId.toString() ? (
                  <button
                    onClick={() => onDelete(p._id)}
                    className="px-3 py-1.5 cursor-pointer text-sm hover:shadow-red-500/50 transition rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold shadow-lg"
                  >
                    {t("feed.delete")}
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <ImageModal
        imageUrl={selectedImage || ""}
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </PageContainer>
  );
}
