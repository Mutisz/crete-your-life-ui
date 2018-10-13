import PropTypes from "prop-types";

export const imageProp = PropTypes.shape({
  url: PropTypes.string.isRequired,
  isThumbnail: PropTypes.bool,
  filePath: PropTypes.string,
  fileName: PropTypes.string
});

export const translationProp = PropTypes.shape({
  language: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
  description: PropTypes.string
});

const activityProp = PropTypes.shape({
  name: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
  description: PropTypes.string,
  images: PropTypes.arrayOf(imageProp),
  translations: PropTypes.arrayOf(translationProp)
});

export default activityProp;
