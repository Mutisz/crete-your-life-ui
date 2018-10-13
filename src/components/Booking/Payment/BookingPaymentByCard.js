import React, { Component } from "react";
import PropTypes from "prop-types";
import { flow } from "lodash";
import { CardElement, injectStripe } from "react-stripe-elements";

const styles = theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
});

const enhance = flow(injectStripe);

class BookingPaymentByCard extends Component {
  render() {
    return (
      <label>
        Card details
        <CardElement />
      </label>
    );
  }
}

export default enhance(BookingPaymentByCard);
