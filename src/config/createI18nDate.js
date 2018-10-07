import DateFnsUtils from "material-ui-pickers/utils/date-fns-utils-old";
import enLocale from "date-fns/locale/en-GB";
import plLocale from "date-fns/locale/pl";
import { format } from "date-fns";

import { EN, PL } from "./consts/languageConsts";
import { DATE_FORMAT_SHORT } from "./consts/dateConsts";

export const createI18nDateLocale = language => {
  switch (language) {
    case EN:
      return enLocale;
    case PL:
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
