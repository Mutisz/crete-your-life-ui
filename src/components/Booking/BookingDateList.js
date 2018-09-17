import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { flow, map } from "lodash";
import { findItemTranslation } from "../../helpers/bookingHelper";
import { formatDate } from "../../helpers/dateHelper";

import { withStyles } from "@material-ui/core/styles";
import { translate } from "react-i18next";

import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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

class BookingDateList extends Component {
  state = {
    expandedDate: null
  };

  handleExpand = date => (event, expandedDate) => {
    this.setState({
      expandedDate: expandedDate ? date : false
    });
  };

  renderBookingDate = bookingDate => {
    const { classes, i18n, t } = this.props;
    const { expandedDate } = this.state;
    const activity = bookingDate.activity
      ? findItemTranslation(bookingDate.activity, i18n.language)
      : null;
    const isEmpty = !activity;
    return (
      <ExpansionPanel
        key={bookingDate.date}
        expanded={expandedDate === bookingDate.date}
        onChange={this.handleExpand(bookingDate.date)}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading} variant="body2">
            {formatDate(bookingDate.date, i18n.language)}
          </Typography>
          {activity ? (
            <Typography className={classes.secondaryHeading} variant="body1">
              {activity.name}
            </Typography>
          ) : null}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography variant="body1">
            {activity ? activity.shortDescription : null}
            {isEmpty ? t("bookingNoActivitySelected") : null}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  };

  render = () => (
    <Fragment>{map(this.props.dates, this.renderBookingDate)}</Fragment>
  );
}

BookingDateList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default enhance(BookingDateList);
