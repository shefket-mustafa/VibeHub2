
import { Link } from "react-router"
import { GrLanguage } from "react-icons/gr"


export default  function Navbar() {
  const user = "something"; // global state TODO
    


    return(
<header className="border-b border-neutral-800 flex bg-orange-500 relative z-10 text-white/90">
          <nav className="mx-auto max-w-5xl p-4 flex  items-center gap-6">
            <Link to="/" className="font-semibold cursor-pointer">
              VibeHub
            </Link>
            {user && <Link to="/feed" className="hover:underline">
              Feed
            </Link>}
            {user && <Link to="/profile" className="hover:underline">
              Profile
            </Link>}
          </nav>

          <div className="mx-auto max-w-5xl p-4 flex items-center gap-6">
            <GrLanguage className="cursor-pointer"/>

          {user && <button className="cursor-pointer hover:underline">Logout</button> }
          </div>
        </header>
    )
}
