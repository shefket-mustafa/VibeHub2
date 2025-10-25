import { useTranslation } from "react-i18next";
import { BsFillGearFill } from "react-icons/bs";
import { Link, useLocation } from "react-router";

export default function FriendsLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const {t} = useTranslation();

  const isActive = (path: string) =>
    location.pathname === path
      ? "text-orange-500 bg-neutral-700/40"
      : "text-white hover:text-orange-500 hover:bg-neutral-700/40";

  return (
    <section className="w-full flex flex-col md:flex-row mt-20 px-4 md:px-10 z-10">
      {/* Sidebar */}
      <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-neutral-700 p-4 mb-4 md:mb-0 z-10">
        <div className="flex justify-between items-center border-b border-neutral-700 pb-2 mb-4">
          <p className="text-2xl font-bold text-orange-500">{t("friends.title")}</p>
          <BsFillGearFill className="text-white cursor-pointer hover:text-orange-500" />
        </div>

        <nav className="flex md:flex-col gap-2 justify-center md:justify-start">
          <Link
            to="/friends"
            className={`px-3 py-2 rounded-lg transition ${isActive("/friends")}`}
          >
            {t("friends.sidebar.requests")}
          </Link>
          <Link
            to="/friends/all"
            className={`px-3 py-2 rounded-lg transition ${isActive("/friends/all")}`}
          >
            {t("friends.sidebar.all")}
          </Link>
          <Link
            to="/friends/suggestions"
            className={`px-3 py-2 rounded-lg transition ${isActive("/friends/suggestions")}`}
          >
            {t("friends.sidebar.suggestions")}
          </Link>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 px-4 md:px-10">{children}</div>
    </section>
  );
}
