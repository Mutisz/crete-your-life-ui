import DateFnsUtils from "material-ui-pickers/utils/date-fns-utils-old";
import enLocale from "date-fns/locale/en-GB";
import plLocale from "date-fns/locale/pl";
import { format } from "date-fns";

import { LANGUAGE_EN, LANGUAGE_PL } from "./createI18n";

export const DATE_FORMAT = "D MMM YYYY, dddd";
export const DATE_FORMAT_SHORT = "D MMM, dd.";
export const DATE_FORMAT_ISO = "YYYY-MM-DD";

export const createI18nDateLocale = language => {
  switch (language) {
    case LANGUAGE_EN:
      return enLocale;
    case LANGUAGE_PL:
      return plLocale;
    default:
      throw new Error(`${language} is not a recognized language`);
  }
};

class I18nDateFnsUtils extends DateFnsUtils {
  getDatePickerHeaderText = date => {
    return format(date, DATE_FORMAT_SHORT, { locale: this.locale });
  };
}

export default I18nDateFnsUtils;
