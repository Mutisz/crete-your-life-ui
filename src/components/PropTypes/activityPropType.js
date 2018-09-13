import PropTypes from "prop-types";

export const imageProp = PropTypes.shape({
  isThumbnail: PropTypes.bool.isRequired,
  filePath: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  url: PropTypes.string
});

export const translationProp = PropTypes.shape({
  language: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
});

const activityProp = PropTypes.shape({
  name: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(imageProp),
  translations: PropTypes.arrayOf(translationProp)
});

export default activityProp;
