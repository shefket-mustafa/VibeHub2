// src/pages/GroupChatPage.tsx
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import { useGetGroupQuery, useGetGroupMessagesQuery, useSendGroupMessageMutation } from "../redux/services/groupsApi";
import dayjs from "dayjs";

export default function GroupChatPage() {
  const { id } = useParams<{ id: string }>();
  const [text, setText] = useState("");
  const navigate = useNavigate();

  // Queries
  const { data: group, isLoading: loadingGroup } = useGetGroupQuery(id!);
  const { data: messages = [], isLoading: loadingMessages } = useGetGroupMessagesQuery(id!);
  const [sendMessage, { isLoading: sending }] = useSendGroupMessageMutation();

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      await sendMessage({ id: id!, text }).unwrap();
      setText(""); 
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  if (loadingGroup || loadingMessages) return <p className="text-white">Loading chat...</p>;

  return (
    <div className="h-[600px] w-3/4 flex flex-col justify-center m-10 rounded-lg bg-neutral-900 text-white z-10">
      {/* Header */}
      <div className="p-4 border-b border-neutral-800 flex  justify-between">
        <h1 className="text-xl font-bold">{group?.name}</h1>
        <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-black font-semibold transition cursor-pointer"
         onClick={() => navigate(-1)}>Back</button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m: any) => (
          <div key={m._id} className="flex gap-2">
            <span className="font-semibold text-orange-500">{m.sender?.username}:</span>
            <span>{m.text}</span>
            <span className="text-orange-400 text-xs">
                  {dayjs(m.createdAt).fromNow()}
                </span>
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="flex p-4 border-t border-neutral-800 gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 bg-neutral-800 text-white rounded-lg px-3 py-2 focus:outline-none"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          disabled={sending}
          className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-black font-semibold transition cursor-pointer"
        >
          {sending ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}
