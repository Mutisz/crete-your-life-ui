import React, { Component } from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { flow } from "lodash";
import { findItem, findItemTranslation } from "../../helpers/bookingHelper";

import { withStyles } from "@material-ui/core/styles";
import { translate } from "react-i18next";
import withMutation from "../hoc/withMutation";

import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import DateItemList from "./DateItemList";
import ActivityList from "../Activity/ActivityList";

import activityProp from "../PropTypes/activityPropType";
import bookingStatusProp from "../PropTypes/bookingStatusPropType";

const styles = theme => ({
  root: {
    padding: 3 * theme.spacing.unit
  },
  group: {
    padding: theme.spacing.unit
  },
  divider: {
    marginTop: 4 * theme.spacing.unit,
    marginBottom: 4 * theme.spacing.unit
  }
});

const ADD_DATE_ACTIVITY = gql`
  mutation AddDateActivity($name: String!) {
    addDateActivity(name: $name) @client {
      dateString
      name
    }
  }
`;

const enhance = flow(
  withStyles(styles),
  translate(),
  withMutation(ADD_DATE_ACTIVITY, undefined)
);

class BookingStepActivityList extends Component {
  handleDateActivitySelect = dateString => {
    const { bookingStatus, updateBookingStatus } = this.props;
    const isAlreadySelected = bookingStatus.dateActivitySelected
      ? bookingStatus.dateActivitySelected === dateString
      : false;
    updateBookingStatus({
      dateActivitySelected: isAlreadySelected ? null : dateString
    });
  };

  handleAddActivity = name => this.props.mutate({ variables: { name } });

  findActivity = () => {
    const {
      bookingStatus: { dateActivitySelected, dateActivities },
      activities
    } = this.props;
    return findItem(dateActivitySelected, dateActivities, activities);
  };

  findActivityTranslation = () => {
    const { i18n } = this.props;
    const activity = this.findActivity();
    return activity ? findItemTranslation(activity, i18n.language) : null;
  };

  renderActivity = () => {
    const { classes, t } = this.props;
    const activityTranslation = this.findActivityTranslation();

    const title = activityTranslation
      ? activityTranslation.name
      : t("bookingNoActivitySelected");
    const description = activityTranslation
      ? activityTranslation.description
      : t("bookingNoActivitySelectedDescription");
    return (
      <div className={classes.group}>
        <Typography variant="title" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {description}
        </Typography>
      </div>
    );
  };

  renderCardActions = (classes, activity) => {
    const { t } = this.props;
    return (
      <Button
        size="small"
        color="primary"
        className={classes.button}
        onClick={() => this.handleAddActivity(activity.name)}
      >
        {t("bookingButtonAdd")}
      </Button>
    );
  };

  render() {
    const {
      classes,
      renderStepperActionGroup,
      bookingStatus: {
        dateActivitySelected,
        dateActivities,
        fromDateString,
        toDateString
      },
      activities
    } = this.props;

    const renderCardActions = dateActivitySelected
      ? this.renderCardActions
      : null;
    return (
      <div className={classes.root}>
        <DateItemList
          fromDateString={fromDateString}
          toDateString={toDateString}
          dateItemSelected={dateActivitySelected}
          dateItems={dateActivities}
          items={activities}
          handleDateItemSelect={this.handleDateActivitySelect}
        />
        <Divider className={classes.divider} />
        {this.renderActivity()}
        <div className={classes.group}>{renderStepperActionGroup()}</div>
        <Divider className={classes.divider} />
        <ActivityList
          activities={activities}
          renderCardActions={renderCardActions}
        />
      </div>
    );
  }
}

BookingStepActivityList.propTypes = {
  classes: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  mutate: PropTypes.func.isRequired,
  bookingStatus: bookingStatusProp.isRequired,
  activities: PropTypes.arrayOf(activityProp).isRequired,
  renderStepperActionGroup: PropTypes.func.isRequired,
  updateBookingStatus: PropTypes.func.isRequired
};

export default enhance(BookingStepActivityList);
