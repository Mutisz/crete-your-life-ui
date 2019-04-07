import MomentUtils from "@date-io/moment";
import moment from "moment";
import "moment/locale/fr";
import "moment/locale/pl";

import { DATE_FORMAT_SHORT } from "../config/consts/dateConsts";

class MuiPickersUtils extends MomentUtils {
  getDatePickerHeaderText = date => {
    return moment(date).format(DATE_FORMAT_SHORT);
  };
}

export default MuiPickersUtils;
