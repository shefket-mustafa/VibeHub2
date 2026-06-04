import { Link } from "react-router";
import { useUser } from "../hooks/user";
import { useTranslation } from "react-i18next";

export default function GettingStarted() {
  const { user } = useUser();
  const { t } = useTranslation();

  return (
    <section className="w-full flex items-center justify-center min-h-screen py-20 px-4 z-10">
      <div className="max-w-2xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-block mb-6">
          <span className="px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold tracking-wide">
            ✨ Welcome to VibeHub
          </span>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6 text-white">
          Share your{" "}
          <span className="bg-linear-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            Vibes
          </span>
          ,<br />
          Connect with{" "}
          <span className="bg-linear-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            Friends
          </span>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-neutral-300 mb-8 max-w-xl mx-auto leading-relaxed">
          {t("gettingStarted.subtitle")}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link
            to={user ? "/feed" : "/auth/register"}
            className="vh-btn px-8 py-3 text-base font-semibold rounded-lg hover:shadow-lg"
          >
            {user ? "Go to feed" : "Get Started"}
          </Link>
          <Link
            to={user ? "/profile" : "/auth/login"}
            className="px-8 py-3 border-2 border-neutral-600 rounded-lg text-white font-semibold hover:border-neutral-400 transition"
          >
            {user ? "View profile" : "Sign In"}
          </Link>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-12 border-t border-neutral-800">
          <div className="text-center">
            <div className="text-3xl mb-3">🤝</div>
            <h3 className="font-semibold text-white mb-2">Connect Friends</h3>
            <p className="text-sm text-neutral-400">
              Build your network and stay close to people who matter
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">📸</div>
            <h3 className="font-semibold text-white mb-2">Share Moments</h3>
            <p className="text-sm text-neutral-400">
              Post photos, stories and updates with your community
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">👥</div>
            <h3 className="font-semibold text-white mb-2">Join Groups</h3>
            <p className="text-sm text-neutral-400">
              Discover and join communities that match your interests
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
