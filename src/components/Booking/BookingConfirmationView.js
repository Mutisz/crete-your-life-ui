import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { flow } from "lodash";
import { sortByDateAsc } from "../../helpers/bookingHelper";

import { withStyles } from "@material-ui/core/styles";
import { translate } from "react-i18next";
import withQuery from "../hoc/withQuery";

import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import BookingDateList from "./BookingDateList";

const styles = theme => ({
  root: {
    minWidth: 240 + 8 * theme.spacing.unit
  },
  section: {
    padding: 3 * theme.spacing.unit
  },
  bookingInformation: {
    minWidth: "25%",
    textAlign: "left"
  }
});

const GET_BOOKING_CONFIRMATION = gql`
  query GetBookingConfirmation($number: String!) {
    booking(number: $number) {
      number
      email
      phone
      dates {
        date
        activity {
          name
          shortDescription
          translations {
            name
            shortDescription
          }
        }
      }
    }
  }
`;

const enhance = flow(
  withStyles(styles),
  translate(),
  withQuery(GET_BOOKING_CONFIRMATION, {}, props => ({
    number: props.match.params.number
  }))
);

const BookingConfirmationView = ({ classes, t, data: { booking } }) => {
  const sortedDates = sortByDateAsc(booking.dates);
  return (
    <div className={classes.root}>
      <Paper className={classes.section} square>
        <Typography variant="headline" gutterBottom>
          {t("bookingConfirmationTitle", { id: booking.number })}
        </Typography>
        <Typography variant="body1">
          <table className={classes.bookingInformation}>
            <tbody>
              <tr>
                <th scope="row">{t("inputEmail")}</th>
                <td>{booking.email}</td>
              </tr>
              <tr>
                <th scope="row">{t("inputPhone")}</th>
                <td>{booking.phone}</td>
              </tr>
              <tr>
                <th scope="row">{t("inputPersonCount")}</th>
                <td>{booking.personCount}</td>
              </tr>
            </tbody>
          </table>
        </Typography>
      </Paper>
      <BookingDateList dates={sortedDates} />
    </div>
  );
};

BookingConfirmationView.propTypes = {
  classes: PropTypes.object.isRequired
};

export default enhance(BookingConfirmationView);
