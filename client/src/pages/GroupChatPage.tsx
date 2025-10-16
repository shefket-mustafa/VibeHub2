// src/pages/GroupChatPage.tsx
import { useNavigate, useParams } from "react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useGetGroupQuery, useGetGroupMessagesQuery, useSendGroupMessageMutation } from "../redux/services/groupsApi";
import dayjs from "dayjs";
import { useSocket } from "../hooks/useSocket";
import type { GroupMessages } from "../types/TStypes";
import { FaCircleInfo } from "react-icons/fa6";
import GroupInfoModal from "../components/GroupInfoModal";

export default function GroupChatPage() {
  const { id } = useParams<{ id: string }>();
  const groupId = id ?? "";
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const { joinGroup, leaveGroup, sendGroupMessage, socket } = useSocket();
  // Queries
  const { data: group, isLoading: loadingGroup } = useGetGroupQuery(id!);
  const { data: baseMessages = [], isLoading: loadingMessages } = useGetGroupMessagesQuery(id!);
  const [sendMessage, { isLoading: sending }] = useSendGroupMessageMutation();
  const [groupInfoModalOpen, setGroupInfoModalOpen] = useState(false);

  console.log(sendMessage)

  const groupInfoModalHandler = () => {
    setGroupInfoModalOpen(prev => !prev)
  }

  const bottomRef = useRef<HTMLDivElement | null>(null);
  
  const [liveMessages, setLiveMessages] = useState<GroupMessages[]>([]);
  if (!id) return <p className="text-white">Invalid group.</p>;
  if (!groupId) return <p className="text-white">Invalid group.</p>;

  useEffect(() => {
    if (!groupId) return;

    joinGroup(id);

    return () => {
      leaveGroup(groupId);
    };

  }, [groupId ]);

  // reset live buffer when group changes or baseMessages refetch
  useEffect(() => {
    setLiveMessages([]);
  }, [id]);

  useEffect(() => {
    if (!socket || !id) return;
  
    const handleGroupMessage = (msg: GroupMessages) => {
      if (msg.group === id) {
        setLiveMessages((prev) => {
          if (prev.some((m) => m._id === msg._id)) return prev;
          return [...prev, msg];
        });
      }
    };
  
    socket.on("groupMessage", handleGroupMessage);
  
    // ✅ proper cleanup — React expects a void-returning function
    return () => {
      socket.off("groupMessage", handleGroupMessage);
    };
  }, [socket, id]);

  // merge REST + live (dedupe by _id)
  const combinedMessages = useMemo(() => {
    const byId = new Set(baseMessages.map((m) => m._id));
    const merged = [...baseMessages, ...liveMessages.filter((m) => !byId.has(m._id))]
    //sorting oldest-> newest
    return merged.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }, [baseMessages, liveMessages]);

  useEffect(() => {

    requestAnimationFrame(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    });
  },[combinedMessages])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    // socket only — no REST POST to avoid duplicate + refetch
    sendGroupMessage(id, text);
    setText("");
  };

  if (loadingGroup || loadingMessages) return <p className="text-white">Loading chat...</p>;

  return (
    <div className="h-[600px] w-3/4 flex flex-col justify-center m-10 rounded-lg bg-neutral-900 text-white z-10">
      {/* Header */}
      <div className="p-4 border-b border-neutral-800 flex  justify-between">
      <div className="flex gap-3 justify-center items-center">
        <h1 className="text-xl font-bold">{group?.name}</h1>
        <FaCircleInfo onClick={groupInfoModalHandler} className="text-orange-500 hover:text-orange-600 cursor-pointer"/>
      </div>
        <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-black font-semibold transition cursor-pointer"
         onClick={() => navigate(-1)}>Back</button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {combinedMessages.map((m: GroupMessages) => (
          <div key={m._id} className="flex gap-2">
            <span className="font-semibold text-orange-500">{m.sender?.username}:</span>
            <span>{m.text}</span>
            <span className="text-orange-400 text-xs">
                  {dayjs(m.createdAt).fromNow()}
                </span>
          </div>
        ))}
        <div ref={bottomRef} />
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

      {groupInfoModalOpen && group && (
        <GroupInfoModal 
        modalHandler={groupInfoModalHandler}
        name={group.name} 
        description={group.description} 
        members={group.members} 
        owner={group.owner}/>
      )}
    </div>
  );
}
