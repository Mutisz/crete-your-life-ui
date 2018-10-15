import React, { Component } from "react";
import PropTypes from "prop-types";
import { flow, curry } from "lodash";

import { withStyles } from "@material-ui/core/styles";
import { translate } from "react-i18next";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import bookingStatusProp from "../PropTypes/bookingStatusPropType";

const styles = theme => ({
  root: {
    padding: 3 * theme.spacing.unit
  },
  inputGroup: {
    display: "flex",
    flexWrap: "wrap",
    marginBottom: 3 * theme.spacing.unit
  },
  inputField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

const enhance = flow(
  withStyles(styles),
  translate()
);

class BookingStepContactInformation extends Component {
  handleFieldChange = curry((field, e) =>
    this.props.updateBookingStatus({
      [field]: e.target.value
    })
  );

  render() {
    const {
      classes,
      t,
      bookingStatus: { email, phone },
      renderStepperActionGroup,
      handleNext
    } = this.props;

    return (
      <ValidatorForm className={classes.root} onSubmit={handleNext}>
        <div className={classes.inputGroup}>
          <TextValidator
            className={classes.inputField}
            name="inputEmail"
            label={t("inputEmail")}
            value={email || ""}
            onChange={this.handleFieldChange("email")}
            validators={["required", "isEmail"]}
            errorMessages={[
              t("validationRequired"),
              t("validationInvalidEmail")
            ]}
          />
          <TextValidator
            className={classes.inputField}
            name="inputPhone"
            label={t("inputPhone")}
            value={phone || ""}
            onChange={this.handleFieldChange("phone")}
            validators={["required"]}
            errorMessages={[t("validationRequired")]}
          />
        </div>
        {renderStepperActionGroup(true)}
      </ValidatorForm>
    );
  }
}

BookingStepContactInformation.propTypes = {
  classes: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  mutate: PropTypes.func.isRequired,
  bookingStatus: bookingStatusProp.isRequired,
  renderStepperActionGroup: PropTypes.func.isRequired,
  updateBookingStatus: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired
};

export default enhance(BookingStepContactInformation);
