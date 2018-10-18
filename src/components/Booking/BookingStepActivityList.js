import React, { Component } from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { flow, find, get } from "lodash";
import { findItem, findItemTranslation } from "../../helpers/bookingHelper";

import { withStyles } from "@material-ui/core/styles";
import { translate } from "react-i18next";
import withQuery from "../hoc/withQuery";
import withMutation from "../hoc/withMutation";

import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import DateItemList from "./DateItemList";
import ActivityList from "../Activity/ActivityList";

import preferencesProp from "../PropTypes/preferencesPropType";
import bookingStatusProp from "../PropTypes/bookingStatusPropType";
import activityProp from "../PropTypes/activityPropType";

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

const BOOKING_STEP_ACTIVITY_LIST_QUERY = gql`
  query GetBookingDatesOccupancy($fromDate: String!, $toDate: String!) {
    bookingDatesOccupancy(fromDate: $fromDate, toDate: $toDate) {
      date
      activity {
        name
      }
      personCount
    }
  }
`;

const BOOKING_STEP_ACTIVITY_LIST_MUTATION = gql`
  mutation UpdateSelectedDateActivity($name: String!) {
    updateSelectedDateActivity(name: $name) @client {
      dateString
      name
    }
  }
`;

const propsToVariables = props => {
  const {
    bookingStatus: { fromDateString, toDateString }
  } = props;
  return {
    fromDate: fromDateString,
    toDate: toDateString
  };
};

const enhance = flow(
  withStyles(styles),
  translate(),
  withQuery(BOOKING_STEP_ACTIVITY_LIST_QUERY, {
    propsToVariables
  }),
  withMutation(BOOKING_STEP_ACTIVITY_LIST_MUTATION, undefined)
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

  getAvailableActivities = () => {
    const {
      data: { bookingDatesOccupancy },
      bookingStatus: { personCount, dateActivitySelected },
      activities
    } = this.props;
    const dateOccupancy = dateActivitySelected
      ? find(bookingDatesOccupancy, ["date", dateActivitySelected])
      : null;
    if (!dateOccupancy) {
      return activities;
    }

    const occupiedName = get(dateOccupancy, ["activity", "name"]);
    const occupiedPersonCount = get(dateOccupancy, "personCount", 0);
    const dateOccupancyActivity = find(activities, ["name", occupiedName]);
    const personCountAfterBooking = occupiedPersonCount + personCount;
    const maxPersonCount = get(dateOccupancyActivity, "maxPersonCount");
    if (personCountAfterBooking >= maxPersonCount) {
      return [];
    } else {
      return [dateOccupancyActivity];
    }
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
      preferences: { currency },
      bookingStatus: {
        dateActivitySelected,
        dateActivities,
        fromDateString,
        toDateString
      },
      activities,
      renderStepperActionGroup
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
          currency={currency}
          activities={this.getAvailableActivities()}
          renderCardActions={renderCardActions}
        />
      </div>
    );
  }
}

const bookingDateOccupancyPropType = PropTypes.shape({
  date: PropTypes.string.isRequired,
  activity: PropTypes.object.isRequired,
  personCount: PropTypes.number.isRequired
});

BookingStepActivityList.propTypes = {
  classes: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  mutate: PropTypes.func.isRequired,
  preferences: preferencesProp,
  data: PropTypes.shape({
    bookingDatesOccupancy: PropTypes.arrayOf(bookingDateOccupancyPropType)
  }),
  bookingStatus: bookingStatusProp.isRequired,
  activities: PropTypes.arrayOf(activityProp).isRequired,
  renderStepperActionGroup: PropTypes.func.isRequired,
  updateBookingStatus: PropTypes.func.isRequired
};

export default enhance(BookingStepActivityList);
