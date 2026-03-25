import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();
  return (
    <section className="center-max px-6 py-16 text-center text-neutral-200">
      <h1 className="text-4xl font-bold brand mb-6">{t("about.title")}</h1>

      <p className="text-lg text-neutral-300 leading-relaxed mb-8">
        {t("about.intro.part1")}
        <span className="text-orange-400 font-semibold">
          {t("about.intro.highlight")}
        </span>
        ,{t("about.intro.part2")}
      </p>

      <div className="grid md:grid-cols-3 gap-8 text-left mt-12">
        <div className="card p-8 transform hover:scale-105 transition duration-300">
          <h2 className="text-2xl font-bold text-orange-400 mb-4">
            ✨ {t("about.mission.title")}
          </h2>
          <p className="text-base muted leading-relaxed">
            {t("about.mission.text")}
          </p>
        </div>

        <div className="card p-8 transform hover:scale-105 transition duration-300">
          <h2 className="text-2xl font-bold text-orange-400 mb-4">
            ⚡ {t("about.tech.title")}
          </h2>
          <p className="text-base muted leading-relaxed">
            {t("about.tech.text1")}
            <span className="text-neutral-200 font-semibold">
              {" "}
              React + TypeScript
            </span>{" "}
            {t("about.tech.text2")}
            <span className="text-neutral-200 font-semibold">
              {" "}
              Express + MongoDB
            </span>{" "}
            {t("about.tech.text3")}{" "}
            <span className="text-neutral-200 font-semibold">TailwindCSS</span>.
          </p>
        </div>

        <div className="card p-8 transform hover:scale-105 transition duration-300">
          <h2 className="text-2xl font-bold text-orange-400 mb-4">
            🌍 {t("about.vision.title")}
          </h2>
          <p className="text-base muted leading-relaxed">
            {t("about.vision.text")}
          </p>
        </div>
      </div>

      <p className="mt-12 muted text-sm">{t("about.footer2")}</p>
    </section>
  );
}
