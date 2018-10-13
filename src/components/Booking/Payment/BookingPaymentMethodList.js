import React, { Component } from "react";
import PropTypes from "prop-types";
import { flow } from "lodash";

import { withStyles } from "@material-ui/core/styles";
import { translate } from "react-i18next";

import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Elements } from "react-stripe-elements";
import BookingPaymentByCard from "./BookingPaymentByCard";

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

const enhance = flow(
  withStyles(styles),
  translate()
);

class BookingPaymentMethodList extends Component {
  state = {
    expandedMethod: null
  };

  handleExpand = method => (event, expandedMethod) => {
    this.setState({
      expandedMethod: expandedMethod ? method : false
    });
  };

  render = () => {
    const { classes, i18n, t } = this.props;
    const { expandedMethod } = this.state;
    return (
      <ExpansionPanel
        key={"card"}
        expanded={expandedMethod === "card"}
        onChange={this.handleExpand("card")}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading} variant="body2">
            Card
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Elements>
            <BookingPaymentByCard />
          </Elements>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  };
}

BookingPaymentMethodList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default enhance(BookingPaymentMethodList);
