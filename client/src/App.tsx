import GettingStartedPage from "./pages/GettingStartedPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./layout/Layout";
import Feed from "./pages/Feed";
import { Routes, Route } from "react-router";
import ScrollOnTop from "./helpers/ScrollOnTop";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import { useUser } from "./hooks/user";
import ForgottenPassword from "./pages/ForgottenPassword";
import ResetPassword from "./pages/ResetPassword";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import FriendsPage from "./pages/Friends";


function App() {
  const { user } = useUser();

  return (
    <>
      <ScrollOnTop />
      <Layout>
        <Routes>
          <Route path="/" element={<GettingStartedPage />} />
          <Route path="/auth/forgot" element={<ForgottenPassword />} />
          <Route path="/auth/reset-password/:token" element={<ResetPassword />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ/>} />

          {user && <Route path="/feed" element={<Feed />} />}
          {user && <Route path="/profile" element={<Profile />} />}
          {user && <Route path="/friends" element={<FriendsPage />} />}

          {!user && <Route path="/auth/login" element={<Login />} />}
          {!user && <Route path="/auth/register" element={<Register />} />}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
