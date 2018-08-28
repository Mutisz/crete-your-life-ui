import React from "react";
import PropTypes from "prop-types";
import { flow } from "lodash";

import { withStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Mask from "./Mask";

const styles = {
  root: {
    position: "relative",
    height: 320
  }
};

const enhance = flow(withStyles(styles));

const MaskWithBackground = props => {
  const { classes, messageKey, color } = props;
  return (
    <Paper className={classes.root} square>
      <Mask messageKey={messageKey} color={color} />
    </Paper>
  );
};

MaskWithBackground.propTypes = {
  classes: PropTypes.object.isRequired,
  messageKey: PropTypes.string.isRequired,
  color: PropTypes.string
};

export default enhance(MaskWithBackground);
