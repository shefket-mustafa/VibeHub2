import { useTranslation } from "react-i18next";

export default function About() {

  const {t} = useTranslation();
    return (
      <section className="max-w-4xl mx-auto px-6 py-16 text-center text-neutral-200">
        <h1 className="text-4xl font-bold text-orange-500 mb-6">{t("about.title")}</h1>
  
        <p className="text-lg text-neutral-300 leading-relaxed mb-8">
          {t("about.intro.part1")} 
          <span className="text-orange-400 font-semibold">{t("about.intro.highlight")}</span>, 
        {t("about.intro.part2")}
        </p>
  
        <div className="grid md:grid-cols-3 gap-6 text-left">
          <div className="bg-neutral-800/50 rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold text-orange-400 mb-3">✨ {t("about.mission.title")}</h2>
            <p className="text-sm text-neutral-400">
              {t("about.mission.text")}
            </p>
          </div>
  
          <div className="bg-neutral-800/50 rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold text-orange-400 mb-3">⚡ {t("about.tech.title")}</h2>
            <p className="text-sm text-neutral-400">
              {t("about.tech.text1")}
              <span className="text-neutral-200"> React + TypeScript</span> {t("about.tech.text2")}
              <span className="text-neutral-200"> Express + MongoDB</span> {t("about.tech.text3")}{" "}
               <span className="text-neutral-200">TailwindCSS</span>.
            </p>
          </div>
  
          <div className="bg-neutral-800/50 rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold text-orange-400 mb-3">🌍 {t("about.vision.title")}</h2>
            <p className="text-sm text-neutral-400">
              {t("about.vision.text")}
            </p>
          </div>
        </div>
  
        <p className="mt-12 text-neutral-400 text-sm">
          {t("about.footer2")}
        </p>
      </section>
    );
  }
  