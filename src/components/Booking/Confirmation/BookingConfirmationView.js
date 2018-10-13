import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { flow } from "lodash";
import { sortByDateAsc } from "../../../helpers/bookingHelper";
import { getCurrencyLocale, convert } from "../../../helpers/currencyHelper";

import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { translate } from "react-i18next";
import withQuery from "../../hoc/withQuery";

import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Currency from "react-currency-formatter";
import BookingDateList from "../BookingDateList";

import preferencesPropType from "../../PropTypes/preferencesPropType";
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
  },
  dataTable: {
    minWidth: "25%",
    textAlign: "left"
  }
});

const GET_BOOKING_CONFIRMATION = gql`
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

const BookingConfirmationView = ({
  history,
  classes,
  t,
  i18n: { language },
  data: {
    preferences: {
      currency: { code, rate }
    },
    booking: { number, email, phone, personCount, priceTotal, dates }
  }
}) => {
  const sortedDates = sortByDateAsc(dates);
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
          <Typography variant="body1" component="div">
            <table className={classes.dataTable}>
              <tbody>
                <tr>
                  <th scope="row">{t("inputEmail")}</th>
                  <td>{email}</td>
                </tr>
                <tr>
                  <th scope="row">{t("inputPhone")}</th>
                  <td>{phone}</td>
                </tr>
                <tr>
                  <th scope="row">{t("inputPersonCount")}</th>
                  <td>{personCount}</td>
                </tr>
              </tbody>
            </table>
          </Typography>
        </div>
        <div className={classes.subsection}>
          <Typography variant="title" gutterBottom>
            {t("bookingConfirmationPayment")}
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
  i18n: PropTypes.shape({ language: PropTypes.string.isRequired }).isRequired,
  data: PropTypes.shape({
    preferences: preferencesPropType.isRequired,
    booking: bookingPropType
  })
};

export default enhance(BookingConfirmationView);
