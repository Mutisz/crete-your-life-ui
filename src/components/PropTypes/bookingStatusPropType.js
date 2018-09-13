import PropTypes from "prop-types";

import dateItemProp from "./dateItemPropType";
import { BOOKING_STEPS } from "../../schema";

const bookingStatusProp = PropTypes.shape({
  activeStep: PropTypes.oneOf(BOOKING_STEPS).isRequired,
  fromDateString: PropTypes.string,
  toDateString: PropTypes.string,
  personCount: PropTypes.number,
  email: PropTypes.string,
  phone: PropTypes.string,
  dateActivitySelected: PropTypes.string,
  dateActivities: PropTypes.arrayOf(dateItemProp).isRequired
});

export default bookingStatusProp;
