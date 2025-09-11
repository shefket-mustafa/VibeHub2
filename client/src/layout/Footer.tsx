import { Link } from "react-router";
import { IoLogoInstagram } from "react-icons/io5";
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

// src/components/layout/Footer.tsx
export default function Footer() {
    return (
      <footer className="bg-black text-white py-6 mt-10 ">
        <div className="max-w-7xl mx-auto px-4 flex flex-col  md:flex-row items-center justify-between gap-4">
          {/* Logo / Brand */}
          <span className="text-lg font-semibold text-white">VibeHub</span>
  
          {/* Links */}
          <nav className="flex gap-6 text-sm z-10">
            <Link to="/about" className="hover:text-white transition-colors">
              About
            </Link>
            <Link to="/features" className="hover:text-white transition-colors">
              Features
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </nav>
  
          {/* Socials */}
          <div className="flex gap-4 z-10">
          <a
              href="https://github.com/shefket-mustafa/VibeHub2/tree/main"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <FaGithub />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:bg-blue-600 transition-colors"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.instagram.com/shefket_sum/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-600  transition-colors"
            >
              <IoLogoInstagram />
            </a>
          </div>
        </div>
  
        {/* Bottom line */}
        <div className="text-center text-xs border-t border-neutral-700 text-white mt-4">
          <p className="pt-2"> © {new Date().getFullYear()} VibeHub. All rights reserved.</p>
        </div>
      </footer>
    );
  }
  