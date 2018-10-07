import React, { Component } from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { flow, map, find } from "lodash";
import { getDates, getStringFromDate } from "../../helpers/dateHelper";

import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import withQuery from "../hoc/withQuery";
import withMutation from "../hoc/withMutation";
import withStepHelper from "../hoc/withStepHelper";

import Paper from "@material-ui/core/Paper";
import Stepper from "../Stepper/Stepper";
import StepperActionGroup from "../Stepper/StepperActionGroup";
import MaskWithStepper from "../Mask/MaskWithStepper";
import BookingStepTripInformation from "./BookingStepTripInformation";
import BookingStepActivityList from "./BookingStepActivityList";
import BookingStepContactInformation from "./BookingStepContactInformation";

import activityProp from "../PropTypes/activityPropType";
import bookingStatusProp from "../PropTypes/bookingStatusPropType";
import {
  BOOKING_STEP_TRIP_INFORMATION,
  BOOKING_STEP_ACTIVITIES,
  BOOKING_STEP_HOTELS,
  BOOKING_STEP_SERVICES,
  BOOKING_STEP_CONFIRM,
  BOOKING_STEPS
} from "./../../schema";

const styles = theme => ({
  root: {
    minWidth: 240 + 8 * theme.spacing.unit
  },
  stepper: {
    marginBottom: theme.spacing.unit
  },
  content: {
    position: "relative"
  }
});

const BOOKING_VIEW_QUERY = gql`
  {
    bookingStatus @client {
      activeStep
      fromDateString
      toDateString
      personCount
      email
      phone
      dateActivitySelected
      dateActivities {
        dateString
        name
      }
    }
    preferences @client {
      currency {
        code
        rate
      }
    }
    activities {
      name
      shortDescription
      description
      basePricePerPerson
      images {
        isThumbnail
        filePath
        fileName
        url
      }
      translations {
        language
        name
        shortDescription
        description
      }
    }
  }
`;

const BOOKING_VIEW_MUTATION = gql`
  mutation CreateBooking($booking: BookingCreateInput!) {
    createBooking(data: $booking) {
      number
    }
  }
`;

const enhance = flow(
  withRouter,
  withStyles(styles),
  withQuery(BOOKING_VIEW_QUERY, {}),
  withMutation(BOOKING_VIEW_MUTATION, undefined),
  withStepHelper(BOOKING_STEPS)
);

class BookingView extends Component {
  getBookingInputDate = date => {
    const {
      data: {
        bookingStatus: { dateActivities }
      }
    } = this.props;
    const dateString = getStringFromDate(date);
    const activity = find(dateActivities, ["dateString", dateString]);
    return {
      date: date,
      activity: activity ? activity.name : null
    };
  };

  getBookingInput = () => {
    const {
      data: {
        bookingStatus: { fromDateString, toDateString, email, phone }
      }
    } = this.props;
    const dates = getDates(fromDateString, toDateString);
    const bookingDates = map(dates, this.getBookingInputDate);
    return { booking: { email, phone, dates: bookingDates } };
  };

  updateBookingStatus = valueObject => {
    const { client } = this.props;
    client.writeData({
      data: {
        bookingStatus: {
          __typename: "BookingStatus",
          ...valueObject
        }
      }
    });
  };

  handleBack = () => {
    const {
      stepHelper,
      data: { bookingStatus }
    } = this.props;
    return this.updateBookingStatus({
      activeStep: stepHelper.getStepPrevious(bookingStatus.activeStep)
    });
  };

  handleNext = () => {
    const {
      stepHelper: { getStepNext, isStepLast },
      data: { bookingStatus }
    } = this.props;
    const isActiveStepLast = isStepLast(bookingStatus.activeStep);
    return isActiveStepLast
      ? this.handleConfirm()
      : this.updateBookingStatus({
          activeStep: getStepNext(bookingStatus.activeStep)
        });
  };

  handleConfirm = () => {
    const { mutate } = this.props;
    const variables = this.getBookingInput();
    mutate({ variables }).then(this.handleConfirmSuccess);
  };

  handleConfirmSuccess = ({
    data: {
      createBooking: { number }
    }
  }) => {
    const { history } = this.props;
    history.push(`/booking/${number}`);
  };

  renderStepUnderConstruction = () => (
    <MaskWithStepper
      messageKey="maskWorkInProgress"
      renderStepperActionGroup={this.renderStepperActionGroup}
    />
  );

  renderStepperActionGroup = (isWithinForm = false) => {
    const {
      stepHelper: { isStepFirst, isStepLast },
      data: { bookingStatus }
    } = this.props;
    return (
      <StepperActionGroup
        handleBack={this.handleBack}
        handleNext={this.handleNext}
        isStepFirst={isStepFirst(bookingStatus.activeStep)}
        isStepLast={isStepLast(bookingStatus.activeStep)}
        isWithinForm={isWithinForm}
      />
    );
  };

  renderStepperContent = () => {
    const { preferences, bookingStatus, activities } = this.props.data;
    const { activeStep } = bookingStatus;
    const commonProps = {
      preferences,
      bookingStatus,
      renderStepperActionGroup: this.renderStepperActionGroup,
      updateBookingStatus: this.updateBookingStatus,
      handleNext: this.handleNext
    };

    switch (activeStep) {
      case BOOKING_STEP_TRIP_INFORMATION:
        return <BookingStepTripInformation {...commonProps} />;
      case BOOKING_STEP_ACTIVITIES:
        return (
          <BookingStepActivityList {...commonProps} activities={activities} />
        );
      case BOOKING_STEP_HOTELS:
        return this.renderStepUnderConstruction();
      case BOOKING_STEP_SERVICES:
        return this.renderStepUnderConstruction();
      case BOOKING_STEP_CONFIRM:
        return (
          <BookingStepContactInformation
            {...commonProps}
            handleBookingAdded={this.handleBookingAdded}
          />
        );
      default:
        throw new Error(`${activeStep} is not a valid booking step`);
    }
  };

  render() {
    const {
      classes,
      data: { bookingStatus },
      stepHelper
    } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.stepper} square>
          <Stepper
            stepHelper={stepHelper}
            activeStep={bookingStatus.activeStep}
          />
        </Paper>
        <Paper className={classes.content} square>
          {this.renderStepperContent()}
        </Paper>
      </div>
    );
  }
}

const dataProp = PropTypes.shape({
  bookingStatus: bookingStatusProp,
  activities: PropTypes.arrayOf(activityProp).isRequired
});

BookingView.propTypes = {
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  data: dataProp.isRequired,
  mutate: PropTypes.func.isRequired,
  stepHelper: PropTypes.shape({
    getStepNext: PropTypes.func.isRequired,
    getStepPrevious: PropTypes.func.isRequired,
    isStepFirst: PropTypes.func.isRequired,
    isStepLast: PropTypes.func.isRequired
  })
};

export default enhance(BookingView);
