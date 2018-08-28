import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { flow } from "lodash";

import { withStyles } from "@material-ui/core/styles";
import { translate } from "react-i18next";

import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import MaterialStepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

const styles = theme => ({
  subheading: {
    padding: 3 * theme.spacing.unit
  }
});

const enhance = flow(
  withStyles(styles),
  translate()
);

const Stepper = props => {
  const { classes, t, stepHelper, activeStep } = props;
  return (
    <Fragment>
      <Hidden smDown>
        <MaterialStepper activeStep={stepHelper.getStepIndex(activeStep)}>
          {stepHelper.getStepList().map(step => (
            <Step key={step}>
              <StepLabel>{t(step)}</StepLabel>
            </Step>
          ))}
        </MaterialStepper>
      </Hidden>
      <Hidden mdUp>
        <Typography className={classes.subheading} variant="title">
          {t(activeStep)}
        </Typography>
      </Hidden>
      <Typography className={classes.subheading} variant="subheading">
        {t(`${activeStep}Description`)}
      </Typography>
    </Fragment>
  );
};

Stepper.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  stepHelper: PropTypes.shape({
    getStepList: PropTypes.func.isRequired,
    getStepIndex: PropTypes.func.isRequired
  }),
  activeStep: PropTypes.string.isRequired
};

export default enhance(Stepper);
