import { Link } from "react-router";
import { useUser } from "../hooks/user";
import { useTranslation } from "react-i18next";

export default function GettingStarted() {
  const { user } = useUser();
  const { t } = useTranslation();

  return (
    <section className="center-max text-center px-4 z-10">
      <div className="mb-5">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {t("gettingStarted.title")}
        </h1>
        <span className="text-4xl md:text-5xl brand">VibeHub</span>
      </div>
      <p className="text-neutral-300 mb-8 max-w-md">
        {t("gettingStarted.subtitle")}
      </p>
      <Link
        to={user ? "/feed" : "/auth/login"}
        className="inline-block btn-primary"
      >
        {t("gettingStarted.button")}
      </Link>
    </section>
  );
}
