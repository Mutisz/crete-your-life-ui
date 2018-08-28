import { find } from "lodash";

import { LANGUAGE_EN } from "../config/createI18n";

export const findItem = (dateString, dateItemList, itemList) => {
  const dateItem = find(dateItemList, ["dateString", dateString]);
  return dateItem ? find(itemList, ["name", dateItem.name]) : null;
};

export const findItemTranslation = (item, language) => {
  return language === LANGUAGE_EN
    ? item
    : find(item.translationList, ["language", language]);
};
