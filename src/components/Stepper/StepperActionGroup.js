import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { flow } from "lodash";

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
  handleConfirm,
  isStepFirst,
  isStepLast,
  isBackDisabled,
  isNextDisabled
}) => (
  <Fragment>
    <Button
      disabled={isStepFirst || isBackDisabled}
      onClick={handleBack}
      className={classes.button}
    >
      {t("buttonBack")}
    </Button>
    <Button
      variant="contained"
      color="secondary"
      disabled={isNextDisabled}
      onClick={isStepLast ? handleConfirm : handleNext}
      className={classes.button}
    >
      {isStepLast ? t("buttonConfirm") : t("buttonNext")}
    </Button>
  </Fragment>
);

StepperActionGroup.defaultProps = {
  isBackDisabled: false,
  isNextDisabled: false
};

StepperActionGroup.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  isStepFirst: PropTypes.bool.isRequired,
  isStepLast: PropTypes.bool.isRequired,
  isBackDisabled: PropTypes.bool,
  isNextDisabled: PropTypes.bool
};

export default enhance(StepperActionGroup);
