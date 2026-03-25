import { Link } from "react-router";
import { IoLogoInstagram } from "react-icons/io5";
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { useTranslation } from "react-i18next";

// src/components/layout/Footer.tsx
export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-black/40 backdrop-blur-sm text-white py-6 mt-10 rounded-t-xl border-t border-neutral-800">
      {/* Sponsored By Section */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <h3 className="text-center text-sm font-semibold text-orange-400 mb-4">
          ✨ Sponsored by
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center justify-center">
          {/* Ad Card 1 */}
          <a
            href="#"
            className="group relative overflow-hidden rounded-lg border border-neutral-700 bg-linear-to-br from-neutral-800 to-neutral-900 p-4 hover:border-orange-400 transition"
          >
            <div className="aspect-video bg-linear-to-br from-purple-500/20 to-pink-500/20 rounded flex items-center justify-center text-3xl">
              🚀
            </div>
            <p className="text-xs text-neutral-400 mt-2 text-center group-hover:text-orange-300 transition">
              Next.js
            </p>
          </a>

          {/* Ad Card 2 */}
          <a
            href="#"
            className="group relative overflow-hidden rounded-lg border border-neutral-700 bg-linear-to-br from-neutral-800 to-neutral-900 p-4 hover:border-orange-400 transition"
          >
            <div className="aspect-video bg-linear-to-br from-blue-500/20 to-cyan-500/20 rounded flex items-center justify-center text-3xl">
              ⚡
            </div>
            <p className="text-xs text-neutral-400 mt-2 text-center group-hover:text-orange-300 transition">
              Express.js
            </p>
          </a>

          {/* Ad Card 3 */}
          <a
            href="#"
            className="group relative overflow-hidden rounded-lg border border-neutral-700 bg-linear-to-br from-neutral-800 to-neutral-900 p-4 hover:border-orange-400 transition"
          >
            <div className="aspect-video bg-linear-to-br from-green-500/20 to-emerald-500/20 rounded flex items-center justify-center text-3xl">
              🛢️
            </div>
            <p className="text-xs text-neutral-400 mt-2 text-center group-hover:text-orange-300 transition">
              MongoDB
            </p>
          </a>

          {/* Ad Card 4 */}
          <a
            href="#"
            className="group relative overflow-hidden rounded-lg border border-neutral-700 bg-linear-to-br from-neutral-800 to-neutral-900 p-4 hover:border-orange-400 transition"
          >
            <div className="aspect-video bg-linear-to-br from-orange-500/20 to-yellow-500/20 rounded flex items-center justify-center text-3xl">
              🎨
            </div>
            <p className="text-xs text-neutral-400 mt-2 text-center group-hover:text-orange-300 transition">
              TailwindCSS
            </p>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 flex flex-col  md:flex-row items-center justify-between gap-4">
        {/* Logo / Brand */}
        <span className="text-lg font-semibold text-white">VibeHub</span>

        {/* Links */}
        <nav className="flex gap-6 text-sm z-10">
          <Link to="/about" className="hover:text-white transition-colors">
            {t("footer.about")}
          </Link>
          <Link to="/faq" className="hover:text-white transition-colors">
            {t("footer.faq")}
          </Link>
          <Link to="/contact" className="hover:text-white transition-colors">
            {t("footer.contact")}
          </Link>
        </nav>

        {/* Socials */}
        <div className="flex gap-4 z-10 items-center">
          <a
            href="https://github.com/shefket-mustafa/VibeHub2/tree/main"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors text-xl"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/shefket-mustafa-81356a360/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors text-xl"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://www.instagram.com/shefket_sum/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-400 transition-colors text-xl"
          >
            <IoLogoInstagram />
          </a>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center text-xs text-white mt-4">
        <p className="pt-2">
          {" "}
          © {new Date().getFullYear()} VibeHub. {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
