import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { FaGhost } from "react-icons/fa";

export default function NotFound() {

  const navigate = useNavigate();
  return (
    <section className="w-full flex flex-col items-center justify-center min-h-screen text-center bg-neutral-950 text-white px-6 z-10">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center"
      >
        <FaGhost className="text-orange-500 text-7xl mb-4 animate-bounce" />
        <h1 className="text-6xl font-bold mb-2">404</h1>
        <p className="text-lg text-neutral-400 mb-6">
          Whoooops... looks like this vibe doesn’t exist 👻
        </p>
        <button
          onClick={() => navigate(-1)}
          className="rounded-xl px-6 py-3 bg-orange-500 cursor-pointer text-black font-semibold hover:bg-orange-400 transition"
        >
          Back
        </button>
      </motion.div>
    </section>
  );
}
