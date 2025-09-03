// src/components/layout/Footer.tsx
export default function Footer() {
    return (
      <footer className="bg-black text-white py-6 mt-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col  md:flex-row items-center justify-between gap-4">
          {/* Logo / Brand */}
          <span className="text-lg font-semibold text-white">VibeHub</span>
  
          {/* Links */}
          <nav className="flex gap-6 text-sm">
            <a href="/about" className="hover:text-white transition-colors">
              About
            </a>
            <a href="/features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="/contact" className="hover:text-white transition-colors">
              Contact
            </a>
          </nav>
  
          {/* Socials */}
          <div className="flex gap-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <i className="fab fa-github"></i>
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
  