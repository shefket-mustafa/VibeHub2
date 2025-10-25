import { useEffect, useState } from "react";
import type { CommentModalProps } from "../types/TStypes";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addComent, fetchComments } from "../redux/slices/postsSlice";
import { useTranslation } from "react-i18next";

export default function CommentModal({
  postId,
  isOpen,
  onClose,
}: CommentModalProps) {
  const baseUrl = import.meta.env.VITE_API_URL;
  const post = useAppSelector((state) => state.posts.items.find((p) => p._id === postId));
  const comments = post?.comments || [];
  const dispatch = useAppDispatch();
  const [newComment, setNewComment] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    if (!isOpen) return;

    const fetchAllComments = async () => {
     await dispatch(fetchComments(postId))
    };
    fetchAllComments();
  }, [isOpen, postId, baseUrl]);

  const handleAddComment = async () => {
    try {

      await dispatch(addComent({postId, newComment}))
      setNewComment("")

    }catch(err){
      console.error(err)
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-neutral-900 text-white rounded-xl shadow-lg w-full max-w-lg h-[80vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-neutral-700">
          <h2 className="text-lg font-semibold">{t("comments.title")}</h2>
          <button
            onClick={onClose}
            className="text-orange-400 cursor-pointer hover:text-orange-200"
          >
            ✕
          </button>
        </div>

        {/* Comment list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {comments.length === 0 ? (
            <p className="text-neutral-400">{t("comments.empty")}</p>
          ) : (
            comments.map((c) => (
              <div key={c._id} className="border-b border-neutral-700 pb-2">
                <p className="text-orange-400 text-sm">@{c.authorName}</p>
                <p className="text-neutral-200">{c.content}</p>
                <p className="text-xs text-neutral-500">
                  {new Date(c.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-neutral-700 flex gap-2">
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={t("comments.placeHolder")}
            className="flex-1 rounded-md bg-neutral-800 border border-neutral-600 px-3 py-2 text-white outline-none"
          />
          <button
            onClick={handleAddComment}
            disabled={!newComment.trim()}
            className="bg-orange-500 hover:bg-orange-400 disabled:opacity-50 rounded-lg px-4"
          >
            {t("comments.post")}
          </button>
        </div>
      </div>
    </div>
  );
}
