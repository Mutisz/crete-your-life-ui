import i18n from "i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { reactI18nextModule } from "react-i18next";

export const LANGUAGE_EN = "en";
export const LANGUAGE_PL = "pl";
export const LANGUAGES = {
  [LANGUAGE_EN]: "English",
  [LANGUAGE_PL]: "Polski"
};

const createI18n = () =>
  i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(reactI18nextModule)
    .init({
      debug: process.env.DEBUG,
      fallbackLng: "en",
      whitelist: Object.keys(LANGUAGES),
      ns: ["translations"],
      defaultNS: "translations",
      interpolation: {
        escapeValue: false
      },
      react: {
        wait: true
      }
    });

export default createI18n;
