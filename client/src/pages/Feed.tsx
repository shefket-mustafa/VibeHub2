import { useState } from "react";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BrowseGalleryIcon from "@mui/icons-material/BrowseGallery";
import GroupsIcon from "@mui/icons-material/Groups";

export default function Feed() {
  type Post = {
    id: string;
    authorName: string;
    content: string;
    createdAt: string;
  };

  const MockPosts = [
    {
      id: "1",
      authorName: "Pesho",
      content: "Test-Test-Test-Test-Test-Test-Test-Test-",
      createdAt: "11:30",
    },
    {
      id: "2",
      authorName: "Mincho",
      content: "Test-Test-Test-Test-Test-Test-Test-Test-",
      createdAt: "11:30",
    },
    {
      id: "3",
      authorName: "Ricko",
      content: "Test-Test-Test-Test-Test-Test-Test-Test-",
      createdAt: "11:30",
    },
    {
      id: "4",
      authorName: "Ringo",
      content: "Test-Test-Test-Test-Test-Test-Test-Test-",
      createdAt: "11:30",
    },
  ];

  const [posts, setPosts] = useState<Post[]>(MockPosts);

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
        <form className="rounded-2xl border border-neutral-800 p-4 bg-neutral-900/30">
          <textarea
            placeholder="Share a vibe..."
            className="w-full h-24 resize-none rounded-md bg-neutral-200 border border-neutral-400 p-3 outline-none focus:border-orange-500"
            maxLength={200}
            //   value={content}
            //   onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex items-center justify-between text-xs text-neutral-500 mt-2">
            {/* <span>{200 - content.length}</span> */}
            <button
              type="submit"
              // disabled = {!content.trim() || submitting}
              className="rounded-xl px-4 py-2 bg-orange-500 text-black font-semibold hover:bg-white transition disabled:opacity-60"
            >
              {/* {submitting ? "Posting..." : "Post"} */}
              Post
            </button>
          </div>
        </form>

        {/* Feed list */}
        <ul className="space-y-4">
          {posts.map((p) => (
            <li
              key={p.id}
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
              <div className="mt-3 flex items-center gap-4">
                <button className="text-sm text-orange-500 hover:underline">
                  ♥ {"5"}
                </button>
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
  <p className="text-lg font-semibold mb-3 text-orange-500">Sponsored by</p>
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
        <p className="text-sm text-white p-2">You can place your ads here for 150$/m</p>
      </div>
    ))}
  </div>
</div>
        </div>
      </div>
    </div>
  );
}
