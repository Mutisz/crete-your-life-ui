import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { flow, get } from "lodash";

import { withStyles } from "@material-ui/core/styles";
import { translate } from "react-i18next";
import withQuery from "../../hoc/withQuery";

import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import CurrencyField from "../../Currency/CurrencyField";
import LabelledValueTable from "../../LabelledValue/LabelledValueTable";
import BookingPaymentMethodList from "./BookingPaymentMethodList";

import bookingPropType from "../../PropTypes/bookingPropType";

const styles = theme => ({
  root: {
    minWidth: 240 + 8 * theme.spacing.unit - 16
  },
  section: {
    padding: 3 * theme.spacing.unit
  },
  subsection: {
    marginBottom: 3 * theme.spacing.unit
  },
  dataTable: {
    minWidth: "25%",
    textAlign: "left"
  }
});

const BOOKING_PAYMENT_QUERY = gql`
  query GetBookingConfirmation($number: String!) {
    booking(number: $number) {
      number
      email
      priceTotal
    }
  }
`;

const propsToVariables = props => ({
  number: get(props, ["match", "params", "number"], null)
});

const enhance = flow(
  withStyles(styles),
  translate(),
  withQuery(BOOKING_PAYMENT_QUERY, {
    propsToVariables
  })
);

const getPriceList = ({ priceTotal }) => [
  {
    label: "bookingPaymentPrice",
    value: <CurrencyField amount={priceTotal} />
  },
  { label: "bookingPaymentStatus", value: "Not paid" }
];

const BookingPaymentView = ({ classes, t, data: { booking } }) => {
  const { number } = booking;
  const priceList = getPriceList(booking);
  return (
    <div className={classes.root}>
      <Paper className={classes.section} square>
        <Typography variant="display1" gutterBottom>
          {t("bookingPaymentTitle", { id: number })}
        </Typography>
        <div className={classes.subsection}>
          <Typography variant="title" gutterBottom>
            {t("bookingPaymentPrice")}
          </Typography>
          <LabelledValueTable valueList={priceList} />
        </div>
      </Paper>
      <BookingPaymentMethodList />
    </div>
  );
};

BookingPaymentView.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  data: PropTypes.shape({
    booking: bookingPropType
  })
};

export default enhance(BookingPaymentView);
