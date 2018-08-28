import React, { Component } from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { flow, curry, map, find } from "lodash";
import { getStringFromDate, getDateList } from "../../helpers/dateHelper";

import { withStyles } from "@material-ui/core/styles";
import { translate } from "react-i18next";
import withMutation from "../hoc/withMutation";

import TextField from "@material-ui/core/TextField";

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

const ADD_BOOKING = gql`
  mutation AddBooking($booking: BookingInput!) {
    addBooking(booking: $booking) {
      id
    }
  }
`;

const enhance = flow(
  withStyles(styles),
  translate(),
  withMutation(ADD_BOOKING, undefined)
);

class BookingStepContactInformation extends Component {
  getBookingInput = () => {
    const {
      bookingStatus: {
        fromDateString,
        toDateString,
        email,
        phone,
        dateActivityList
      }
    } = this.props;
    const dateList = map(getDateList(fromDateString, toDateString), date => {
      const dateString = getStringFromDate(date);
      const activity = find(dateActivityList, ["dateString", dateString]);
      return {
        dateString: dateString,
        activity: activity ? { name: activity.name } : null
      };
    });

    return { booking: { email, phone, dateList } };
  };

  handleAddBooking = () => {
    const variables = this.getBookingInput();
    this.props.mutate({ variables }).then(this.props.handleBookingAdded);
  };

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
      renderStepperActionGroup
    } = this.props;

    return (
      <form className={classes.root}>
        <div className={classes.inputGroup}>
          <TextField
            className={classes.textField}
            label={t("bookingEmail")}
            value={email}
            onChange={this.handleFieldChange("email")}
          />
          <TextField
            className={classes.textField}
            label={t("bookingPhone")}
            value={phone}
            onChange={this.handleFieldChange("phone")}
          />
        </div>
        {renderStepperActionGroup(false, false, this.handleAddBooking)}
      </form>
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
  handleBookingAdded: PropTypes.func.isRequired
};

export default enhance(BookingStepContactInformation);
