import i18n from "i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";

import { EN, LANGUAGES } from "./consts/languageConsts";

import { initReactI18next } from "react-i18next";

const config: i18n.InitOptions = {
  debug: Boolean(process.env.REACT_APP_DEBUG),
  fallbackLng: EN,
  whitelist: Object.keys(LANGUAGES),
  ns: ["translations"],
  defaultNS: "translations",
  interpolation: {
    escapeValue: false
  },
  react: {
    wait: true,
    useSuspense: false
  }
};

const initializeI18n = (): void => {
  i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init(config);
};

export default initializeI18n;
