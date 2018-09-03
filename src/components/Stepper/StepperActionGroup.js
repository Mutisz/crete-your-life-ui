import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { flow, noop } from "lodash";

import { withStyles } from "@material-ui/core/styles";
import { translate } from "react-i18next";

import Button from "@material-ui/core/Button";

const styles = theme => ({
  button: {
    marginRight: theme.spacing.unit
  }
});

const enhance = flow(
  withStyles(styles),
  translate()
);

const StepperActionGroup = ({
  classes,
  t,
  handleBack,
  handleNext,
  isStepFirst,
  isStepLast,
  isWithinForm
}) => (
  <Fragment>
    <Button
      type="button"
      disabled={isStepFirst}
      onClick={handleBack}
      className={classes.button}
    >
      {t("buttonBack")}
    </Button>
    <Button
      type={isWithinForm ? "submit" : "button"}
      variant="contained"
      color="secondary"
      onClick={isWithinForm ? noop : handleNext}
      className={classes.button}
    >
      {isStepLast ? t("buttonConfirm") : t("buttonNext")}
    </Button>
  </Fragment>
);

StepperActionGroup.defaultProps = {
  isWithinForm: false
};

StepperActionGroup.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  isStepFirst: PropTypes.bool.isRequired,
  isStepLast: PropTypes.bool.isRequired,
  isWithinForm: PropTypes.bool
};

export default enhance(StepperActionGroup);
