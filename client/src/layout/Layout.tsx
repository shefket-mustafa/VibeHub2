import Header from "./Header";
import Footer from "./Footer";
import type{PropsWithChildren} from "react";
import { useLocation } from "react-router";

export default function Layout( { children }: PropsWithChildren) {

  const location = useLocation();
  const isFriendsPage = location.pathname.startsWith("/friends")
  return (
    <div className="min-h-screen ">
      <Header />

  {/* dark base */}
  <div className="fixed inset-0 bg-linear-to-b from-neutral-950 to-neutral-900 -z-10" />

{/* orangey radial glow */}
<div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(234,88,12,0.25),transparent_70%)] z-1" />


      <main   className={`min-h-screen flex-1 bg-neutral-800 ${
          isFriendsPage ? "pt-1" : "flex items-center justify-center"
        }`}
      >
        {children}
      </main>

      <Footer />
    </div>
  );
}
