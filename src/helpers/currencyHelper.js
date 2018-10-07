import { PL } from "../config/consts/languageConsts";

export const getCurrencyLocale = language => {
  switch (language) {
    case PL:
      return "pl";
    default:
      return "en";
  }
};

export const convert = (price, rate) => (price * rate) / 100;
