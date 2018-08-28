import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { flow } from "lodash";

import { withStyles } from "@material-ui/core/styles";
import withQuery from "../hoc/withQuery";

import Paper from "@material-ui/core/Paper";

import activityProp from "../PropTypes/activityPropType";

const styles = theme => ({
  root: {
    minWidth: 240 + 8 * theme.spacing.unit
  },
  section: {
    marginBottom: theme.spacing.unit,
    padding: 3 * theme.spacing.unit
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
      }
    }
  }
`;

const enhance = flow(
  withStyles(styles),
  withQuery(GET_BOOKING_CONFIRMATION, {}, props => ({
    id: props.match.params.id
  }))
);

const BookingConfirmationView = ({ classes, data: { booking } }) => (
  <div className={classes.root}>
    <Paper className={classes.section} square>
      {booking.id}
    </Paper>
  </div>
);

BookingConfirmationView.propTypes = {
  classes: PropTypes.object.isRequired
};

export default enhance(BookingConfirmationView);
