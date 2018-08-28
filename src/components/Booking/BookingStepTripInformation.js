import React, { Component } from "react";
import PropTypes from "prop-types";
import { flow } from "lodash";
import { getDateFromString, getStringFromDate } from "../../helpers/dateHelper";

import { DATE_FORMAT } from "../../config/createI18nDate";

import { withStyles } from "@material-ui/core/styles";
import { translate } from "react-i18next";

import TextField from "@material-ui/core/TextField";
import DatePicker from "material-ui-pickers/DatePicker";

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
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

const enhance = flow(
  withStyles(styles),
  translate()
);

class BookingStepTripInformation extends Component {
  handleFromDateChange = fromDate =>
    this.props.updateBookingStatus({
      fromDateString: getStringFromDate(fromDate)
    });

  handleToDateChange = toDate =>
    this.props.updateBookingStatus({
      toDateString: getStringFromDate(toDate)
    });

  handlePersonCountChange = e =>
    this.props.updateBookingStatus({
      personCount: parseInt(e.target.value)
    });

  renderDatePicker = (labelKey, dateString, changeHandler) => {
    const { classes, t } = this.props;
    return (
      <DatePicker
        className={classes.textField}
        label={t(labelKey)}
        clearLabel={t("bookingDateClear")}
        cancelLabel={t("bookingDateCancel")}
        format={DATE_FORMAT}
        value={getDateFromString(dateString)}
        onChange={changeHandler}
        disablePast
        clearable
        autoOk
      />
    );
  };

  render() {
    const {
      classes,
      t,
      bookingStatus: { fromDateString, toDateString, personCount },
      renderStepperActionGroup
    } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.inputGroup}>
          {this.renderDatePicker(
            "bookingDateFrom",
            fromDateString,
            this.handleFromDateChange
          )}
          {this.renderDatePicker(
            "bookingDateTo",
            toDateString,
            this.handleToDateChange
          )}
          <TextField
            className={classes.textField}
            label={t("bookingPersonCount")}
            value={personCount}
            onChange={this.handlePersonCountChange}
          />
        </div>
        {renderStepperActionGroup()}
      </div>
    );
  }
}

BookingStepTripInformation.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  bookingStatus: bookingStatusProp,
  renderStepperActionGroup: PropTypes.func.isRequired,
  updateBookingStatus: PropTypes.func.isRequired
};

export default enhance(BookingStepTripInformation);
