import i18n, { InitOptions } from "i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { reactI18nextModule } from "react-i18next";

import { EN, LANGUAGES } from "./consts/languageConsts";

const config: InitOptions = {
  debug: Boolean(process.env.REACT_APP_DEBUG),
  fallbackLng: EN,
  whitelist: Object.keys(LANGUAGES),
  ns: ["translations"],
  defaultNS: "translations",
  interpolation: {
    escapeValue: false
  },
  react: {
    wait: true
  }
};

const createI18n = () =>
  i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(reactI18nextModule)
    .init(config, null);

export default createI18n;
