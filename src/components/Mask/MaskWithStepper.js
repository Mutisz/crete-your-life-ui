import React from "react";
import PropTypes from "prop-types";
import { flow } from "lodash";

import { withStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Mask from "./Mask";

const styles = theme => ({
  root: {
    position: "relative",
    minHeight: 320
  },
  actionGroup: {
    position: "absolute",
    bottom: 4 * theme.spacing.unit,
    left: 4 * theme.spacing.unit
  }
});

const enhance = flow(withStyles(styles));

const MaskWithStepper = props => {
  const { classes, messageKey, color, renderStepperActionGroup } = props;
  return (
    <Paper className={classes.root} square>
      <Mask messageKey={messageKey} color={color} />
      {renderStepperActionGroup ? (
        <div className={classes.actionGroup}>{renderStepperActionGroup()}</div>
      ) : null}
    </Paper>
  );
};

MaskWithStepper.propTypes = {
  classes: PropTypes.object.isRequired,
  messageKey: PropTypes.string.isRequired,
  color: PropTypes.string,
  renderStepperActionGroup: PropTypes.func
};

export default enhance(MaskWithStepper);
