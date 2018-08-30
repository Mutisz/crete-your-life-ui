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
  query GetBookingConfirmation($id: ID!) {
    booking(id: $id) {
      id
      email
      phone
      dateList {
        dateString
        activity {
          name
          shortDescription
          translationList {
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
    id: props.match.params.id
  }))
);

const BookingConfirmationView = ({ classes, t, data: { booking } }) => {
  const sortedDateList = sortByDateAsc(booking.dateList);
  return (
    <div className={classes.root}>
      <Paper className={classes.section} square>
        <Typography variant="headline" gutterBottom>
          {t("bookingConfirmationTitle", { id: booking.id })}
        </Typography>
        <Typography variant="body1">
          <table className={classes.bookingInformation}>
            <tbody>
              <tr>
                <th scope="row">{t("bookingEmail")}</th>
                <td>{booking.email}</td>
              </tr>
              <tr>
                <th scope="row">{t("bookingPhone")}</th>
                <td>{booking.phone}</td>
              </tr>
              <tr>
                <th scope="row">{t("bookingPersonCount")}</th>
                <td>{booking.personCount}</td>
              </tr>
            </tbody>
          </table>
        </Typography>
      </Paper>
      <BookingDateList dateList={sortedDateList} />
    </div>
  );
};

BookingConfirmationView.propTypes = {
  classes: PropTypes.object.isRequired
};

export default enhance(BookingConfirmationView);
