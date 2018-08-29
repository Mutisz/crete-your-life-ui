import React from "react";
import PropTypes from "prop-types";
import { flow } from "lodash";

import { withStyles } from "@material-ui/core/styles";
import { translate } from "react-i18next";

import Typography from "@material-ui/core/Typography";

const styles = {
  root: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center"
  },
  image: {
    display: "block",
    width: "50%",
    margin: "auto"
  }
};

const enhance = flow(
  withStyles(styles),
  translate()
);

const Mask = ({ classes, t, messageKey, color }) => (
  <div className={classes.root}>
    <img src="/images/placeholder.png" className={classes.image} />
    <Typography variant="title" color={color}>
      {t(messageKey)}
    </Typography>
  </div>
);

Mask.defaultProps = {
  color: "primary"
};

Mask.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  messageKey: PropTypes.string.isRequired,
  color: PropTypes.string
};

export default enhance(Mask);
