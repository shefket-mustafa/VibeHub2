import GettingStartedPage from "./pages/GettingStartedPage";
import Login from "./pages/Login"
import Register from "./pages/Register"
import Layout from "./layout/Layout";
import Feed from "./pages/Feed";
import { Routes, Route } from "react-router";
import ScrollOnTop from "./helpers/ScrollOnTop";
import NotFound from "./pages/NotFound";

function App() {

  return (
    <>
      <ScrollOnTop />
    <Layout>

    <Routes>
      <Route path="/" element={<GettingStartedPage />} />
      <Route path="/feed" element={<Feed />} />

      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      
      <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
     
    </>
  )
}

export default App
