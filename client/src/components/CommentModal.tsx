import { useEffect, useState } from "react";
import type { Comment, CommentModalProps } from "../types/TStypes";

export default function CommentModal({
  postId,
  isOpen,
  onClose,
}: CommentModalProps) {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const fetchComments = async () => {
      const res = await fetch(`${baseUrl}/posts/${postId}/comments`);
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    };
    fetchComments();
  }, [isOpen, postId, baseUrl]);

  const handleAddComment = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${baseUrl}/posts/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content: newComment }),
    });

    if (res.ok) {
      const data = await res.json();
      setComments((prev) => [...prev, data]);
      setNewComment("");
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
          <h2 className="text-lg font-semibold">Comments</h2>
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
            <p className="text-neutral-400">No comments yet.</p>
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
            placeholder="Write a comment..."
            className="flex-1 rounded-md bg-neutral-800 border border-neutral-600 px-3 py-2 text-white outline-none"
          />
          <button
            onClick={handleAddComment}
            disabled={!newComment.trim()}
            className="bg-orange-500 hover:bg-orange-400 disabled:opacity-50 rounded-lg px-4"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
