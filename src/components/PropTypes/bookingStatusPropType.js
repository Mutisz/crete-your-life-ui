import PropTypes from "prop-types";

import dateItemProp from "./dateItemPropType";
import { BOOKING_STEP_LIST } from "../../schema";

const bookingStatusProp = PropTypes.shape({
  activeStep: PropTypes.oneOf(BOOKING_STEP_LIST).isRequired,
  fromDateString: PropTypes.string,
  toDateString: PropTypes.string,
  personCount: PropTypes.number,
  email: PropTypes.string,
  phone: PropTypes.string,
  dateActivitySelected: PropTypes.string,
  dateActivityList: PropTypes.arrayOf(dateItemProp).isRequired
});

export default bookingStatusProp;
