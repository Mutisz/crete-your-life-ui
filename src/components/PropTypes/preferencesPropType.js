import PropTypes from "prop-types";

const preferencesPropType = PropTypes.shape({
  currency: PropTypes.shape({
    code: PropTypes.string.isRequired,
    rate: PropTypes.number.isRequired
  })
});

export default preferencesPropType;
