import Header from "./Header";
import Footer from "./Footer";
import type { PropsWithChildren } from "react";
import { useLocation } from "react-router";

export default function Layout({ children }: PropsWithChildren) {
  const location = useLocation();
  return (
    <div className="min-h-screen ">
      <Header />
      <div className="fixed inset-0 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-800 -z-20 pointer-events-none" />

      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(234,88,12,0.20),transparent_70%)] -z-10 pointer-events-none" />

      <main
        className={`min-h-screen flex-1 bg-neutral-800/60 backdrop-blur-sm ${
          location.pathname.startsWith("/profile")
            ? "pt-20"
            : "flex items-center justify-center"
        }`}
      >
        {children}
      </main>

      <Footer />
    </div>
  );
}
