
import { Link, useNavigate } from "react-router"
import { GrLanguage } from "react-icons/gr"


export default  function Navbar() {
  const user = "something"; // global state TODO
  const navigate = useNavigate();


  const logout = () => {
      localStorage.removeItem("User")
      localStorage.removeItem("token")
      navigate("/")      
  }
    


    return(
<header className="border-b border-neutral-800 flex px-10 justify-between items-center bg-orange-500 relative z-10 text-white/90">
            <div className="flex gap-15">

              <div className="flex items-center">
            <Link to="/" className="font-modak font-semibold cursor-pointer text-2xl" style={{fontFamily: "'Limelight', cursive"}}>
              VibeHub
            </Link>
            </div>

          <div className=" max-w-5xl p-4 flex  items-center gap-6">
            {user && <Link to="/feed" className="hover:underline">
              Feed
            </Link>}
            {user && <Link to="/profile" className="hover:underline">
              Profile
            </Link>}
          </div>
            </div>

          <div className="max-w-5xl p-4 flex items-center gap-6">
            <GrLanguage className="cursor-pointer"/>
          {user && <button onClick={logout} className="cursor-pointer hover:underline">Logout</button> }
          </div>
          
        </header>
    )
}
