import Header from "./Header";
import Footer from "./Footer";
import type { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen">
      <Header />
      {/* Enhanced background with vibrant gradient */}
      <div className="fixed inset-0 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 -z-20 pointer-events-none" />

      {/* Glowing orange radial gradient */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.08),transparent_60%)] -z-10 pointer-events-none" />

      <main className="min-h-screen backdrop-blur-sm">
        <div className="">{children}</div>
      </main>

      <Footer />
    </div>
  );
}
