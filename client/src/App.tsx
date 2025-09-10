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

function App() {
  const { user } = useUser();

  return (
    <>
      <ScrollOnTop />
      <Layout>
        <Routes>
          <Route path="/" element={<GettingStartedPage />} />
          <Route path="/auth/forgot" element={<ForgottenPassword />} />

          {user && <Route path="/feed" element={<Feed />} />}
          {user && <Route path="/profile" element={<Profile />} />}

          {!user && <Route path="/auth/login" element={<Login />} />}
          {!user && <Route path="/auth/register" element={<Register />} />}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
