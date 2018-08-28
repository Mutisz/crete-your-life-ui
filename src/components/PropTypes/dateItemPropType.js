import PropTypes from "prop-types";

const dateItemProp = PropTypes.shape({
  dateString: PropTypes.string.isRequired,
  name: PropTypes.string
});

export default dateItemProp;
