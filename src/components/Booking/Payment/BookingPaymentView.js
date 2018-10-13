import React, { Component } from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { flow, get } from "lodash";
import { getCurrencyLocale, convert } from "../../../helpers/currencyHelper";

import { withStyles } from "@material-ui/core/styles";
import { translate } from "react-i18next";
import withQuery from "../../hoc/withQuery";

import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Currency from "react-currency-formatter";
import { Elements } from "react-stripe-elements";
// import BookingPayment from "./BookingPayment";

import preferencesPropType from "../../PropTypes/preferencesPropType";
import bookingPropType from "../../PropTypes/bookingPropType";

const styles = theme => ({
  root: {
    minWidth: 240 + 8 * theme.spacing.unit - 16,
    padding: 3 * theme.spacing.unit
  },
  section: {
    padding: 3 * theme.spacing.unit
  },
  dataTable: {
    minWidth: "25%",
    textAlign: "left"
  }
});

const BOOKING_PAYMENT_QUERY = gql`
  query GetBookingConfirmation($number: String!) {
    preferences @client {
      currency {
        code
        rate
      }
    }
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

const BookingPaymentView = ({
  classes,
  t,
  i18n: { language },
  data: {
    preferences: {
      currency: { code, rate }
    },
    booking: { number, priceTotal }
  }
}) => {
  return (
    <Paper className={classes.root} square>
      <Typography variant="display1" gutterBottom>
        {t("bookingPaymentTitle", { id: number })}
      </Typography>
      <div className={classes.subsection}>
        <Typography variant="title" gutterBottom>
          {t("bookingPaymentPrice")}
        </Typography>
        <Typography variant="body1" component="div">
          <table className={classes.dataTable}>
            <tbody>
              <tr>
                <th scope="row">{t("bookingPaymentPrice")}</th>
                <td>
                  <Currency
                    currency={code}
                    quantity={convert(priceTotal, rate)}
                    locale={getCurrencyLocale(language)}
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">{t("bookingPaymentStatus")}</th>
                <td>Not paid</td>
              </tr>
            </tbody>
          </table>
        </Typography>
      </div>
    </Paper>
  );
};

BookingPaymentView.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  i18n: PropTypes.shape({ language: PropTypes.string.isRequired }).isRequired,
  data: PropTypes.shape({
    preferences: preferencesPropType.isRequired,
    booking: bookingPropType
  })
};

export default enhance(BookingPaymentView);

// const enhance = flow(injectStripe);

// class CheckoutForm extends Component {
//   render() {
//     return (
//       <label>
//         Card details
//         <CardElement />
//       </label>
//     );
//   }
// }

// export default enhance(CheckoutForm);
