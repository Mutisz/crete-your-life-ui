import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { flow } from "lodash";
import { sortByDateAsc } from "../../../helpers/bookingHelper";

import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { translate } from "react-i18next";
import withQuery from "../../hoc/withQuery";

import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import BookingDateList from "../BookingDateList";
import CurrencyField from "../../Currency/CurrencyField";
import LabelledValueTable from "../../LabelledValue/LabelledValueTable";

import bookingPropType from "../../PropTypes/bookingPropType";

const styles = theme => ({
  root: {
    minWidth: 240 + 8 * theme.spacing.unit
  },
  section: {
    padding: 3 * theme.spacing.unit
  },
  subsection: {
    marginBottom: 3 * theme.spacing.unit
  },
  button: {
    marginTop: theme.spacing.unit
  }
});

const GET_BOOKING_CONFIRMATION = gql`
  query GetBookingConfirmation($number: String!) {
    booking(number: $number) {
      number
      email
      phone
      personCount
      priceTotal
      dates {
        date
        activity {
          name
          shortDescription
          translations {
            name
            language
            shortDescription
          }
        }
      }
    }
  }
`;

const propsToVariables = props => ({
  number: props.match.params.number
});

const enhance = flow(
  withRouter,
  withStyles(styles),
  translate(),
  withQuery(GET_BOOKING_CONFIRMATION, {
    propsToVariables
  })
);

const goToPayment = (history, number) =>
  history.push(`/bookingPayment/${number}`);

const getContactValueList = ({ email, phone, personCount }) => [
  { label: "inputEmail", value: email },
  { label: "inputPhone", value: phone },
  { label: "inputPersonCount", value: personCount }
];

const getPaymentValueList = ({ priceTotal }) => [
  {
    label: "bookingPaymentPrice",
    value: <CurrencyField amount={priceTotal} />
  },
  { label: "bookingPaymentStatus", value: "Not paid" }
];

const BookingConfirmationView = ({
  history,
  classes,
  t,
  data: { booking }
}) => {
  const { number, dates } = booking;
  const sortedDates = sortByDateAsc(dates);
  const contactValueList = getContactValueList(booking);
  const paymentValueList = getPaymentValueList(booking);
  return (
    <div className={classes.root}>
      <Paper className={classes.section} square>
        <Typography variant="display1" gutterBottom>
          {t("bookingConfirmationTitle", { id: number })}
        </Typography>
        <div className={classes.subsection}>
          <Typography variant="title" gutterBottom>
            {t("bookingConfirmationContact")}
          </Typography>
          <LabelledValueTable valueList={contactValueList} />
        </div>
        <div className={classes.subsection}>
          <Typography variant="title" gutterBottom>
            {t("bookingConfirmationPayment")}
          </Typography>
          <LabelledValueTable valueList={paymentValueList} />
          <Button
            type="button"
            variant="contained"
            onClick={() => goToPayment(history, number)}
            className={classes.button}
          >
            {t("buttonPayment")}
          </Button>
        </div>
        <Typography variant="title" gutterBottom>
          {t("bookingConfirmationPlan")}
        </Typography>
      </Paper>
      <BookingDateList dates={sortedDates} />
    </div>
  );
};

BookingConfirmationView.propTypes = {
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  data: PropTypes.shape({
    booking: bookingPropType.isRequired
  })
};

export default enhance(BookingConfirmationView);
