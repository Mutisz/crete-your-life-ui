import React, { Component } from "react";
import PropTypes from "prop-types";
import { flow } from "lodash";
import { getStringFromDate } from "../../helpers/dateHelper";

import { withStyles } from "@material-ui/core/styles";
import { translate } from "react-i18next";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import DateRange from "../input/DateRange";

import bookingStatusProp from "../PropTypes/bookingStatusPropType";

const styles = theme => ({
  root: {
    padding: 3 * theme.spacing.unit
  },
  inputGroup: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 3 * theme.spacing.unit
  },
  inputField: {
    flexBasis: "45%",
    marginBottom: theme.spacing.unit
  }
});

const enhance = flow(
  withStyles(styles),
  translate()
);

class BookingStepTripInformation extends Component {
  handleFromDateChange = fromDate => {
    this.props.updateBookingStatus({
      fromDateString: getStringFromDate(fromDate)
    });
  };

  handleToDateChange = toDate =>
    this.props.updateBookingStatus({
      toDateString: getStringFromDate(toDate)
    });

  handlePersonCountChange = e =>
    this.props.updateBookingStatus({
      personCount: e.target.value
    });

  render() {
    const {
      classes,
      t,
      bookingStatus: { fromDateString, toDateString, personCount },
      renderStepperActionGroup,
      handleNext
    } = this.props;

    return (
      <ValidatorForm className={classes.root} onSubmit={handleNext}>
        <div className={classes.inputGroup}>
          <DateRange
            fromDateString={fromDateString}
            toDateString={toDateString}
            handleFromDateChange={this.handleFromDateChange}
            handleToDateChange={this.handleToDateChange}
          />
          <TextValidator
            className={classes.inputField}
            name="inputPersonCount"
            label={t("inputPersonCount")}
            value={personCount}
            onChange={this.handlePersonCountChange}
            validators={["required"]}
            errorMessages={[t("validationRequired")]}
          />
        </div>
        {renderStepperActionGroup(true)}
      </ValidatorForm>
    );
  }
}

BookingStepTripInformation.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  bookingStatus: bookingStatusProp,
  renderStepperActionGroup: PropTypes.func.isRequired,
  updateBookingStatus: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired
};

export default enhance(BookingStepTripInformation);
