import PropTypes from "prop-types";

import activityPropType from "./activityPropType";

const bookingPropType = PropTypes.shape({
  number: PropTypes.string.isRequired,
  email: PropTypes.string,
  phone: PropTypes.string,
  dates: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      activity: activityPropType
    })
  )
});

export default bookingPropType;
