import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { FaGhost } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <section className="w-full flex flex-col items-center justify-center min-h-screen text-center bg-neutral-950 text-white px-6 z-10">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center"
      >
        <FaGhost className="brand text-7xl mb-4 animate-bounce" />
        <h1 className="text-6xl font-bold mb-2">404</h1>
        <p className="text-lg muted mb-6">{t("notFound.oops")} 👻</p>
        <button onClick={() => navigate(-1)} className="btn-primary">
          Back
        </button>
      </motion.div>
    </section>
  );
}
