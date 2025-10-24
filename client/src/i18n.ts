import i18n from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from "react-i18next"; 

import en from "./locales/en/translation.json";
import bg from "./locales/bg/translation.json";


i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en", // default language
    supportedLngs: ["en", "bg"],
    detection: {
      order: ["localStorage", "navigator"], // detect saved or browser language
      caches: ["localStorage"], // persist choice
    },
    interpolation: {
      escapeValue: false,
    },
    resources: {
        en: { translation: en },
        bg: { translation: bg },
      },
    });

  export default i18n;